import axios from 'axios'
import firebase from 'firebase';
import { httpGET, httpPOST } from '../utils/httpUtils'
import * as HttpStatus from 'http-status-codes';

const db = firebase.database();

export function register(req, res) {
  // Chain data:    nric
  // Offchain data: firstName, lastName, password
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
        "issuer":true
      }
    };


  // Add into blockchain first
  httpPOST(registerDonorURL, donor)
  .then(responseFromComposer => {
    axios.post(registerIdentityURL, identity, {responseType: 'blob'})
    .then(cardData => {
      console.log('CARD-DATA', cardData);
      const file = new File([cardData], nric + '.card', {type: 'application/octet-stream', lastModified: Date.now()});

      const formData = new FormData();
      formData.append('card', file);

      const headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');

      axios.post('http://localhost:3000/bc2/api/wallet/import', formData, {
        withCredentials: true,
        headers
      })
      .then(response => {
        console.log(response);
      })
    })
    .catch(blockchainError => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({bce: blockchainError})
    })
    // .then(()=>{
    //   // then add into Firebase
    //   db.ref(firebaseRef).set({
    //     firstName: firstName,
    //     lastName: lastName,
    //     password: password
    //   }, firebaseError => {
    //     if (firebaseError)
    //       res.json({
    //         errorSource: "firebase",
    //         firebaseError,
    //       })
    //     else
    //       res.json({
    //         errorSource: null,
    //       })
    //   })
    // })
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
