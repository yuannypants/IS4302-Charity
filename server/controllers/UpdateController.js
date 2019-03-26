import firebase from 'firebase';
import { httpUPDATE } from '../utils/httpUtils'
import * as HttpStatus from 'http-status-codes';

const db = firebase.database();

export function someUpdateFunction (req, res) {
  let { value1, value2 } = req.body;
  let url = 'http://localhost:3000/bc/api/SomeAPILink';
  if (req.params.id)
    url += req.params.id
  let firebaseRef = 'somePath/' + 'someId';
  let data = {
    "key1": "value1",
  };

  // Do something with blockchain
  httpUPDATE(url, data)
  .then(responseFromComposer => {
    // Do something with Firebase
    // db.ref(firebaseRef).set({
    //   key1: "value1",
    // }, firebaseError => {
    //   if (firebaseError)
    //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //       errorSource: "firebase",
    //       firebaseError,
    //     });
    //   else
        res.json({
          data: responseFromComposer.data,
          key1: "value1",
        });
    // })
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      err,
    })
  })
}
