import firebase from 'firebase';
import { httpGET, httpPOST } from '../utils/httpUtils'
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
          errorSource: null,
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
  // Chain data:    username
  // Offchain data: password
  let { username, password } = req.body;
  let participantsList = [
    'Donor',
    'CharitableOrganisation',
    'Beneficiary',
    'Supplier',
    'Validator'
  ]
  let participantType = participantsList[0];
  console.log('> Log in detected\n' + '\nUsername: ' + username + '\nPassword: ' + password);

  // for (let participant of participantsList) {
  //   let url = 'http://localhost:3000/bc/api/' + participant + '/' + username;
  //   httpGET(url)
  //   .then(() => {participantType = participant;})
  // }

  if (participantType) {
    console.log('Participant type: ' + participantType)
    let firebaseRef = participantType + '/' + username;
    db.ref(firebaseRef).once("value", snapshot => {
      let userInfo = snapshot.val();
      if (userInfo && userInfo.password === password) {
        res.json({
          participant: participantType,
          username: username,
          nickname: userInfo.firstName + ' ' + userInfo.lastName,
        })
      } else {
        res.status(HttpStatus.FORBIDDEN).json({
          errorSource: "firebase",
          errorType: "wronguserpw",
        })
      }
      snapshot.val() && console.log(snapshot.val());
    }, firebaseError => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errorSource: "firebase",
        firebaseError,
      })
    })
  } else {
    console.log('Participant type: Not detected')
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      //blockchainError,
    })
  }
}
