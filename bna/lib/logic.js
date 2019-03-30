/**
 * Register a donor
 * @param  {com.is4302.charity.RegisterDonor} registerDonor
 * @transaction
 */
async function registerDonor(registerObject) {
  var walletRegistry = await getAssetRegistry("com.is4302.charity.Wallet");
  var donorRegistry = await getParticipantRegistry("com.is4302.charity.Donor");
  var factory = getFactory();

  // create new wallet resource automatically during this transaction
  // only need to provide walletId in registerObject
  var wallet = factory.newResource(
    "com.is4302.charity", "Wallet", registerObject.walletId);
  wallet.balance = 0;
  await walletRegistry.add(wallet);

  var donor = factory.newResource(
    "com.is4302.charity", "Donor", registerObject.donorId);
  donor.wallet = wallet;
  await donorRegistry.add(donor);
}

/**
* Top up into wallet
* @param  {com.is4302.charity.WalletTransaction} walletTransaction
* @transaction
*/
async function walletTransaction(transactionObject) {
  var participant = getCurrentParticipant();

  // check if participant account type can make deposits and withdraw
  // all are allowed except donation drive wallets which will go through other function
  if (participant.getFullyQualifiedType() != 'com.is4302.charity.Donor' &&
      participant.getFullyQualifiedType() != 'com.is4302.charity.Beneficiary' &&
      participant.getFullyQualifiedType() != 'com.is4302.charity.Supplier') {
    throw new Error("Account type does not have wallet");
  }

  // equivalent of participant.wallet.getIdentifier()
  var walletId = participant.wallet.toString().substring(
    participant.wallet.toString().search("#")+1,participant.wallet.toString().search("}"));
  var assetRegistry = await getAssetRegistry("com.is4302.charity.Wallet");
  var wallet = await assetRegistry.get(walletId);

  if (transactionObject.transferType == "TOP_UP") {
      wallet.balance += transactionObject.amount;
  }

  if (transactionObject.transferType == "WITHDRAW") {
      // check if wallet has sufficient balance
      if (wallet.balance < transactionObject.amount) {
        throw new Error("Wallet does not have sufficient funds");
      }
      else {
        wallet.balance -= transactionObject.amount;
      }
  }

  await assetRegistry.update(wallet);
  return("Success");
}

/**
* Create a donation drive
* @param  {com.is4302.charity.CreateDonationDrive} createDonationDrive
* @transaction
*/
async function createDonationDrive(donationDriveObject) {
  var participant = getCurrentParticipant();
  var charityBeneficiariesTemp = [];
  var submittedBeneficiariesTemp = [];

  if (participant.getFullyQualifiedType() !== "com.is4302.charity.CharitableOrganisation") {
    throw new Error("Account type cannot create donation drive");
  }

  // formatting charitable organisation's array of beneficiary by ids
  // original format is in 'relationship' string, not a clean array of ids
  for(let charityBeneficiary of participant.beneficiaries) {
     charityBeneficiariesTemp.push(
        charityBeneficiary.toString().substring(
          charityBeneficiary.toString().search("#")+1,charityBeneficiary.toString().search("}")));
  }

  for(let submittedBeneficiary of donationDriveObject.beneficiaries) {
     submittedBeneficiariesTemp.push(
        submittedBeneficiary.toString().substring(
          submittedBeneficiary.toString().search("#")+1,submittedBeneficiary.toString().search("}")));
  }

  for(let submittedBeneficiary of submittedBeneficiariesTemp) {
     if (!charityBeneficiariesTemp.includes(submittedBeneficiary)){
        throw new Error("Not all beneficiaries submitted belongs charitable organisation's list of beneficiaries");
      }
  }

  var donationDriveRegistry = await getAssetRegistry("com.is4302.charity.DonationDrive");
  var factory = getFactory();

  var donationDrive = factory.newResource(
    "com.is4302.charity", "DonationDrive", donationDriveObject.donationDriveId);

  var wallet = factory.newResource(
    "com.is4302.charity", "Wallet", donationDriveObject.walletId);
  wallet.balance = 0;

  // flag is set to true so alert acl that this wallet belongs to donation drive, so it can be visible to everyone
  // initially it came without, acl is unable to draw relation between participants and donation drive's wallet
  wallet.isDonationDrive = true;
  var walletRegistry = await getAssetRegistry("com.is4302.charity.Wallet");
  await walletRegistry.add(wallet);

  donationDrive.wallet = wallet;
  donationDrive.charitableOrganisation = participant;
  donationDrive.beneficiaries = donationDriveObject.beneficiaries;

  var expenditureReport = factory.newResource(
    "com.is4302.charity", "ExpenditureReport", donationDriveObject.expenditureReportId);
  expenditureReport
  var expenditureReportRegistry = await getAssetRegistry("com.is4302.charity.ExpenditureReport");
  await expenditureReportRegistry.add(expenditureReport);
  donationDrive.expenditureReport = expenditureReport;

  // check if list of suppliers are submitted since it is optional
  if (donationDriveObject.suppliers != null) {
    var charitySuppliersTemp = [];
    var submittedSuppliersTemp = [];

      for(let charitySupplier of participant.suppliers) {
          charitySuppliersTemp.push(
            charitySupplier.toString().substring(
              charitySupplier.toString().search("#")+1,charitySupplier.toString().search("}")));
    }

      for(let submittedSupplier of donationDriveObject.suppliers) {
          submittedSuppliersTemp.push(
            submittedSupplier.toString().substring(
              submittedSupplier.toString().search("#")+1,submittedSupplier.toString().search("}")));
    }

      for(let submittedSupplier of submittedSuppliersTemp) {
        if (!charitySuppliersTemp.includes(submittedSupplier)){
            throw new Error(
              "Not all suppliers submitted belongs charitable organisation's list of suppliers");
        }
    }

      donationDrive.suppliers = donationDriveObject.suppliers;
  }

  await donationDriveRegistry.add(donationDrive);
  return("Success");
}

/**
* Make a donation
* @param  {com.is4302.charity.MakeDonation} makeDonation
* @transaction
*/
async function makeDonation(donationObject) {
 var participant = getCurrentParticipant();

  var walletId = participant.wallet.toString().substring(
    participant.wallet.toString().search("#")+1,participant.wallet.toString().search("}"));
  var walletRegistry = await getAssetRegistry("com.is4302.charity.Wallet");
  var wallet = await walletRegistry.get(walletId);

  if (wallet.balance < donationObject.amount) {
    throw new Error("Wallet does not have sufficient funds");
  }

  else {
    wallet.balance -= donationObject.amount;
      donationObject.donationDrive.wallet.balance += donationObject.amount;
      await walletRegistry.update(wallet);
      await walletRegistry.update(donationObject.donationDrive.wallet);
      return("Success");
  }
}

/**
* Create a fund transfer request
* @param  {com.is4302.charity.CreateFundTransferRequest} createFundTransferRequest
* @transaction
*/
async function createFundTransferRequest(fundTransferRequestObject) {
  var fundTransferRequestRegistry = await getAssetRegistry("com.is4302.charity.FundTransferRequest");
  var factory = getFactory();

  var fundTransferRequest = factory.newResource(
    "com.is4302.charity", "FundTransferRequest", fundTransferRequestObject.fundTransferRequestId);
  fundTransferRequest.amount = fundTransferRequestObject.amount;
  fundTransferRequest.purpose = fundTransferRequestObject.purpose;
  fundTransferRequest.donationDrive = fundTransferRequestObject.donationDrive;
  fundTransferRequest.approvalStatus = "NOT_APPROVED";

   if(fundTransferRequestObject.beneficiaries != null) {
    var donationDriveBeneficiariesTemp = [];
    var submittedBeneficiariesTemp = [];

      for(let donationDriveBeneficiary of fundTransferRequest.donationDrive.beneficiaries) {
          donationDriveBeneficiariesTemp.push(
            donationDriveBeneficiary.toString().substring(
              donationDriveBeneficiary.toString().search("#")+1,donationDriveBeneficiary.toString().search("}")));
    }

      for(let submittedBeneficiary of fundTransferRequestObject.beneficiaries) {
          submittedBeneficiariesTemp.push(
            submittedBeneficiary.toString().substring(
              submittedBeneficiary.toString().search("#")+1,submittedBeneficiary.toString().search("}")));
    }

      for(let submittedBeneficiary of submittedBeneficiariesTemp) {
        if (!donationDriveBeneficiariesTemp.includes(submittedBeneficiary)){
            throw new Error(
              "Not all beneficiaries submitted belongs donation drive's list of beneficiaries");
        }
    }
      fundTransferRequest.beneficiaries = fundTransferRequestObject.beneficiaries;
  }

  if(fundTransferRequestObject.suppliers != null) {
    var donationDriveSuppliersTemp = [];
    var submittedSuppliersTemp = [];

      for(let donationDriveSupplier of fundTransferRequest.donationDrive.suppliers) {
          donationDriveSuppliersTemp.push(
            donationDriveSupplier.toString().substring(
              donationDriveSupplier.toString().search("#")+1,donationDriveSupplier.toString().search("}")));
    }

      for(let submittedSupplier of fundTransferRequestObject.suppliers) {
          submittedSuppliersTemp.push(
            submittedSupplier.toString().substring(
              submittedSupplier.toString().search("#")+1,submittedSupplier.toString().search("}")));
    }

      for(let submittedSupplier of submittedSuppliersTemp) {
        if (!donationDriveSuppliersTemp.includes(submittedSupplier)){
            throw new Error(
              "Not all suppliers submitted belongs donation drive's list of suppliers");
        }
    }
      fundTransferRequest.suppliers = fundTransferRequestObject.suppliers;
  }

  await fundTransferRequestRegistry.add(fundTransferRequest);

  var expenditureReportRegistry = await getAssetRegistry("com.is4302.charity.ExpenditureReport");

  // check if expenditure report has any fund transfer requests
  // first request will have to create the array, subsequent request will have to push new request into array
  if(fundTransferRequestObject.donationDrive.expenditureReport.fundTransferRequests == null) {
  	fundTransferRequestObject.donationDrive.expenditureReport.fundTransferRequests = [fundTransferRequest];
  }
  else {
  	fundTransferRequestObject.donationDrive.expenditureReport.fundTransferRequests.push(fundTransferRequest);
  }
  await expenditureReportRegistry.update(fundTransferRequestObject.donationDrive.expenditureReport);

  return("Success");
}

/**
* Validate a fund transfer request
* @param  {com.is4302.charity.ValidateFundTransferRequest} validateFundTransferRequest
* @transaction
*/
async function validateFundTransferRequest(validateFundTransferRequestObject) {
  var participant = getCurrentParticipant();
  var validatorRegistry = await getParticipantRegistry("com.is4302.charity.Validator");
  var validators = await validatorRegistry.getAll();

  if (participant.getFullyQualifiedType() !== ("com.is4302.charity.Validator")) {
  	throw new Error("Account type not allowed to validate fund transfer");
  }

  var fundTransferRequestId = validateFundTransferRequestObject.fundTransferRequest.toString().substring(
    validateFundTransferRequestObject.fundTransferRequest.toString().search("#")+1,
    validateFundTransferRequestObject.fundTransferRequest.toString().search("}"));
  var fundTransferRequestRegistry = await getAssetRegistry("com.is4302.charity.FundTransferRequest");
  var fundTransferRequest = await fundTransferRequestRegistry.get(fundTransferRequestId);

  if(fundTransferRequest.validators == null) {
  	fundTransferRequest.validators = [participant];
  }
  else {
  	fundTransferRequest.validators.push(participant);
  }

   	await fundTransferRequestRegistry.update(fundTransferRequest);

  // check for more than 50% of validators approving
  if(fundTransferRequest.validators.length >= Math.round(validators.length/2)) {

    // create a transferFundObject ready to be called by another function
    var transferFundObject = {
      amount: validateFundTransferRequestObject.fundTransferRequest.amount,
      donationDrive: validateFundTransferRequestObject.fundTransferRequest.donationDrive,
      beneficiaries: validateFundTransferRequestObject.fundTransferRequest.beneficiaries,
 	    suppliers: validateFundTransferRequestObject.fundTransferRequest.suppliers
    }

    fundTransferRequest.approvalStatus = "APPROVED";
    await fundTransferRequestRegistry.update(fundTransferRequest);
  	await transferFund(transferFundObject);
  }
}

/**
* Internal Fund Transfer
* @param  {com.is4302.charity.TransferFund} transferFund
* @transaction
*/
async function transferFund(transferFundObject) {
  var beneficiariesLen = 0;
  var suppliersLen = 0;

  if (transferFundObject.beneficiaries != null) {
    beneficiariesLen = transferFundObject.beneficiaries.length;
  }

  if (transferFundObject.suppliers != null) {
      suppliersLen = transferFundObject.suppliers.length;
  }

  var numTransfer = beneficiariesLen + suppliersLen;

  if (transferFundObject.donationDrive.wallet.balance < transferFundObject.amount * numTransfer) {
    throw new Error("Wallet does not have sufficient funds");
  }

  else {
      transferFundObject.donationDrive.wallet.balance -= transferFundObject.amount * numTransfer;
      var expenditureReportRegistry = await getAssetRegistry("com.is4302.charity.ExpenditureReport");
      var walletRegistry = await getAssetRegistry("com.is4302.charity.Wallet");

      // assign all beneficiary with the amount
      for(let beneficiary of transferFundObject.beneficiaries) {
        beneficiary.wallet.balance += transferFundObject.amount;
          await walletRegistry.update(beneficiary.wallet);
      };

      for(let supplier of transferFundObject.suppliers) {
        supplier.wallet.balance += transferFundObject.amount;
          await walletRegistry.update(supplier.wallet);
      };

      await walletRegistry.update(transferFundObject.donationDrive.wallet);
      return("Success");
  }
}

/**
* Upload a receipt
* @param  {com.is4302.charity.UploadReceipt} uploadReceipt
* @transaction
*/
async function uploadReceipt(uploadReceiptObject) {
  var participant = getCurrentParticipant();
  
  if (participant.getFullyQualifiedType() == "com.is4302.charity.Beneficiary") {
   	participant = "beneficiary"; 
  }
  else if (participant.getFullyQualifiedType() == "com.is4302.charity.Supplier") {
   	participant = "supplier"; 
  }
  else {
   throw new Error("Account type not allowed to upload receipt"); 
  }
  
  var receiptRegistry = await getAssetRegistry("com.is4302.charity.Receipt");
  var expenditureReportRegistry = await getAssetRegistry("com.is4302.charity.ExpenditureReport");
  var factory = getFactory();

  var receipt = factory.newResource(
    "com.is4302.charity", "Receipt", uploadReceiptObject.filePath);
  receipt.donationDrive = uploadReceiptObject.donationDrive;
  await receiptRegistry.add(receipt);
  
  if (participant == "beneficiary") {
    var beneficiaryTemp = [];
    for(let beneficiary of uploadReceiptObject.donationDrive.beneficiaries) {
     	 beneficiaryTemp.push(beneficiary.toString().substring(
           beneficiary.toString().search("#")+1, beneficiary.toString().search("}")));
    }
    if (!beneficiaryTemp.includes(getCurrentParticipant().getIdentifier())) {
    	throw new Error("Beneficiary is not in the donation drive's list of beneficiaries");
    }
  }
  else if (participant == "supplier") {
    var supplierTemp = [];
    for(let supplier of uploadReceiptObject.donationDrive.suppliers) {
     	 supplierTemp.push(supplier.toString().substring(
           supplier.toString().search("#")+1, supplier.toString().search("}")));
    }
    if (!supplierTemp.includes(getCurrentParticipant().getIdentifier())) {
    	throw new Error("Supplier is not in the donation drive's list of suppliers");
    }
  }
  else {
   throw new Error("Seriously? Account type not allowed to upload receipt"); 
  }
  
  if(uploadReceiptObject.donationDrive.expenditureReport.receipts == null) {
   	 uploadReceiptObject.donationDrive.expenditureReport.receipts = [receipt];
  }
  else {
  	uploadReceiptObject.donationDrive.expenditureReport.receipts.push(receipt);
  }
  
  await expenditureReportRegistry.update(uploadReceiptObject.donationDrive.expenditureReport);
  return ("Success");
}
