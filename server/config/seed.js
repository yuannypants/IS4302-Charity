import firebase from 'firebase';
import { httpPOST } from '../utils/httpUtils'

firebase.initializeApp({
  apiKey: "AIzaSyAIn9kS-Kh3PkUfSTQ--tAgTDptcSNbDyM",
  authDomain: "charity-e8ccd.firebaseapp.com",
  databaseURL: "https://charity-e8ccd.firebaseio.com",
  projectId: "charity-e8ccd",
  storageBucket: "charity-e8ccd.appspot.com",
  messagingSenderId: "212836409307"
});

const db = firebase.database();

console.log("\x1b[34m%s\x1b[0m","Seeding data into blockchain...");
console.log("\x1b[35m%s\x1b[0m","  Seeding Donor...");
httpPOST('http://localhost:3000/bc/api/Donor', {"$class": "com.is4302.charity.Donor","id": "S1234567A","wallet": 'resource:com.is4302.charity.Wallet#S1234567A'}).then(() => console.log('    Seeded Donor: S1234567A'))
.then(() => httpPOST('http://localhost:3000/bc/api/Donor', {"$class": "com.is4302.charity.Donor","id": "S1234567B","wallet": 'resource:com.is4302.charity.Wallet#S1234567B'}).then(() => console.log('    Seeded Donor: S1234567B')))
.then(() => httpPOST('http://localhost:3000/bc/api/Donor', {"$class": "com.is4302.charity.Donor","id": "S1234567C","wallet": 'resource:com.is4302.charity.Wallet#S1234567C'}).then(() => console.log('    Seeded Donor: S1234567C')))
.then(() => httpPOST('http://localhost:3000/bc/api/Donor', {"$class": "com.is4302.charity.Donor","id": "S1234567D","wallet": 'resource:com.is4302.charity.Wallet#S1234567D'}).then(() => console.log('    Seeded Donor: S1234567D')))
.then(() => httpPOST('http://localhost:3000/bc/api/Donor', {"$class": "com.is4302.charity.Donor","id": "S1234567E","wallet": 'resource:com.is4302.charity.Wallet#S1234567E'}).then(() => console.log('    Seeded Donor: S1234567E')))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding CharitableOrganisation..."))
.then(() => httpPOST('http://localhost:3000/bc/api/CharitableOrganisation', {"$class": "com.is4302.charity.CharitableOrganisation","uen": "201912345A","beneficiaries": "[\"resource:com.is4302.charity.Beneficiary#201954321A\",\"resource:com.is4302.charity.Beneficiary#201954321B\"]","suppliers": "[\"resource:com.is4302.charity.Supplier#201954321V\",\"resource:com.is4302.charity.Supplier#201954321Z\",\"resource:com.is4302.charity.Supplier#201954321Y\"]"}).then(() => console.log('    Seeded CharitableOrganisation: 201912345A')))
.then(() => httpPOST('http://localhost:3000/bc/api/CharitableOrganisation', {"$class": "com.is4302.charity.CharitableOrganisation","uen": "201912345B","beneficiaries": "[\"resource:com.is4302.charity.Beneficiary#201954321B\",\"resource:com.is4302.charity.Beneficiary#201954321C\"]","suppliers": "[\"resource:com.is4302.charity.Supplier#201954321W\",\"resource:com.is4302.charity.Supplier#201954321V\",\"resource:com.is4302.charity.Supplier#201954321Z\"]"}).then(() => console.log('    Seeded CharitableOrganisation: 201912345B')))
.then(() => httpPOST('http://localhost:3000/bc/api/CharitableOrganisation', {"$class": "com.is4302.charity.CharitableOrganisation","uen": "201912345C","beneficiaries": "[\"resource:com.is4302.charity.Beneficiary#201954321C\",\"resource:com.is4302.charity.Beneficiary#201954321A\"]","suppliers": "[\"resource:com.is4302.charity.Supplier#201954321X\",\"resource:com.is4302.charity.Supplier#201954321W\",\"resource:com.is4302.charity.Supplier#201954321V\"]"}).then(() => console.log('    Seeded CharitableOrganisation: 201912345C')))
.then(() => httpPOST('http://localhost:3000/bc/api/CharitableOrganisation', {"$class": "com.is4302.charity.CharitableOrganisation","uen": "201912345D","beneficiaries": "[\"resource:com.is4302.charity.Beneficiary#201954321A\",\"resource:com.is4302.charity.Beneficiary#201954321B\",\"resource:com.is4302.charity.Beneficiary#201954321C\"]","suppliers": "[\"resource:com.is4302.charity.Supplier#201954321Y\",\"resource:com.is4302.charity.Supplier#201954321X\",\"resource:com.is4302.charity.Supplier#201954321W\"]"}).then(() => console.log('    Seeded CharitableOrganisation: 201912345D')))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Beneficiary..."))
.then(() => httpPOST('http://localhost:3000/bc/api/Beneficiary', {"$class": "com.is4302.charity.Beneficiary","id": "201954321A","wallet": 'resource:com.is4302.charity.Wallet#201954321A'}).then(() => console.log('    Seeded Beneficiary: 201954321A')))
.then(() => httpPOST('http://localhost:3000/bc/api/Beneficiary', {"$class": "com.is4302.charity.Beneficiary","id": "201954321B","wallet": 'resource:com.is4302.charity.Wallet#201954321B'}).then(() => console.log('    Seeded Beneficiary: 201954321B')))
.then(() => httpPOST('http://localhost:3000/bc/api/Beneficiary', {"$class": "com.is4302.charity.Beneficiary","id": "201954321C","wallet": 'resource:com.is4302.charity.Wallet#201954321C'}).then(() => console.log('    Seeded Beneficiary: 201954321C')))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Supplier..."))
.then(() => httpPOST('http://localhost:3000/bc/api/Supplier', {"$class": "com.is4302.charity.Supplier","uen": "201912345Z","wallet": 'resource:com.is4302.charity.Wallet#201912345Z'}).then(() => console.log('    Seeded Supplier: 201912345Z')))
.then(() => httpPOST('http://localhost:3000/bc/api/Supplier', {"$class": "com.is4302.charity.Supplier","uen": "201912345Y","wallet": 'resource:com.is4302.charity.Wallet#201912345Y'}).then(() => console.log('    Seeded Supplier: 201912345Y')))
.then(() => httpPOST('http://localhost:3000/bc/api/Supplier', {"$class": "com.is4302.charity.Supplier","uen": "201912345X","wallet": 'resource:com.is4302.charity.Wallet#201912345X'}).then(() => console.log('    Seeded Supplier: 201912345X')))
.then(() => httpPOST('http://localhost:3000/bc/api/Supplier', {"$class": "com.is4302.charity.Supplier","uen": "201912345W","wallet": 'resource:com.is4302.charity.Wallet#201912345W'}).then(() => console.log('    Seeded Supplier: 201912345W')))
.then(() => httpPOST('http://localhost:3000/bc/api/Supplier', {"$class": "com.is4302.charity.Supplier","uen": "201912345V","wallet": 'resource:com.is4302.charity.Wallet#201912345V'}).then(() => console.log('    Seeded Supplier: 201912345V')))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Validator..."))
.then(() => httpPOST('http://localhost:3000/bc/api/Validator', {"$class": "com.is4302.charity.Validator","id": "S7654321A","expenditureReports": [],"fundTransferRequests": []}).then(() => console.log('    Seeded Validator: S7654321A')))
.then(() => httpPOST('http://localhost:3000/bc/api/Validator', {"$class": "com.is4302.charity.Validator","id": "S7654321B","expenditureReports": [],"fundTransferRequests": []}).then(() => console.log('    Seeded Validator: S7654321B')))
.then(() => httpPOST('http://localhost:3000/bc/api/Validator', {"$class": "com.is4302.charity.Validator","id": "S7654321C","expenditureReports": [],"fundTransferRequests": []}).then(() => console.log('    Seeded Validator: S7654321C')))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Wallet..."))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 12.50,"id": "S1234567A"}).then(() => console.log('    Seeded Wallet: S1234567A')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 12.50,"id": "S1234567B"}).then(() => console.log('    Seeded Wallet: S1234567B')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 12.50,"id": "S1234567C"}).then(() => console.log('    Seeded Wallet: S1234567C')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 12.50,"id": "S1234567D"}).then(() => console.log('    Seeded Wallet: S1234567D')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 12.50,"id": "S1234567E"}).then(() => console.log('    Seeded Wallet: S1234567E')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "201954321A"}).then(() => console.log('    Seeded Wallet: 201954321A')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "201954321B"}).then(() => console.log('    Seeded Wallet: 201954321B')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "201954321C"}).then(() => console.log('    Seeded Wallet: 201954321C')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "201912345Z"}).then(() => console.log('    Seeded Wallet: 201912345Z')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "201912345Y"}).then(() => console.log('    Seeded Wallet: 201912345Y')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "201912345X"}).then(() => console.log('    Seeded Wallet: 201912345X')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "201912345W"}).then(() => console.log('    Seeded Wallet: 201912345W')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "201912345V"}).then(() => console.log('    Seeded Wallet: 201912345V')))

.then(() => console.log("\x1b[34m%s\x1b[0m","\nSeeding data into Firebase database server..."))
.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Donor..."))
.then(() => db.ref('Donor/S1234567A').set({firstName: 'Jitrakorn', lastName: 'Tan', password: 'passworda'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567A'); else console.log('    Seeded Donor: S1234567A')}))
.then(() => db.ref('Donor/S1234567B').set({firstName: 'Ming Xuan',lastName: 'Oh',password: 'passwordb'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567B'); else console.log('    Seeded Donor: S1234567B')}))
.then(() => db.ref('Donor/S1234567C').set({firstName: 'Pamela',lastName: 'Teo',password: 'passwordc'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567C'); else console.log('    Seeded Donor: S1234567C')}))
.then(() => db.ref('Donor/S1234567D').set({firstName: 'Terence',lastName: 'Tay',password: 'passwordd'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567D'); else console.log('    Seeded Donor: S1234567D')}))
.then(() => db.ref('Donor/S1234567E').set({firstName: 'Yuanhao',lastName: 'Zhang',password: 'passworde'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567E'); else console.log('    Seeded Donor: S1234567E')}))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding CharitableOrganisation..."))
.then(() => db.ref('CharitableOrganisation/201912345A').set({organisationName: 'Community Chest',password: 'passworda',beneficiaries: ['201954321A','201954321B'],suppliers: ['201954321V','201954321Z','201954321Y']}, firebaseError => {if (firebaseError) console.log('Failed to create CharitableOrganisation: 201912345A'); else console.log('    Seeded CharitableOrganisation: 201912345A')}))
.then(() => db.ref('CharitableOrganisation/201912345B').set({organisationName: 'Singapore Red Cross',password: 'passwordb',beneficiaries: ['201954321B','201954321C'],suppliers: ['201954321W','201954321V','201954321Z']}, firebaseError => {if (firebaseError) console.log('Failed to create CharitableOrganisation: 201912345B'); else console.log('    Seeded CharitableOrganisation: 201912345B')}))
.then(() => db.ref('CharitableOrganisation/201912345C').set({organisationName: 'Club Rainbow',password: 'passwordc',beneficiaries: ['201954321C','201954321A'],suppliers: ['201954321X','201954321W','201954321V']}, firebaseError => {if (firebaseError) console.log('Failed to create CharitableOrganisation: 201912345C'); else console.log('    Seeded CharitableOrganisation: 201912345C')}))
.then(() => db.ref('CharitableOrganisation/201912345D').set({organisationName: 'Hope Centre Singapore',password: 'passwordd',beneficiaries: ['201954321A','201954321B','201954321C'],suppliers: ['201954321Y','201954321X','201954321W']}, firebaseError => {if (firebaseError) console.log('Failed to create CharitableOrganisation: 201912345D\n'); else console.log('    Seeded CharitableOrganisation: 201912345D')}))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Beneficiary..."))
.then(() => db.ref('Beneficiary/201954321A').set({beneficiaryName: 'Alzheimer\'s Disease Association',password: 'passworda'}, firebaseError => {if (firebaseError) console.log('Failed to create Beneficiary: 201954321A'); else console.log('    Seeded Beneficiary: 201954321A')}))
.then(() => db.ref('Beneficiary/201954321B').set({beneficiaryName: 'National Council of Social Service',password: 'passwordb'}, firebaseError => {if (firebaseError) console.log('Failed to create Beneficiary: 201954321B'); else console.log('    Seeded Beneficiary: 201954321B')}))
.then(() => db.ref('Beneficiary/201954321C').set({beneficiaryName: 'Singapore Association for Mental Health',password: 'passwordc'}, firebaseError => {if (firebaseError) console.log('Failed to create Beneficiary: 201954321C'); else console.log('    Seeded Beneficiary: 201954321C')}))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Supplier..."))
.then(() => db.ref('Supplier/201912345Z').set({supplierName: 'Foodline',supplyType: 'Food',password: 'passwordz'}, firebaseError => {if (firebaseError) console.log('Failed to create Supplier: 201912345Z'); else console.log('    Seeded Supplier: 201912345Z')}))
.then(() => db.ref('Supplier/201912345Y').set({supplierName: 'MacDonald\'s',supplyType: 'Food',password: 'passwordy'}, firebaseError => {if (firebaseError) console.log('Failed to create Supplier: 201912345Y'); else console.log('    Seeded Supplier: 201912345Y')}))
.then(() => db.ref('Supplier/201912345X').set({supplierName: 'Kiddy Palace',supplyType: 'Clothes',password: 'passwordx'}, firebaseError => {if (firebaseError) console.log('Failed to create Supplier: 201912345X'); else console.log('    Seeded Supplier: 201912345X')}))
.then(() => db.ref('Supplier/201912345W').set({supplierName: 'Guardian',supplyType: 'First aid',password: 'passwordw'}, firebaseError => {if (firebaseError) console.log('Failed to create Supplier: 201912345W'); else console.log('    Seeded Supplier: 201912345W')}))
.then(() => db.ref('Supplier/201912345V').set({supplierName: 'Windows',supplyType: 'Electronics',password: 'passwordv'}, firebaseError => {if (firebaseError) console.log('Failed to create Supplier: 201912345V'); else console.log('    Seeded Supplier: 201912345V')}))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Validator..."))
.then(() => db.ref('Validator/S7654321A').set({name: 'John',email: 'john@is4302.com',password: 'passworda',expenditureRecords: []}, firebaseError => {if (firebaseError) console.log('Failed to create Validator: S7654321A'); else console.log('    Seeded Validator: S7654321A')}))
.then(() => db.ref('Validator/S7654321B').set({name: 'Peter',email: 'Peter@is4302.com',password: 'passwordb',expenditureRecords: []}, firebaseError => {if (firebaseError) console.log('Failed to create Validator: S7654321B'); else console.log('    Seeded Validator: S7654321B')}))
.then(() => db.ref('Validator/S7654321C').set({name: 'Mary',email: 'mary@is4302.com',password: 'passwordc',expenditureRecords: []}, firebaseError => {if (firebaseError) console.log('Failed to create Validator: S7654321C'); else console.log('    Seeded Validator: S7654321C')}))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Wallet..."))
.then(() => db.ref('Wallet/S1234567A').set({balance: 12.50}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: S1234567A'); else console.log('    Seeded Wallet: S1234567A')}))
.then(() => db.ref('Wallet/S1234567B').set({balance: 12.50}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: S1234567B'); else console.log('    Seeded Wallet: S1234567B')}))
.then(() => db.ref('Wallet/S1234567C').set({balance: 12.50}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: S1234567C'); else console.log('    Seeded Wallet: S1234567C')}))
.then(() => db.ref('Wallet/S1234567D').set({balance: 12.50}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: S1234567D'); else console.log('    Seeded Wallet: S1234567D')}))
.then(() => db.ref('Wallet/S1234567E').set({balance: 12.50}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: S1234567E'); else console.log('    Seeded Wallet: S1234567E')}))
.then(() => db.ref('Wallet/201954321A').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: 201954321A'); else console.log('    Seeded Wallet: 201954321A')}))
.then(() => db.ref('Wallet/201954321B').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: 201954321B'); else console.log('    Seeded Wallet: 201954321B')}))
.then(() => db.ref('Wallet/201954321C').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: 201954321C'); else console.log('    Seeded Wallet: 201954321C')}))
.then(() => db.ref('Wallet/201912345Z').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: 201912345Z'); else console.log('    Seeded Wallet: 201912345Z')}))
.then(() => db.ref('Wallet/201912345Y').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: 201912345Y'); else console.log('    Seeded Wallet: 201912345Y')}))
.then(() => db.ref('Wallet/201912345X').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: 201912345X'); else console.log('    Seeded Wallet: 201912345X')}))
.then(() => db.ref('Wallet/201912345W').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: 201912345W'); else console.log('    Seeded Wallet: 201912345W')}))
.then(() => db.ref('Wallet/201912345V').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: 201912345V'); else console.log('    Seeded Wallet: 201912345V')}))

.then(() => {
  console.log("\x1b[32m%s\x1b[0m","\nSeeding complete!");
  process.exit();
})
.catch(err => {
  console.log(JSON.stringify(err.response.data,null,2));
  process.exit();
});
