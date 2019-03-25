import express from 'express';
import * as ReadController from '../../controllers/ReadController';
import * as TransactionController from '../../controllers/TransactionController';

let router = express.Router();

// Participants-related
router.route('/Donor/:id').get((req, res) => {
  ReadController.viewDonors(req, res)});
router.route('/Donor').get((req, res) => {
  ReadController.viewDonors(req, res)});

router.route('/CharitableOrganisation/:id').get((req, res) => {
  ReadController.viewCharitableOrganisations(req, res)});
router.route('/CharitableOrganisation').get((req, res) => {
  ReadController.viewCharitableOrganisations(req, res)});

router.route('/Beneficiary/:id').get((req, res) => {
  ReadController.viewBeneficiaries(req, res)});
router.route('/Beneficiary').get((req, res) => {
  ReadController.viewBeneficiaries(req, res)});

router.route('/Supplier/:id').get((req, res) => {
  ReadController.viewSuppliers(req, res)});
router.route('/Supplier').get((req, res) => {
  ReadController.viewSuppliers(req, res)});

router.route('/Validator/:id').get((req, res) => {
  ReadController.viewValidators(req, res)});
router.route('/Validator').get((req, res) => {
  ReadController.viewValidators(req, res)});

// Assets-related
router.route('/Wallet/:id').get((req, res) => {
  ReadController.viewWallets(req, res)});
router.route('/Wallet').get((req, res) => {
  ReadController.viewWallets(req, res)});

router.route('/DonationDrive/:id').get((req, res) => {
  ReadController.viewDonationDrives(req, res)});
router.route('/DonationDrive').get((req, res) => {
  ReadController.viewDonationDrives(req, res)});

router.route('/FundTransferRequest/:id').get((req, res) => {
  ReadController.viewFundTransferRequests(req, res)});
router.route('/FundTransferRequest').get((req, res) => {
  ReadController.viewFundTransferRequests(req, res)});

router.route('/ExpenditureReport/:id').get((req, res) => {
  ReadController.viewExpenditureReports(req, res)});
router.route('/ExpenditureReport').get((req, res) => {
  ReadController.viewExpenditureReports(req, res)});

router.route('/Receipt/:id').get((req, res) => {
  ReadController.viewReceipts(req, res)});
router.route('/Receipt').get((req, res) => {
  ReadController.viewReceipts(req, res)});


// Transactions-related
router.route('/CreateDonationDrive').post((req, res) => {
  TransactionController.createDonationDrive(req, res)});

router.route('/CreateFundTransferRequest').post((req, res) => {
  TransactionController.createFundTransferRequest(req, res)});

router.route('/MakeDonation').post((req, res) => {
  TransactionController.makeDonation(req, res)});

router.route('/TransferFund').post((req, res) => {
  TransactionController.transferFunds(req, res)});

router.route('/ValidateFundTransferRequest').post((req, res) => {
  TransactionController.validateFundTransferRequest(req, res)});

router.route('/WalletTransaction').post((req, res) => {
  TransactionController.walletTransaction(req, res)});

export default router;