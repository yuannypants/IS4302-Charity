import axios from 'axios'
import firebase from 'firebase';
import { httpGET, httpPOST } from '../utils/httpUtils';
import * as HttpStatus from 'http-status-codes';

const db = firebase.database();

export function register(req, res) {
  /*
    Chain data:    nric
    Offchain data: firstName, lastName, password
  */
  let { nric, firstName, lastName, password } = req.body;
  let registerDonorURL = 'http://localhost:3000/bc/api/RegisterDonor';
  let registerIdentityURL = 'http://localhost:3000/bc/api/system/identities/issue';
  let firebaseRef = 'Donor/' + nric;
  let donor =
    {
      "$class": "com.is4302.charity.RegisterDonor",
      "walletId": nric,
      "donorId": nric
    };
  let identity =
    {
      "participant": "com.is4302.charity.Donor#" + nric,
      "userID": nric,
      "options": {
        // "issuer":true
      }
    };

  // Add into blockchain first
  httpPOST(registerDonorURL, donor)
  .then(responseFromComposer => {
    axios.post(registerIdentityURL, identity, {
      responseType: 'application/octet-stream'
    })
    .then(responseFromComposer2 => {
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
          console.log(responseFromComposer2.data);
          res.json({
            errorSource: null,
            data: JSON.stringify(responseFromComposer2)
          })
      })
    })
    .catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errorSource: "blockchain2",
        error: err
      })
    })
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      //err,
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
    let firebaseRef = participantType + '/' + username;
    db.ref(firebaseRef).once("value", snapshot => {
      let userInfo = snapshot.val();
      console.log(userInfo);
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


//.then(cardData => {
  // const file = new File([cardData.data], 'card', {type: 'application/octet-stream', lastModified: Date.now()});
  // const formData = new FormData()
  // formData.append(nric + '.card', file);
  // axios.post('http://localhost:3000/bc2/api/wallet/import', cardData.data, {
  //   "Content-Type": "multipart/form-data",
  //   "withCredentials": true,
  //   "X-Access-Token": "95BAaCGPLCmBNGc2ZnttpsBVbqibKvofPk1VJ99B9R9Z3lrF74XZ7Y5hoMVNW1Zu"
  // })
  // .then(res => {
  //   res.json({data: res.data})
  // })
  // .catch(err => {
  //   res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //     error: err.data
  //   })
  // })
//})
