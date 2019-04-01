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
  let donor = {
      "$class": "com.is4302.charity.RegisterDonor",
      "walletId": nric,
      "donorId": nric
    };
  let identity = {
      "participant": "com.is4302.charity.Donor#" + nric,
      "userID": nric,
      "options": {
        // "issuer":true
      }
    };

  // Add into blockchain first
  httpPOST(registerDonorURL, donor)
  .then(responseFromComposer => {
    // axios.post(registerIdentityURL, identity, {
    //   responseType: 'application/octet-stream'
    // })
    // .then(cardData => {
    //   console.log("\x1b[35m%s\x1b[0m",JSON.stringify(cardData,null,2))
    //   const file = new File([cardData.data], 'card', {type: 'application/octet-stream', lastModified: Date.now()});
    //   const formData = new FormData()
    //   formData.append(nric + '.card', file);
    //   axios.post('http://localhost:3000/bc2/api/wallet/import', cardData.data, {
    //     "Content-Type": "multipart/form-data",
    //     "withCredentials": true,
    //     "X-Access-Token": "95BAaCGPLCmBNGc2ZnttpsBVbqibKvofPk1VJ99B9R9Z3lrF74XZ7Y5hoMVNW1Zu"
    //   })
    //   .then(res => {
    //     res.json({data: res.data})
    //   })
    //   .catch(err => {
    //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //       error: err.data
    //     })
    //   })
    // })
    // .then(responseFromComposer2 => {
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
          console.log(responseFromComposer.data);
          res.json({
            errorSource: null,
            data: JSON.stringify(responseFromComposer)
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
  let participantType;
  console.log('> Log in detected' + '\n> Username: ' + username + '\n> Password: ' + password);

  httpGET('http://localhost:3000/bc/api/Donor/' + username)
  .then(() => {
    console.log('> Donor');
    db.ref('Donor/' + username).once("value", snapshot => {
      let userInfo = snapshot.val();
      if (userInfo && userInfo.password === password) {
        res.json({
          participant: "Donor",
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
  })
  .catch(() => {
    httpGET('http://localhost:3000/bc/api/CharitableOrganisation/' + username)
    .then(() => {
      console.log('> CharitableOrganisation');
      db.ref('CharitableOrganisation/' + username).once("value", snapshot => {
        let userInfo = snapshot.val();
        if (userInfo && userInfo.password === password) {
          res.json({
            participant: "CharitableOrganisation",
            username: username,
            nickname: userInfo.organisationName,
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

    })
    .catch(() => {
      httpGET('http://localhost:3000/bc/api/Beneficiary/' + username)
      .then(() => {
        console.log('> Beneficiary')
        db.ref('Beneficiary/' + username).once("value", snapshot => {
          let userInfo = snapshot.val();
          if (userInfo && userInfo.password === password) {
            res.json({
              participant: "Beneficiary",
              username: username,
              nickname: userInfo.beneficiaryName,
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

      })
      .catch(() => {
        httpGET('http://localhost:3000/bc/api/Supplier/' + username)
        .then(() => {
          console.log('> Supplier');
          db.ref('Supplier/' + username).once("value", snapshot => {
            let userInfo = snapshot.val();
            if (userInfo && userInfo.password === password) {
              res.json({
                participant: "Supplier",
                username: username,
                nickname: userInfo.supplierName,
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
        })
        .catch(() => {
          httpGET('http://localhost:3000/bc/api/Validator/' + username)
          .then(() => {
            console.log('> Validator');
            db.ref('Validator/' + username).once("value", snapshot => {
              let userInfo = snapshot.val();
              if (userInfo && userInfo.password === password) {
                res.json({
                  participant: "Validator",
                  username: username,
                  nickname: userInfo.name,
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
          })
          .catch(() => {
            console.log('Participant type: Not detected')
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              errorSource: "noParticipant"
            })
          })
        })
      })
    })
  })
}
