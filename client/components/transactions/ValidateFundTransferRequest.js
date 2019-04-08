import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { JsonToTable } from 'react-json-to-table'
import { removeIdentifier, removeIdentifierInArr } from '../../utils/bcUtils'
import { httpGET, httpPOST } from '../../utils/httpUtils'

export default class ValidateFundTransferRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
    this.onRequestSelect = this.onRequestSelect.bind(this);
    this.shortenDonationDriveTemplate = this.shortenDonationDriveTemplate.bind(this);
    this.shortenBeneficiaryTemplate = this.shortenBeneficiaryTemplate.bind(this);
    this.shortenSupplierTemplate = this.shortenSupplierTemplate.bind(this);
    this.shortenValidatorTemplate = this.shortenValidatorTemplate.bind(this);
  }


  componentDidMount() {
    let url = 'http://localhost:3000/api/private/FundTransferRequest';

    httpGET(url)
    .then(response => {
      this.setState({requests: response.data.data});
    })
  }

  shortenDonationDriveTemplate(rowData, column) {
    return <span>{decodeURI(removeIdentifier(rowData.donationDrive))}</span>;
  }

  shortenBeneficiaryTemplate(rowData, column) {
    if (rowData.beneficiaries) {
      let beneficiariesString = "";
      for (let beneficiary of rowData.beneficiaries)
        beneficiariesString+= removeIdentifier(beneficiary) + ', ';
      return <span>{ beneficiariesString.substring(0, beneficiariesString.length - 2) }</span>;
    } else {
      return <span>None</span>
    }
  }

  shortenSupplierTemplate(rowData, column) {
    if (rowData.suppliers) {
      let suppliersString = "";
      for (let supplier of rowData.suppliers)
        suppliersString+= removeIdentifier(supplier) + ', ';
      return <span>{ suppliersString.substring(0, suppliersString.length - 2) }</span>;
    } else {
      return <span>None</span>
    }
  }

  shortenValidatorTemplate(rowData, column) {
    if (rowData.validators) {
      let validatorsString = "";
      for (let validator of rowData.validators)
        validatorsString+= removeIdentifier(validator) + ', ';
      return <span>{ validatorsString.substring(0, validatorsString.length - 2) }</span>;
    } else {
      return <span>None</span>
    }
  }

  approve() {
    let requests = [...this.state.requests];
    this.state.request.validators =  [localStorage.getItem("username")];
    requests[this.findSelectedRequestIndex()] = this.state.request;

    this.setState({requests:requests, selectedRequest:null, request: null, displayDialog:false});

    let url = 'http://localhost:3000/api/private/FundTransferRequest';

    httpGET(url)
    .then(response => {
      this.setState({requests: response.data.data});
    })

  }

  reject() {
    let requests = [...this.state.requests];
    this.state.request.approvalStatus = "Rejected";
    requests[this.findSelectedRequestIndex()] = this.state.request;

    this.setState({requests:requests, selectedRequest:null, request: null, displayDialog:false});
  }

  findSelectedRequestIndex() {
    return this.state.requests.indexOf(this.state.selectedRequest);
  }

  onRequestSelect(e){
    this.newRequest = false;
    this.setState({
      displayDialog:true,
      request: Object.assign({}, e.data)
    });
  }

  render() {
    let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>Unvalidated Funds Transfer Requests</div>;

    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Reject" className="p-button-danger" icon="pi pi-times" onClick={this.reject}/>
      <Button label="Validate" className="p-button-success" icon="pi pi-check" onClick={this.approve}/>
    </div>;

    let dialogDD = "None";
    if (this.state.request && this.state.request.donationDrive) {
      dialogDD = decodeURI(removeIdentifier(this.state.request.donationDrive));
    }

    let dialogBeneficiaries;
    if (this.state.request && this.state.request.beneficiaries) {
      let beneficiariesString = "";
      for (let beneficiary of this.state.request.beneficiaries)
        beneficiariesString+= removeIdentifier(beneficiary) + ', ';
      dialogBeneficiaries = beneficiariesString.substring(0, beneficiariesString.length - 2)
    } else {
      dialogBeneficiaries = "None"
    }

    let dialogSuppliers;
    if (this.state.request && this.state.request.suppliers) {
      let suppliersString = "";
      for (let supplier of this.state.request.suppliers)
        suppliersString+= removeIdentifier(supplier) + ', ';
      dialogSuppliers = suppliersString.substring(0, suppliersString.length - 2)
    } else {
      dialogSuppliers = "None"
    }

    let dialogValidators;
    if (this.state.request && this.state.request.validators) {
      let validatorsString = "";
      for (let validator of this.state.request.validator)
        validatorsString+= removeIdentifier(validator) + ', ';
      dialogValidators = validatorsString.substring(0, validatorsString.length - 2)
    } else {
      dialogValidators = "None"
    }

    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Validate Funds Transfer Request</title>
          <meta name="description" content="Validate Funds Transfer Request" />
        </Helmet>
        <div className="p-col-12">
          <div className="p-col-12">
            <div className="card card-w-title">
              <h1>Validate Requests</h1>
              <DataTable
                value={this.state.requests}
                paginator={true}
                rows={15}
                header={header}
                selectionMode="single"
                selection={this.state.selectedRequest}
                onSelectionChange={e => this.setState({selectedRequest: e.value})}
                onRowSelect={this.onRequestSelect}
              >
                <Column field="id" header="Name" sortable={true} />
                <Column field="purpose" header="Purpose" sortable={true} />
                <Column field="amount" header="Amount Requested ($)" sortable={true} />
                <Column field="approvalStatus" header="Approval Status" sortable={true} />
                <Column field="validators" header="Personnel who have approved" body={this.shortenValidatorTemplate} sortable={true} />
                <Column field="donationDrive" header="Source Donation Drive" body={this.shortenDonationDriveTemplate} sortable={true} />
                <Column field="beneficiaries" header="Recipient Beneficiaries" body={this.shortenBeneficiaryTemplate} sortable={true} />
                <Column field="suppliers" header="Recipient Suppliers" body={this.shortenSupplierTemplate}sortable={true} />
              </DataTable>

              <Dialog visible={this.state.displayDialog} width="300px" header="Request Details" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
                {
                  this.state.request &&

                  <div className="p-grid p-fluid">
                    <div className="p-col-4" style={{padding:'.75em'}}><strong>Name</strong></div>
                    <div className="p-col-8" style={{padding:'.5em'}}><label>{this.state.request.id}</label></div>
                    <div className="p-col-4" style={{padding:'.75em'}}><strong>Purpose</strong></div>
                    <div className="p-col-8" style={{padding:'.5em'}}><label>{this.state.request.purpose}</label></div>
                    <div className="p-col-4" style={{padding:'.75em'}}><strong>Amount</strong></div>
                    <div className="p-col-8" style={{padding:'.5em'}}><label>{this.state.request.amount}</label></div>
                    <div className="p-col-4" style={{padding:'.75em'}}><strong>Approval Status</strong></div>
                    <div className="p-col-8" style={{padding:'.5em'}}><label>{this.state.request.approvalStatus}</label></div>
                    <div className="p-col-4" style={{padding:'.75em'}}><strong>Validators</strong></div>
                    <div className="p-col-8" style={{padding:'.5em'}}><label>{dialogValidators}</label></div>
                    <div className="p-col-4" style={{padding:'.75em'}}><strong>Donation Drive</strong></div>
                    <div className="p-col-8" style={{padding:'.5em'}}><label>{dialogDD}</label></div>
                    <div className="p-col-4" style={{padding:'.75em'}}><strong>Beneficiaries</strong></div>
                    <div className="p-col-8" style={{padding:'.5em'}}><label>{dialogBeneficiaries}</label></div>
                    <div className="p-col-4" style={{padding:'.75em'}}><strong>Suppliers</strong></div>
                    <div className="p-col-8" style={{padding:'.5em'}}><label>{dialogSuppliers}</label></div>
                  </div>
                }
              </Dialog>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
