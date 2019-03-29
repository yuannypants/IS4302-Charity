import firebase from 'firebase';
import { httpGET, httpPOST } from '../utils/httpUtils';
import { removeIdentifierInArr } from '../utils/bcUtils';
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
      let data = [], additionalData = {}, fbData = snapshot.val() ;
      //console.log("\x1b[35m%s\x1b[0m%s\x1b[35m%s\x1b[0m%s","Blockchain data (from " + url + ")\n",JSON.stringify(bcData,null,2),"\nFirebase data (from " + firebaseRef + ")\n",JSON.stringify(fbData,null,2));

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
            additionalData.beneficiariesList = [];
            additionalData.suppliersList = [];

            for (let bc of bcData) {
              let fb = fbData[bc.uen];
              fb && data.push({
                uen: bc.uen,
                organisationName: fb.organisationName,
                beneficiaries: removeIdentifierInArr(bc.beneficiaries),
                suppliers: removeIdentifierInArr(bc.suppliers)
              })
              additionalData.beneficiariesList.concat(getBeneficiariesList(removeIdentifierInArr(bc.beneficiaries)));
              additionalData.suppliersList.concat(getSuppliersList(removeIdentifierInArr(bc.suppliers)));
            }

          } else { // If reading by id, return {}
            data = {
              uen: bcData.uen,
              organisationName: fbData.organisationName,
              beneficiaries: removeIdentifierInArr(bcData.beneficiaries),
              suppliers: removeIdentifierInArr(bcData.suppliers)
            }
            additionalData.beneficiariesList = getBeneficiariesList(data.beneficiaries);
            additionalData.suppliersList = getSuppliersList(data.suppliers);
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
                supplyType: fb.supplyType
              })
            }
          } else { // If reading by id, return {}
            data = {
              uen: bcData.uen,
              supplierName: fbData.supplierName,
              supplyType: fbData.supplyType
            }
          }
          break;

        case "Validator":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              let fb = fbData[bc.id];
              fb && data.push({
                id: bc.id,
                email: fb.email,
                name: fb.name,
              })
            }
          } else { // If reading by id, return {}
            data = {
              id: bcData.id,
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
                balance: bc.balance
              })
            }
          } else { // If reading by id, return {}
            data = {
              id: bcData.id,
              isDonationDrive: bcData.isDonationDrive,
              balance: bcData.balance
            }
          }
          break;

        case "DonationDrive":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            additionalData.beneficiariesList = [];
            additionalData.suppliersList = [];

            for (let bc of bcData) {
              let fb = fbData[bc.id];
              fb && data.push({
                id: bc.id,
                charitableOrganisation: bc.charitableOrganisation,
                expenditureReport: removeIdentifierInArr(bc.expenditureReport),
                beneficiaries: removeIdentifierInArr(bc.beneficiaries),
                suppliers: removeIdentifierInArr(bc.suppliers),
              })
              additionalData.beneficiariesList.concat(getBeneficiariesList(removeIdentifierInArr(bc.beneficiaries)));
              additionalData.suppliersList.concat(getSuppliersList(removeIdentifierInArr(bc.suppliers)));
            }

          } else { // If reading by id, return {}
            data = {
              id: bcData.id,
              charitableOrganisation: bcData.charitableOrganisation,
              expenditureReport: bcData.expenditureReport,
              beneficiaries: removeIdentifierInArr(bcData.beneficiaries),
              suppliers: removeIdentifierInArr(bcData.suppliers),
            }
            additionalData.beneficiariesList = getBeneficiariesList(data.beneficiaries)
            additionalData.suppliersList = getSuppliersList(data.suppliers)
          }
          break;

        case "FundTransferRequest":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            additionalData.beneficiariesList = [];
            additionalData.suppliersList = [];
            additionalData.validatorsList = [];

            for (let bc of bcData) {
              let fb = fbData[bc.id];
              fb && data.push({
                id: bc.id,
                purpose: bc.purpose,
                amount: bc.amount,
                approvalStatus: bc.approvalStatus,
                donationDrive: bc.donationDrive,
                validators: removeIdentifierInArr(bc.validators),
                beneficiaries: removeIdentifierInArr(bc.beneficiaries),
                suppliers: removeIdentifierInArr(bc.suppliers)
              })
              additionalData.validatorsList.concat(getValidatorsList(bc.validators));
              additionalData.beneficiariesList.concat(getBeneficiariesList(removeIdentifierInArr(bc.beneficiaries)));
              additionalData.suppliersList.concat(getSuppliersList(removeIdentifierInArr(bc.suppliers)));
            }
          } else { // If reading by id, return {}
            data = {
              id: bcData.id,
              purpose: bcData.purpose,
              amount: bcData.amount,
              approvalStatus: bcData.approvalStatus,
              donationDrive: bcData.donationDrive,
              validators: removeIdentifierInArr(bcData.validators),
              beneficiaries: removeIdentifierInArr(bcData.beneficiaries),
              suppliers: removeIdentifierInArr(bcData.suppliers)
            }

            additionalData.validatorsList = getValidatorsList(data.validators);
            additionalData.beneficiariesList = getBeneficiariesList(data.beneficiaries);
            additionalData.suppliersList = getSuppliersList(data.suppliers);
          }

          break;

        case "ExpenditureReport":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              let fb = fbData[bc.id];
              fb && data.push({
                fundTransferRequests: removeIdentifierInArr(bc.fundTransferRequests),
                receipts: removeIdentifierInArr(bc.receipts),
              })
            }
          } else { // If reading by id, return {}
            data = {
              fundTransferRequests: removeIdentifierInArr(bcData.fundTransferRequests),
              receipts: removeIdentifierInArr(bcData.receipts)
            }
          }
          break;

        case "Receipt":
          if (Array.isArray(bcData)) { // If reading all, return {} of []]
            for (let bc of bcData) {
              let fb = fbData[bc.id];
              fb && data.push({
                filePath: bc.filePath,
              })
            }
          } else { // If reading by id, return {}
            data = {
              filePath: bcData.filePath,
            }
          }
          break;
      }
      res.json({
        data: data,
        additionalData: additionalData
      });

    }, firebaseError => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errorSource: "firebase",
        firebaseError,
      })
    })
  })
  .catch(err => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({errorSource: "blockchain"})
  })
}

function getBeneficiariesList(data) {
  (async () => {
    let beneficiariesList = [];
    for (let beneficiary of data) {
      if (beneficiary.startsWith('Beneficiary/'))
        beneficiary = beneficiary.replace('Beneficiary/', '');
      await db.ref('Beneficiary/' + beneficiary).once("value", snapshot => {
        let beneficiaryRecord = snapshot.val();
        console.log(beneficiaryRecord);
        beneficiariesList.push({
          id: beneficiary,
          beneficiaryName: beneficiaryRecord.beneficiaryName
        })
      })
    }
    return beneficiariesList;
  })();

}

function getSuppliersList(data) {
  let suppliersList = [];
  let p = Promise.resolve();

  for (let supplier of data) {
    p = p.then(() => {
      if (supplier.startsWith('Supplier/'))
        supplier = supplier.replace('Supplier/','');
      db.ref('Supplier/' + supplier).once("value", snapshot => {
        let supplierRecord = snapshot.val();
        suppliersList.push({
          id: supplier,
          supplierName: supplierRecord.supplierName,
          supplyType: supplierRecord.supplyType
        })
      })
    })
  }
  return suppliersList;
}

function getValidatorsList(data) {
  let validatorsList = [];
  let p = Promise.resolve();

  for (let validator of data) {
    p = p.then(() => {
      if (validator.startsWith('Validator/'))
        validator = validator.replace('Validator/','');
      db.ref('Validator/' + validator).once("value", snapshot => {
        let validatorRecord = snapshot.val();
        validatorsList.push({
          id: validator,
          name: validatorRecord.name,
          email: validatorRecord.email,
        })
      })
    })
  }
  return validatorsList;
}

// import firebase from 'firebase';
// import { httpGET, httpPOST } from '../utils/httpUtils'
// import * as HttpStatus from 'http-status-codes';
//
// const db = firebase.database();
//
// export function viewParticipantOrAsset (req, res) {
//   let { type, id } = req.params;
//   let url = 'http://localhost:3000/bc/api/' + type;
//   let firebaseRef = type;
//   if (id) {
//     url += '/' + id;
//     firebaseRef += '/' + id;
//   }
//
//   // Do something with blockchain
//   httpGET(url)
//   .then(responseFromComposer => {
//     let bcData = responseFromComposer.data;
//
//     db.ref(firebaseRef).once("value", snapshot => {
//       let data = [],fbData = snapshot.val() ;
//       console.log("\x1b[35m%s\x1b[0m%s\x1b[35m%s\x1b[0m%s","Blockchain data (from " + url + ")\n",JSON.stringify(bcData,null,2),"\nFirebase data (from " + firebaseRef + ")\n",JSON.stringify(fbData,null,2));
//
//       switch (type) {
//         case "Donor":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               let fb = fbData[bc.id];
//               fb && data.push({
//                 id: bc.id,
//                 firstName: fb.firstName,
//                 lastName: fb.lastName,
//               })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               id: bcData.id,
//               firstName: fbData.firstName,
//               lastName: fbData.lastName,
//             }
//           }
//           break;
//
//         case "CharitableOrganisation":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               let fb = fbData[bc.uen];
//               fb && data.push({
//                 uen: bc.uen,
//                 organisationName: fb.organisationName,
//                 beneficiaries: fb.beneficiaries,
//                 suppliers: fb.suppliers
//               })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               uen: bcData.uen,
//               organisationName: fbData.organisationName,
//               beneficiaries: fbData.beneficiaries,
//               suppliers: fbData.suppliers
//             }
//           }
//           break;
//         case "Beneficiary":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               let fb = fbData[bc.id];
//               fb && data.push({
//                 id: bc.id,
//                 beneficiaryName: fb.beneficiaryName
//               })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               id: bcData.id,
//               beneficiaryName: fbData.beneficiaryName
//             }
//           }
//           break;
//         case "Supplier":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               let fb = fbData[bc.uen];
//               fb && data.push({
//                 uen: bc.uen,
//                 supplierName: fb.supplierName,
//                 supplierType: fb.supplierType
//               })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               uen: bcData.uen,
//               supplierName: fbData.supplierName,
//               supplierType: fbData.supplierType
//             }
//           }
//           break;
//         case "Validator":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               let fb = fbData[bc.id];
//               fb && data.push({
//                 id: bc.id,
//                 expenditureReports: bc.expenditureReports,
//                 fundTransferRequests: bc.fundTransferRequests,
//                 email: fb.email,
//                 name: fb.name,
//               })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               id: bcData.id,
//               expenditureReports: bcData.expenditureReports,
//               fundTransferRequests: bcData.fundTransferRequests,
//               email: fbData.email,
//               name: fbData.name
//             }
//           }
//           break;
//         case "Wallet":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               let fb = fbData[bc.id];
//               fb && data.push({
//                 id: bc.id,
//                 isDonationDrive: bc.isDonationDrive,
//                 balance: fb.balance
//               })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               id: bcData.id,
//               isDonationDrive: bcData.isDonationDrive,
//               balance: fbData.balance
//             }
//           }
//           break;
//         case "DonationDrive":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               // let fb = fbData[bc.id];
//               // fb && data.push({
//               //   id: bc.id,
//               //   field: fb.field,
//               // })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               // id: bcData.id,
//               // field: fbData.field
//             }
//           }
//           break;
//         case "FundTransferRequest":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               // let fb = fbData[bc.id];
//               // fb && data.push({
//               //   id: bc.id,
//               //   field: fb.field,
//               // })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               // id: bcData.id,
//               // field: fbData.field
//             }
//           }
//           break;
//         case "ExpenditureReport":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               // let fb = fbData[bc.id];
//               // fb && data.push({
//               //   id: bc.id,
//               //   field: fb.field,
//               // })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               // id: bcData.id,
//               // field: fbData.field
//             }
//           }
//           break;
//         case "Receipt":
//           if (Array.isArray(bcData)) { // If reading all, return {} of []]
//             for (let bc of bcData) {
//               // let fb = fbData[bc.id];
//               // fb && data.push({
//               //   id: bc.id,
//               //   field: fb.field,
//               // })
//             }
//           } else { // If reading by id, return {}
//             data = {
//               // id: bcData.id,
//               // field: fbData.field
//             }
//           }
//           break;
//       }
//       res.json(data);
//
//     }, firebaseError => {
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//         errorSource: "firebase",
//         firebaseError,
//       })
//     })
//   })
//    .catch(err => {
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       errorSource: "blockchain",
//       // err,
//     })
//   })
// }
