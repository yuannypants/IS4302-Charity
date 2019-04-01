import express from 'express';
import * as ReadController from '../../controllers/ReadController';
import * as TransactionController from '../../controllers/TransactionController';

let router = express.Router();

// Viewing of participants, assets and transactionHistory
router.route('/:type(Donor|CharitableOrganisation|Beneficiary|Supplier|Validator|Wallet|DonationDrive|FundTransferRequest|ExpenditureReport|Receipt)/:id').get((req, res) => {
  ReadController.viewParticipantOrAsset(req, res)});
router.route('/:type(Donor|CharitableOrganisation|Beneficiary|Supplier|Validator|Wallet|DonationDrive|FundTransferRequest|ExpenditureReport|Receipt)').get((req, res) => {
  ReadController.viewParticipantOrAsset(req, res)});


router.route('/:type(CreateDonationDrive|CreateFundTransferRequest|MakeDonation|TransferFund|UploadReceipt|ValidateFundTransferRequest|WalletTransaction)/:id').get((req, res) => {
  ReadController.viewTransactionHistory(req, res)});
router.route('/:type(CreateDonationDrive|CreateFundTransferRequest|MakeDonation|TransferFund|UploadReceipt|ValidateFundTransferRequest|WalletTransaction)').get((req, res) => {
  ReadController.viewTransactionHistory(req, res)});


// Transactions-related
// router.route('/CreateDonationDrive/:id').get((req, res) => {
//   TransactionController.createDonationDrive(req, res)});
router.route('/CreateDonationDrive').post((req, res) => {
  TransactionController.createDonationDrive(req, res)});

router.route('/CreateFundTransferRequest').post((req, res) => {
  TransactionController.createFundTransferRequest(req, res)});

router.route('/MakeDonation').post((req, res) => {
  TransactionController.makeDonation(req, res)});

router.route('/TransferFund').post((req, res) => {
  TransactionController.transferFunds(req, res)});

router.route('/UploadReceipt').post((req, res) => {
  TransactionController.uploadReceipt(req, res)});

router.route('/ValidateFundTransferRequest').post((req, res) => {
  TransactionController.validateFundTransferRequest(req, res)});

router.route('/WalletTransaction').post((req, res) => {
  TransactionController.walletTransaction(req, res)});

export default router;
