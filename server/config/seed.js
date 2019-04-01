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
.then(() => httpPOST('http://localhost:3000/bc/api/CharitableOrganisation', {"$class": "com.is4302.charity.CharitableOrganisation","uen": "201912345A","donationDriveBeneficiaries": "[\"resource:com.is4302.charity.Beneficiary#201954321A\",\"resource:com.is4302.charity.Beneficiary#201954321B\"]","donationDriveSuppliers": "[\"resource:com.is4302.charity.Supplier#201912345V\",\"resource:com.is4302.charity.Supplier#201912345Z\",\"resource:com.is4302.charity.Supplier#201912345Y\"]"}).then(() => console.log('    Seeded CharitableOrganisation: 201912345A')))
.then(() => httpPOST('http://localhost:3000/bc/api/CharitableOrganisation', {"$class": "com.is4302.charity.CharitableOrganisation","uen": "201912345B","donationDriveBeneficiaries": "[\"resource:com.is4302.charity.Beneficiary#201954321B\",\"resource:com.is4302.charity.Beneficiary#201954321C\"]","donationDriveSuppliers": "[\"resource:com.is4302.charity.Supplier#201912345W\",\"resource:com.is4302.charity.Supplier#201912345V\",\"resource:com.is4302.charity.Supplier#201912345Z\"]"}).then(() => console.log('    Seeded CharitableOrganisation: 201912345B')))
.then(() => httpPOST('http://localhost:3000/bc/api/CharitableOrganisation', {"$class": "com.is4302.charity.CharitableOrganisation","uen": "201912345C","donationDriveBeneficiaries": "[\"resource:com.is4302.charity.Beneficiary#201954321C\",\"resource:com.is4302.charity.Beneficiary#201954321A\"]","donationDriveSuppliers": "[\"resource:com.is4302.charity.Supplier#201912345X\",\"resource:com.is4302.charity.Supplier#201912345W\",\"resource:com.is4302.charity.Supplier#201912345V\"]"}).then(() => console.log('    Seeded CharitableOrganisation: 201912345C')))
.then(() => httpPOST('http://localhost:3000/bc/api/CharitableOrganisation', {"$class": "com.is4302.charity.CharitableOrganisation","uen": "201912345D","donationDriveBeneficiaries": "[\"resource:com.is4302.charity.Beneficiary#201954321A\",\"resource:com.is4302.charity.Beneficiary#201954321B\",\"resource:com.is4302.charity.Beneficiary#201954321C\"]","donationDriveSuppliers": "[\"resource:com.is4302.charity.Supplier#201912345Y\",\"resource:com.is4302.charity.Supplier#201912345X\",\"resource:com.is4302.charity.Supplier#201912345W\"]"}).then(() => console.log('    Seeded CharitableOrganisation: 201912345D')))

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
.then(() => httpPOST('http://localhost:3000/bc/api/Validator', {"$class": "com.is4302.charity.Validator","id": "S7654321A"}).then(() => console.log('    Seeded Validator: S7654321A')))
.then(() => httpPOST('http://localhost:3000/bc/api/Validator', {"$class": "com.is4302.charity.Validator","id": "S7654321B"}).then(() => console.log('    Seeded Validator: S7654321B')))
.then(() => httpPOST('http://localhost:3000/bc/api/Validator', {"$class": "com.is4302.charity.Validator","id": "S7654321C"}).then(() => console.log('    Seeded Validator: S7654321C')))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding DonationDrive..."))
.then(() => httpPOST('http://localhost:3000/bc/api/DonationDrive', {"$class": "com.is4302.charity.DonationDrive","id": "Green Initiative Drive", "wallet": 'resource:com.is4302.charity.Wallet#Green Initiative Drive', "charitableOrganisation": 'resource:com.is4302.charity.CharitableOrganisation#201912345A', "expenditureReport":'resource:com.is4302.charity.ExpenditureReport#Green Initiative Drive', "donationDriveBeneficiaries":"[\"resource:com.is4302.charity.Beneficiary#201954321A\"]"}).then(() => console.log('    Seeded DonationDrive: Green Initiative Drive')))
.then(() => httpPOST('http://localhost:3000/bc/api/DonationDrive', {"$class": "com.is4302.charity.DonationDrive","id": "Empower Youths", "wallet": 'resource:com.is4302.charity.Wallet#Empower Youths', "charitableOrganisation": 'resource:com.is4302.charity.CharitableOrganisation#201912345B', "expenditureReport":'resource:com.is4302.charity.ExpenditureReport#Empower Youths', "donationDriveBeneficiaries":"[\"resource:com.is4302.charity.Beneficiary#201954321B\"]"}).then(() => console.log('    Seeded DonationDrive: Empower Youths')))
.then(() => httpPOST('http://localhost:3000/bc/api/DonationDrive', {"$class": "com.is4302.charity.DonationDrive","id": "Rise Singapore", "wallet": 'resource:com.is4302.charity.Wallet#Rise Singapore', "charitableOrganisation": 'resource:com.is4302.charity.CharitableOrganisation#201912345C', "expenditureReport":'resource:com.is4302.charity.ExpenditureReport#Rise Singapore', "donationDriveBeneficiaries":"[\"resource:com.is4302.charity.Beneficiary#201954321C\"]"}).then(() => console.log('    Seeded DonationDrive: Drive Singapore')))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding ExpenditureReport..."))
.then(() => httpPOST('http://localhost:3000/bc/api/ExpenditureReport', {"$class": "com.is4302.charity.ExpenditureReport","id": "Green Initiative Drive","receipts": "[\"resource:com.is4302.charity.Receipt#GID430201A\",\"resource:com.is4302.charity.Receipt#GID430201B\",\"resource:com.is4302.charity.Receipt#GID430201C\"]"}).then(() => console.log('    Seeded Donation Drive: Green Initiative Drive')))
.then(() => httpPOST('http://localhost:3000/bc/api/ExpenditureReport', {"$class": "com.is4302.charity.ExpenditureReport","id": "Empower Youths","receipts": "[\"resource:com.is4302.charity.Receipt#EY430201A\",\"resource:com.is4302.charity.Receipt#EY430201B\",\"resource:com.is4302.charity.Receipt#EY430201C\"]"}).then(() => console.log('    Seeded Donation Drive: Empower Youths')))
.then(() => httpPOST('http://localhost:3000/bc/api/ExpenditureReport', {"$class": "com.is4302.charity.ExpenditureReport","id": "Rise Singapore","receipts": "[\"resource:com.is4302.charity.Receipt#RS430201A\",\"resource:com.is4302.charity.Receipt#RS430201B\",\"resource:com.is4302.charity.Receipt#RS430201C\"]"}).then(() => console.log('    Seeded Donation Drive: Rise Singapore')))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Receipt..."))
.then(() => httpPOST('http://localhost:3000/bc/api/Receipt', {"$class": "com.is4302.charity.Receipt","filePath": "GID430201A"}).then(() => console.log('    Seeded Receipt: GID430201A')))
.then(() => httpPOST('http://localhost:3000/bc/api/Receipt', {"$class": "com.is4302.charity.Receipt","filePath": "GID430202B"}).then(() => console.log('    Seeded Receipt: GID430202B')))
.then(() => httpPOST('http://localhost:3000/bc/api/Receipt', {"$class": "com.is4302.charity.Receipt","filePath": "GID430203C"}).then(() => console.log('    Seeded Receipt: GID430203C')))
.then(() => httpPOST('http://localhost:3000/bc/api/Receipt', {"$class": "com.is4302.charity.Receipt","filePath": "EY430201A"}).then(() => console.log('    Seeded Receipt: EY430201A')))
.then(() => httpPOST('http://localhost:3000/bc/api/Receipt', {"$class": "com.is4302.charity.Receipt","filePath": "EY430202B"}).then(() => console.log('    Seeded Receipt: EY430202B')))
.then(() => httpPOST('http://localhost:3000/bc/api/Receipt', {"$class": "com.is4302.charity.Receipt","filePath": "EY430203C"}).then(() => console.log('    Seeded Receipt: EY430203C')))
.then(() => httpPOST('http://localhost:3000/bc/api/Receipt', {"$class": "com.is4302.charity.Receipt","filePath": "RS430201A"}).then(() => console.log('    Seeded Receipt: RS430201A')))
.then(() => httpPOST('http://localhost:3000/bc/api/Receipt', {"$class": "com.is4302.charity.Receipt","filePath": "RS430202B"}).then(() => console.log('    Seeded Receipt: RS430202B')))
.then(() => httpPOST('http://localhost:3000/bc/api/Receipt', {"$class": "com.is4302.charity.Receipt","filePath": "RS430203C"}).then(() => console.log('    Seeded Receipt: RS430203C')))

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
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "Green Initiative Drive", "isDonationDrive": true}).then(() => console.log('    Seeded Wallet: Green Initiative Drive')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "Empower Youths", "isDonationDrive": true}).then(() => console.log('    Seeded Wallet: Empower Youths')))
.then(() => httpPOST('http://localhost:3000/bc/api/Wallet', {"$class": "com.is4302.charity.Wallet","balance": 0,"id": "Rise Singapore", "isDonationDrive": true}).then(() => console.log('    Seeded Wallet: Rise Singapore')))

.then(() => console.log("\x1b[34m%s\x1b[0m","\nSeeding data into Firebase database server..."))
.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Donor..."))
.then(() => db.ref('Donor/S1234567A').set({firstName: 'Jitrakorn', lastName: 'Tan', password: 'passworda'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567A'); else console.log('    Seeded Donor: S1234567A')}))
.then(() => db.ref('Donor/S1234567B').set({firstName: 'Ming Xuan',lastName: 'Oh',password: 'passwordb'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567B'); else console.log('    Seeded Donor: S1234567B')}))
.then(() => db.ref('Donor/S1234567C').set({firstName: 'Pamela',lastName: 'Teo',password: 'passwordc'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567C'); else console.log('    Seeded Donor: S1234567C')}))
.then(() => db.ref('Donor/S1234567D').set({firstName: 'Terence',lastName: 'Tay',password: 'passwordd'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567D'); else console.log('    Seeded Donor: S1234567D')}))
.then(() => db.ref('Donor/S1234567E').set({firstName: 'Yuanhao',lastName: 'Zhang',password: 'passworde'}, firebaseError => {if (firebaseError) console.log('Failed to create Donor: S1234567E'); else console.log('    Seeded Donor: S1234567E')}))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding CharitableOrganisation..."))
.then(() => db.ref('CharitableOrganisation/201912345A').set({organisationName: 'Community Chest',password: 'passworda',donationDriveBeneficiaries: ['201954321A','201954321B'],donationDriveSuppliers: ['201954321V','201954321Z','201954321Y']}, firebaseError => {if (firebaseError) console.log('Failed to create CharitableOrganisation: 201912345A'); else console.log('    Seeded CharitableOrganisation: 201912345A')}))
.then(() => db.ref('CharitableOrganisation/201912345B').set({organisationName: 'Singapore Red Cross',password: 'passwordb',donationDriveBeneficiaries: ['201954321B','201954321C'],donationDriveSuppliers: ['201954321W','201954321V','201954321Z']}, firebaseError => {if (firebaseError) console.log('Failed to create CharitableOrganisation: 201912345B'); else console.log('    Seeded CharitableOrganisation: 201912345B')}))
.then(() => db.ref('CharitableOrganisation/201912345C').set({organisationName: 'Club Rainbow',password: 'passwordc',donationDriveBeneficiaries: ['201954321C','201954321A'],donationDriveSuppliers: ['201954321X','201954321W','201954321V']}, firebaseError => {if (firebaseError) console.log('Failed to create CharitableOrganisation: 201912345C'); else console.log('    Seeded CharitableOrganisation: 201912345C')}))
.then(() => db.ref('CharitableOrganisation/201912345D').set({organisationName: 'Hope Centre Singapore',password: 'passwordd',donationDriveBeneficiaries: ['201954321A','201954321B','201954321C'],donationDriveSuppliers: ['201954321Y','201954321X','201954321W']}, firebaseError => {if (firebaseError) console.log('Failed to create CharitableOrganisation: 201912345D\n'); else console.log('    Seeded CharitableOrganisation: 201912345D')}))

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

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding DonationDrive..."))
.then(() => db.ref('DonationDrive/Green Initiative Drive').set({wallet: 'Green Initiative Drive',charitableOrganisation: '201912345A',expenditureReport: 'Green Initiative Drive', donationDriveBeneficiaries: ['201954321A'], purpose: 'To maintain sustainability of the environment.'}, firebaseError => {if (firebaseError) console.log('Failed to create DonationDrive: Green Initiative Drive'); else console.log('    Seeded DonationDrive: Green Initiative Drive')}))
.then(() => db.ref('DonationDrive/Empower Youths').set({wallet: 'Empower Youths',charitableOrganisation: '201912345B',expenditureReport: 'Empower Youths', donationDriveBeneficiaries: ['201954321B'], purpose: 'To empower youths to chase their dreams.'}, firebaseError => {if (firebaseError) console.log('Failed to create DonationDrive: Empower Youths'); else console.log('    Seeded DonationDrive: Empower Youths')}))
.then(() => db.ref('DonationDrive/Rise Singapore').set({wallet: 'Rise Singapore',charitableOrganisation: '201912345C',expenditureReport: 'Rise Singapore', donationDriveBeneficiaries: ['201954321C'], purpose: 'To allow minorities to be heard.'}, firebaseError => {if (firebaseError) console.log('Failed to create DonationDrive: Rise Singapore'); else console.log('    Seeded DonationDrive: Rise Singapore')}))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding ExpenditureReport..."))
.then(() => db.ref('ExpenditureReport/Green Initiative Drive').set({receipts: ['GID430201A','GID430202B','GID430203B']}, firebaseError => {if (firebaseError) console.log('Failed to create ExpenditureReport: Green Initiative Drive'); else console.log('    Seeded ExpenditureReport: Green Initiative Drive')}))
.then(() => db.ref('ExpenditureReport/Empower Youths').set({receipts: ['EY430201A','EY430202B','EY430203B']}, firebaseError => {if (firebaseError) console.log('Failed to create ExpenditureReport: Empower Youths'); else console.log('    Seeded ExpenditureReport: Empower Youths')}))
.then(() => db.ref('ExpenditureReport/Rise Singapore').set({receipts: ['RS430201A','RS430202B','RS430203B']}, firebaseError => {if (firebaseError) console.log('Failed to create ExpenditureReport: Rise Singapore'); else console.log('    Seeded ExpenditureReport: Rise Singapore')}))

.then(() => console.log("\x1b[35m%s\x1b[0m","  Seeding Receipt..."))
.then(() => db.ref('Receipt/GID430201A').set({}, firebaseError => {if (firebaseError) console.log('Failed to create Receipt: GID430201A'); else console.log('    Seeded Receipt: GID430201A')}))
.then(() => db.ref('Receipt/GID430202B').set({}, firebaseError => {if (firebaseError) console.log('Failed to create Receipt: GID430202B'); else console.log('    Seeded Receipt: GID430202B')}))
.then(() => db.ref('Receipt/GID430203C').set({}, firebaseError => {if (firebaseError) console.log('Failed to create Receipt: GID430203C'); else console.log('    Seeded Receipt: GID430203C')}))
.then(() => db.ref('Receipt/EY430201A').set({}, firebaseError => {if (firebaseError) console.log('Failed to create Receipt: EY430201A'); else console.log('    Seeded Receipt: EY430201A')}))
.then(() => db.ref('Receipt/EY430202B').set({}, firebaseError => {if (firebaseError) console.log('Failed to create Receipt: EY430202B'); else console.log('    Seeded Receipt: EY430202B')}))
.then(() => db.ref('Receipt/EY430203C').set({}, firebaseError => {if (firebaseError) console.log('Failed to create Receipt: EY430203C'); else console.log('    Seeded Receipt: EY430203C')}))
.then(() => db.ref('Receipt/RS430201A').set({}, firebaseError => {if (firebaseError) console.log('Failed to create Receipt: RS430201A'); else console.log('    Seeded Receipt: RS430201A')}))
.then(() => db.ref('Receipt/RS430202B').set({}, firebaseError => {if (firebaseError) console.log('Failed to create Receipt: RS430202B'); else console.log('    Seeded Receipt: RS430202B')}))
.then(() => db.ref('Receipt/RS430203C').set({}, firebaseError => {if (firebaseError) console.log('Failed to create Receipt: RS430203C'); else console.log('    Seeded Receipt: RS430203C')}))

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
.then(() => db.ref('Wallet/Green Initiative Drive').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: Green Initiative Drive'); else console.log('    Seeded Wallet: Green Initiative Drive')}))
.then(() => db.ref('Wallet/Empower Youths').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: Empower Youths'); else console.log('    Seeded Wallet: Empower Youths')}))
.then(() => db.ref('Wallet/Rise Singapore').set({balance: 0}, firebaseError => {if (firebaseError) console.log('Failed to create Wallet: Rise Singapore'); else console.log('    Seeded Wallet: Rise Singapore')}))

.then(() => {
  console.log("\x1b[32m%s\x1b[0m","\nSeeding complete!");
  process.exit();
})
.catch(err => {
  console.log(JSON.stringify(err.response.data,null,2));
  process.exit();
})

