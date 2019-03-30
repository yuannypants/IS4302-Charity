import firebase from 'firebase';
import 'firebase/storage';
import { httpGET, httpPOST } from '../utils/httpUtils'
import * as HttpStatus from 'http-status-codes';

const db = firebase.database();
const storage = firebase.storage();

export function createDonationDrive(req, res) {
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
        db.ref('DonationDrive/' + id).set({
          description: donationDriveDescription,
        }, firebaseError => {
          if (firebaseError)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              errorSource: "firebase",
              firebaseError,
            });
        })
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
  let { $class, fundRequestName, fundRequestPurpose, fundRequestAmount, donationDriveName, beneficiaries, suppliers } = req.body;
  let url = 'http://localhost:3000/bc/api/CreateFundTransferRequest';
  let firebaseRef = 'somePath/' + 'someId';
  let data = {
    "$class": $class,
    "fundTransferRequestId": fundRequestName,
    "purpose": fundRequestPurpose,
    "amount": fundRequestAmount,
    "donationDrive": donationDriveName,
    "beneficiaries": beneficiaries,
    "suppliers": suppliers
  };

  // Do something with blockchain
  httpPOST(url, data)
  .then(responseFromComposer => {
    console.log(responseFromComposer);

    // Do something with Firebase
    // db.ref(firebaseRef).set({
    //   key1: "value1",
    //   key2: "value2",
    // }, firebaseError => {
    //   if (firebaseError)
    //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //       errorSource: "firebase",
    //       firebaseError,
    //     });
    //   else
    //     res.json({
    //       responseFromComposer,
    //       key1: "value1",
    //       key2: "value2",
    //     });
    // })
  })
   .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      // err
    })
}

export function makeDonation(req, res) {
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

export function transferFunds(req, res) {
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

export function validateFundTransferRequest(req, res) {
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

export function walletTransaction(req, res) {
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
      if (transferType === 'TOP_UP') {
        balance += amount;
      } else if (transferType === 'WITHDRAW') {
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

export function uploadReceipt(req, res) {
  let { receipt, donationDrive } = req.body;
  console.log(receipt)
  let url = 'http://localhost:3000/bc/api/UploadReceipt';
  let firebaseRef = 'Receipts/' + donationDrive;
  console.log(firebaseRef);
  // let data = {
  //   "$class": "com.is4302.charity.UploadReceipt",
  //   "filePath": "string",
  //   "donationDrive": {}
  // };

  // // Do something with blockchain
  // httpPOST(url, data)
  // .then(responseFromComposer => {
  //   // Do something with Firebase
  console.log("Uploading")
  storage.ref().putString(receipt)
    .then(response => {
      console.log("Uploaded");
    })
    .catch(firebaseError => {
      console.log("Error");
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
