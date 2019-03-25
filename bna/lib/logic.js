/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /* global getAssetRegistry */

/**
 * Register a donor
 * @param  {com.is4302.charity.RegisterDonor} registerDonor
 * @transaction
 */
async function registerDonor(registerObject) {
  var walletRegistry = await getAssetRegistry("com.is4302.charity.Wallet");
  var donorRegistry = await getParticipantRegistry("com.is4302.charity.Donor");
  var factory = getFactory();

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

  if (participant.getFullyQualifiedType() != 'com.is4302.charity.Donor' && 
      participant.getFullyQualifiedType() != 'com.is4302.charity.Beneficiary') {
    throw new Error("Account type does not have wallet");
  }

  var walletId = participant.wallet.toString().substring(
    participant.wallet.toString().search("#")+1,participant.wallet.toString().search("}"));
  var assetRegistry = await getAssetRegistry("com.is4302.charity.Wallet");
  var wallet = await assetRegistry.get(walletId);

  if (transactionObject.transferType == "TOP_UP") {
      wallet.balance += transactionObject.amount;
  }

  if (transactionObject.transferType == "WITHDRAW") {
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

  // formatting charitable organisation's beneficiaries before check
  for(let charityBeneficiary of participant.beneficiaries) {
     charityBeneficiariesTemp.push(
        charityBeneficiary.toString().substring(
          charityBeneficiary.toString().search("#")+1,charityBeneficiary.toString().search("}")));
  }

  // formatting submitted beneficiaries before check
  for(let submittedBeneficiary of donationDriveObject.beneficiaries) {
     submittedBeneficiariesTemp.push(
        submittedBeneficiary.toString().substring(
          submittedBeneficiary.toString().search("#")+1,submittedBeneficiary.toString().search("}")));
  }
  
  // checking if all submitted beneficiaries belong to charitable organisation's list of beneficiaries
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
  var walletRegistry = await getAssetRegistry("com.is4302.charity.Wallet");
  await walletRegistry.add(wallet);
  
  donationDrive.wallet = wallet;
  donationDrive.charitableOrganisation = participant;
  donationDrive.beneficiaries = donationDriveObject.beneficiaries;
  
  var expenditureReport = factory.newResource(
    "com.is4302.charity", "ExpenditureReport", donationDriveObject.expenditureReportId);
  var expenditureReportRegistry = await getAssetRegistry("com.is4302.charity.ExpenditureReport");
  await expenditureReportRegistry.add(expenditureReport);
  donationDrive.expenditureReport = expenditureReport;

  // checking if list of suppliers are submitted since it is optional
  if (donationDriveObject.suppliers !== null) {
    var charitySuppliersTemp = [];
      var submittedSuppliersTemp = [];
    
      for(let charitySupplier of participant.suppliers) {
          charitySuppliersTemp.push(
            charitySupplier.toString().substring(
              charitySupplier.toString().search("#")+1,charitySupplier.toString().search("}")));
    }
    
      for(let submittedSupplier of donationDriveObject.supppliers) {
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

  var walletId = participant.wallet.toString().substr(participant.wallet.toString().search("#")+1,4);
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
  var fundTransferRequestRegistry = await getAssestRegistry("com.is4302.charity.FundTransferRequest");
  var factory = getFactory();

  var fundTransferRequest = factory.newResource(
    "com.is4302.charity", "FundTransferReuqest", fundTransferRequestObject.fundTransferRequestId);
  fundTransferRequest.amount = fundTransferRequestObject.amount;
  fundTransferRequest.purpose = fundTransferRequestObject.purpose;
  fundTransferRequest.donationDrive = fundTransferRequestObject.donationDrive;
  fundTransferRequest.approvalStatus = "NOT_APPROVED";
  
  //TODO: checking if suppliers or beneficiaries added
  
  await fundTransferRequestRegistry.add(fundTransferRequest);
  return("Success");
  
}

/**
* Validate a fund transfer request
* @param  {com.is4302.charity.ValidateFundTransferRequest} validateFundTransferRequest
* @transaction
*/
function validateFundTransferRequest(validateFundTransferRequestObject) {
  var participant = getCurrentParticipant();
  
  if (participant.getFullyQualifiedType() !== ("com.is4302.charity.Validator")) {
  	throw new Error("Account type not allowed to validate fund transfer"); 
  }
  
  validateFundTransferRequestObject.fundTransferRequest.validators.push(participant);
  
  //TODO: checking if new validation will be at least 51% of validators approving
  
  var fundTransferRequestRequestRegistry = getAssetRegistry("com.is4302.charity.FundTransferReuqest");
  fundTransferRequestRequestRegistry.update(fundTransferRequest);
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
      var walletRegistry = await getAssetRegistry("com.is4302.charity.Wallet");
    
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