import firebase from 'firebase';
import { httpGET, httpPOST } from '../utils/httpUtils'
import * as HttpStatus from 'http-status-codes';

const db = firebase.database();

export function viewParticipantOrAsset (req, res) {
  let { type, id } = req.params;
  let url = 'http://localhost:3000/bc/api/' + type;
  let firebaseRef = type;
  if (id) {
    url += '/' + id;
    firebaseRef += '/' + id;
  }

  // Do something with blockchain
  httpGET(url)
  .then(responseFromComposer => {
    let bcData = responseFromComposer.data;

    db.ref(firebaseRef).once("value", snapshot => {
      let data = [],fbData = snapshot.val() ;
      console.log("\x1b[35m%s\x1b[0m%s\x1b[35m%s\x1b[0m%s","Blockchain data (from " + url + ")\n",JSON.stringify(bcData,null,2),"\nFirebase data (from " + firebaseRef + ")\n",JSON.stringify(fbData,null,2));

      switch (type) {
        case "Donor":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              let fb = fbData[bc.id];
              fb && data.push({
                id: bc.id,
                firstName: fb.firstName,
                lastName: fb.lastName,
              })
            }
          } else { // If reading by id, return {}
            data = {
              id: bcData.id,
              firstName: fbData.firstName,
              lastName: fbData.lastName,
            }
          }
          break;

        case "CharitableOrganisation":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              let fb = fbData[bc.uen];
              fb && data.push({
                uen: bc.uen,
                organisationName: fb.organisationName,
                beneficiaries: fb.beneficiaries,
                suppliers: fb.suppliers
              })
            }
          } else { // If reading by id, return {}
            data = {
              uen: bcData.uen,
              organisationName: fbData.organisationName,
              beneficiaries: fbData.beneficiaries,
              suppliers: fbData.suppliers
            }
          }
          break;
        case "Beneficiary":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              let fb = fbData[bc.id];
              fb && data.push({
                id: bc.id,
                beneficiaryName: fb.beneficiaryName
              })
            }
          } else { // If reading by id, return {}
            data = {
              id: bcData.id,
              beneficiaryName: fbData.beneficiaryName
            }
          }
          break;
        case "Supplier":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              let fb = fbData[bc.uen];
              fb && data.push({
                uen: bc.uen,
                supplierName: fb.supplierName,
                supplierType: fb.supplierType
              })
            }
          } else { // If reading by id, return {}
            data = {
              uen: bcData.uen,
              supplierName: fbData.supplierName,
              supplierType: fbData.supplierType
            }
          }
          break;
        case "Validator":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              let fb = fbData[bc.id];
              fb && data.push({
                id: bc.id,
                expenditureReports: bc.expenditureReports,
                fundTransferRequests: bc.fundTransferRequests,
                email: fb.email,
                name: fb.name,
              })
            }
          } else { // If reading by id, return {}
            data = {
              id: bcData.id,
              expenditureReports: bcData.expenditureReports,
              fundTransferRequests: bcData.fundTransferRequests,
              email: fbData.email,
              name: fbData.name
            }
          }
          break;
        case "Wallet":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              let fb = fbData[bc.id];
              fb && data.push({
                id: bc.id,
                isDonationDrive: bc.isDonationDrive,
                balance: fb.balance
              })
            }
          } else { // If reading by id, return {}
            data = {
              id: bcData.id,
              isDonationDrive: bcData.isDonationDrive,
              balance: fbData.balance
            }
          }
          break;
        case "DonationDrive":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              // let fb = fbData[bc.id];
              // fb && data.push({
              //   id: bc.id,
              //   field: fb.field,
              // })
            }
          } else { // If reading by id, return {}
            data = {
              // id: bcData.id,
              // field: fbData.field
            }
          }
          break;
        case "FundTransferRequest":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              // let fb = fbData[bc.id];
              // fb && data.push({
              //   id: bc.id,
              //   field: fb.field,
              // })
            }
          } else { // If reading by id, return {}
            data = {
              // id: bcData.id,
              // field: fbData.field
            }
          }
          break;
        case "ExpenditureReport":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              // let fb = fbData[bc.id];
              // fb && data.push({
              //   id: bc.id,
              //   field: fb.field,
              // })
            }
          } else { // If reading by id, return {}
            data = {
              // id: bcData.id,
              // field: fbData.field
            }
          }
          break;
        case "Receipt":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              // let fb = fbData[bc.id];
              // fb && data.push({
              //   id: bc.id,
              //   field: fb.field,
              // })
            }
          } else { // If reading by id, return {}
            data = {
              // id: bcData.id,
              // field: fbData.field
            }
          }
          break;
      }
      res.json(data);

    }, firebaseError => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errorSource: "firebase",
        firebaseError,
      })
    })
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorSource: "blockchain",
      // err,
    })
  })
}