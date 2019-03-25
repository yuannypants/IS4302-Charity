import firebase from 'firebase';
import { httpPOST } from '../utils/httpUtils'
import * as HttpStatus from 'http-status-codes';

const db = firebase.database();

export function createDonationDrive (req, res) {
  let { value1, value2 } = req.body;
  let url = 'http://localhost:3000/bc/api/CreateDonationDrive';
  let firebaseRef = 'somePath/' + 'someId';
  let data = {
    "$class": "com.is4302.charity.CreateDonationDrive",
    "walletId": "string",
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
          responseFromComposer,
          key1: "value1",
          key2: "value2",
        });
    })
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      err,
    })
  })
}

export function makeDonation (req, res) {
  let { value1, value2 } = req.body;
  let url = 'http://localhost:3000/bc/api/MakeDonation';
  let firebaseRef = 'somePath/' + 'someId';
  let data = {
    "$class": "com.is4302.charity.MakeDonation",
    "amount": 0,
    "donationDrive": {},
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
      err,
    })
  })
}

export function transferFunds (req, res) {
  let { value1, value2 } = req.body;
  let url = 'http://localhost:3000/bc/api/TransferFunds';
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
          responseFromComposer,
          key1: "value1",
          key2: "value2",
        });
    })
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      err,
    })
  })
}