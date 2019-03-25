import firebase from 'firebase';
import { httpPOST } from '../utils/httpUtils'
import * as HttpStatus from 'http-status-codes';

const db = firebase.database();

export function register(req, res) {
  // Chain data:    nric
  // Offchain data: firstName, lastName, password
  let { nric, firstName, lastName, password } = req.body;
  let url = 'http://localhost:3000/bc/api/RegisterDonor';
  let firebaseRef = 'Donor/' + nric;
  let data =
    {
      "$class": "com.is4302.charity.RegisterDonor",
      "walletId": nric,
      "donorId": nric
    };


  // Add into blockchain first
  httpPOST(url, data)
  .then(responseFromComposer => {
    // then add into Firebase
    db.ref(firebaseRef).set({
      firstName: firstName,
      lastName: lastName,
      password: password
    }, firebaseError => {
      if (firebaseError)
        res.json({
          errorSource: "firebase",
          firebaseError,
        })
      else
        res.json({
          firebaseError,
        })
    })
  })
  .catch(blockchainError => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      //blockchainError,
    })
  })
}

export function login(req, res) {
  res.json({
    object: {
      key: "pair",
      description: "This is the JSON object that server returns to you when you call the API url localhost:3000/api/public",
    }
  });
}