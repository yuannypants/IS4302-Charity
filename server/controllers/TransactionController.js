import firebase from 'firebase';
import 'firebase/storage';
import { httpGET, httpPOST } from '../utils/httpUtils'
import * as HttpStatus from 'http-status-codes';

const db = firebase.database();
const storage = firebase.storage();

export function createDonationDrive (req, res) {
  let { $class, id, beneficiaries, suppliers, donationDriveDescription } = req.body;
  let url = 'http://localhost:3000/bc/api/CreateDonationDrive';
  // let url2 = 'http://localhost:3000/bc/api/CharitableOrganisation';
  let data = {
    "$class": $class,
    "donationDriveId": id,
    "walletId": id,
    "expenditureReportId": id,
    "beneficiaries": beneficiaries,
    "suppliers": suppliers,
  };


  console.log(data);

  httpPOST(url,data)
  .then(donationDriveResponse => {
    console.log(donationDriveResponse + "BUGGY HERE");
    // httpGET(url2).then(COResponse => {
    //   db.ref('Donor/S1234567A').once("value", snapshot => {
    //     let userInfo = snapshot.val();
    //
    //     // compare donorResponse (from blockchain) and userInfo (from firebase)
    //
    //     // after comparison, push to processedData and return in res.json()
    //     console.log(donationDriveResponse);
    //     res.json({
    //       processedData: "processedData",
    //       donorData: donationDriveResponse.data,
    //       COData: COResponse.data,
    //       userInfo: userInfo
    //     })
    //   })
    // })
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      // err
    })
  })

  // Do something with blockchain
  // httpPOST(url, data)
  // .then(responseFromComposer => {
  //   // Do something with Firebase
  //   db.ref(firebaseRef).set({
  //     key1: "value1",
  //     key2: "value2",
  //   }, firebaseError => {
  //     if (firebaseError)
  //       res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //         errorSource: "firebase",
  //         firebaseError,
  //       });
  //     else
  //       res.json({
  //         responseFromComposer,
  //         key1: "value1",
  //         key2: "value2",
  //       });
  //   })
  // })
  // .catch(err => {
  //   res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //     errorSource: "blockchain",
  //     // err
  //   })
  // })
}

export function createFundTransferRequest (req, res) {
  let { value1, value2 } = req.body;
  let url = 'http://localhost:3000/bc/api/CreateFundTransferRequest';
  let firebaseRef = 'somePath/' + 'someId';
  let data = {
    "$class": "com.is4302.charity.CreateFundTransferRequest",
    "fundTransferRequestId": "string",
    "purpose": "string",
    "amount": 0,
    "numValidators": 0,
    "donationDrive": {},
    "beneficiaries": [
      {}
    ],
    "suppliers": [
      {}
    ]
  };

  // Do something with blockchain
  httpPOST(url, data)
  .then(responseFromComposer => {
    // Do something with Firebase
    db.ref(firebaseRef).set({
      key1: "value1",
      key2: "value2",
    }, firebaseError => {
      if (firebaseError)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          errorSource: "firebase",
          firebaseError,
        });
      else
        res.json({
          responseFromComposer,
          key1: "value1",
          key2: "value2",
        });
    })
  })
   .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      // err
    })
  })
}

export function makeDonation (req, res) {
  let { amount, donationDriveName } = req.body;
  let url = 'http://localhost:3000/bc/api/MakeDonation';
  let data = {
    "$class": "com.is4302.charity.MakeDonation",
    "amount": amount,
    "donationDrive": donationDriveName,
  };

  // Do something with blockchain
  httpPOST(url, data)
  .then(responseFromComposer => {
    // Do something with Firebase
    console.log("MakeDonation: RFC " + responseFromComposer);
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      // err
    })
  })
}

export function transferFunds (req, res) {
  let { value1, value2 } = req.body;
  let url = 'http://localhost:3000/bc/api/TransferFund';
  let firebaseRef = 'somePath/' + 'someId';
  let data = {
    "$class": "com.is4302.charity.TransferFund",
    "amount": 0,
    "donationDrive": {},
    "beneficiaries": [
      {}
    ],
    "suppliers": [
      {}
    ],
  };

  // Do something with blockchain
  httpPOST(url, data)
  .then(responseFromComposer => {
    // Do something with Firebase
    db.ref(firebaseRef).set({
      key1: "value1",
      key2: "value2",
    }, firebaseError => {
      if (firebaseError)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          errorSource: "firebase",
          firebaseError,
        });
      else
        res.json({
          data: responseFromComposer.data,
          key1: "value1",
          key2: "value2",
        });
    })
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      // err
    })
  })
}

export function validateFundTransferRequest (req, res) {
  let { value1, value2 } = req.body;
  let url = 'http://localhost:3000/bc/api/ValidateFundTransferRequest';
  let firebaseRef = 'somePath/' + 'someId';
  let data = {
    "$class": "com.is4302.charity.ValidateFundTransferRequest",
    "fundTransferRequest": {},
  };

  // Do something with blockchain
  httpPOST(url, data)
  .then(responseFromComposer => {
    // Do something with Firebase
    db.ref(firebaseRef).set({
      key1: "value1",
      key2: "value2",
    }, firebaseError => {
      if (firebaseError)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          errorSource: "firebase",
          firebaseError,
        });
      else
        res.json({
          data: responseFromComposer.data,
          key1: "value1",
          key2: "value2",
        });
    })
  })
   .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      // err
    })
  })
}

export function walletTransaction (req, res) {
  let { amount, transferType, walletId, walletBalance } = req.body;
  let url = 'http://localhost:3000/bc/api/WalletTransaction';
  let firebaseRef = 'Wallet/' + walletId;
  let data = {
    "$class": "com.is4302.charity.WalletTransaction",
    "amount": amount,
    "transferType": transferType,
  };

  // Do something with blockchain
  httpPOST(url, data)
  .then(responseFromComposer => {
    let balance = walletBalance
    if(transferType === 'TOP_UP') {
      balance += amount;
    } else if(transferType === 'WITHDRAW') {
      balace -= amount;
    }
    // Do something with Firebase
    db.ref(firebaseRef).set({
      balance: balance
    }, firebaseError => {
      if (firebaseError)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          errorSource: "firebase",
          firebaseError,
        });
      else
        res.json({
          data: responseFromComposer.data,
          key1: "value1",
          key2: "value2",
        });
    })
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      // err
    })
  })
}

export function uploadReceipt (req, res) {
  var file = req.files;
  var donationDrive = req.body.donationDrive;
  console.log(file.length);
  console.log(donationDrive);
  let url = 'http://localhost:3000/bc/api/UploadReceipt';
  let firebaseRef = 'Receipts/' + donationDrive;
  // let data = {
  //   "$class": "com.is4302.charity.UploadReceipt",
  //   "filePath": "string",
  //   "donationDrive": {}
  // };

  // // Do something with blockchain
  // httpPOST(url, data)
  // .then(responseFromComposer => {
  //   // Do something with Firebase

    storage.ref().put(file)
    .then(response => {
      console.log("Uploaded");
    })
    .catch(firebaseError => {
      if (firebaseError)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          errorSource: "firebase",
          firebaseError,
        });
      else
        res.json({
          data: responseFromComposer.data,
          key1: "value1",
          key2: "value2",
        });
    })
  // })
  // .catch(err => {
  //   res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //     errorSource: "blockchain",
  //     // err
  //   })
  // })
}
