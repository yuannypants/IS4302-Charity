import firebase from 'firebase';
import { httpGET, httpPOST } from '../utils/httpUtils'
import * as HttpStatus from 'http-status-codes';

const db = firebase.database();

export function viewDonors (req, res) {
  let url = 'http://localhost:3000/bc/api/Donor';
  let firebaseRef = 'Donor';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then((responseFromComposer) => {
    res.json({
      data: responseFromComposer.data,
      // key1: "value1",
      // key2: "value2",
    });
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      err,
    })
  })
}

export function viewCharitableOrganisations (req, res) {
  let url = 'http://localhost:3000/bc/api/CharitableOrganisation';
  let firebaseRef = 'CharitableOrganisation';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
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
    res.json({
      responseFromComposer,
      // key1: "value1",
      // key2: "value2",
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

export function viewBeneficiaries (req, res) {
  let url = 'http://localhost:3000/bc/api/Beneficiary';
  let firebaseRef = 'Beneficiary';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
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
    res.json({
      responseFromComposer,
      // key1: "value1",
      // key2: "value2",
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

export function viewSuppliers (req, res) {
  let url = 'http://localhost:3000/bc/api/Supplier';
  let firebaseRef = 'Supplier';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
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
    res.json({
      responseFromComposer,
      // key1: "value1",
      // key2: "value2",
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

export function viewValidators (req, res) {
  let url = 'http://localhost:3000/bc/api/Validator';
  let firebaseRef = 'Validator';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
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
    res.json({
      responseFromComposer,
      // key1: "value1",
      // key2: "value2",
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

export function viewWallets (req, res) {
  let url = 'http://localhost:3000/bc/api/Wallet';
  let firebaseRef = 'Wallet';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
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
    res.json({
      responseFromComposer,
      // key1: "value1",
      // key2: "value2",
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

export function viewDonationDrives (req, res) {
  let url = 'http://localhost:3000/bc/api/DonationDrive';
  let firebaseRef = 'DonationDrive';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
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
    res.json({
      responseFromComposer,
      // key1: "value1",
      // key2: "value2",
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

export function viewFundTransferRequests (req, res) {
  let url = 'http://localhost:3000/bc/api/FundTransferRequest';
  let firebaseRef = 'FundTransferRequest';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
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
    res.json({
      responseFromComposer,
      // key1: "value1",
      // key2: "value2",
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

export function viewExpenditureReports (req, res) {
  let url = 'http://localhost:3000/bc/api/ExpenditureReport';
  let firebaseRef = 'ExpenditureReport';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
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
    res.json({
      responseFromComposer,
      // key1: "value1",
      // key2: "value2",
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

export function viewReceipts (req, res) {
  let url = 'http://localhost:3000/bc/api/Receipt';
  let firebaseRef = 'Receipt';
  if (req.params.id) {
    url += req.params.id;
    firebaseRef += '/' + req.params.id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
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
        res.json({
          responseFromComposer,
          // key1: "value1",
          // key2: "value2",
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