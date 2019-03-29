import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { httpGET } from '../../utils/httpUtils'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";



export default class CharitableOrganisation extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      visible: false,
      beneficiary: null
    };

    this.onClick = this.onClick.bind(this);
    this.onHide = this.onHide.bind(this);

  }

  onClick(event) {
    this.setState({ visible: true });
  }

  onHide(event) {
    this.setState({ visible: false });
  }

  selectUser(rowData) {
    this.onClick();
    this.setState({ beneficiary: rowData })
    console.log(rowData);

  }


  componentDidMount() {
    let url = 'http://localhost:3000/api/private/CharitableOrganisation';
    httpGET(url)
      .then(response => {
         console.log(JSON.stringify(response, null, 2));
        let co = response.data;
        let dataToRender = [];

        for (let charitable of co) {
          let beneficiaryString = "";
          let supplierString = "fddsfd";

          for (let beneficiary of charitable.beneficiaries)
            beneficiaryString += beneficiary.substring(40) + ", ";
          for (let suppliers of charitable.suppliers)
            supplierString += suppliers.substring(40) + ", ";

          dataToRender.push({
            uen: charitable.uen,
            beneficiaries: beneficiaryString,
            suppliers: supplierString,
          })
        }
        this.setState({ data: dataToRender });
        console.log(this.state.data);
      })
  }


  /*  componentWillMount () {
      let url = 'http://localhost:3000/api/private/CharitableOrganisation';
      httpGET(url)
      .then(response => {
       // console.log(JSON.stringify(response, null, 2));
        let co = response.data;
        let dataToRender = [];
  
        for (let charitable of co) {
          let beneficiaryString = "";
          let supplierString = "";
  
          for (let beneficiary of charitable.beneficiaries)
            beneficiaryString += beneficiary.substring(40) + ", ";
          for (let suppliers of charitable.suppliers)
            supplierString += suppliers.substring(40) + ", ";
  
          dataToRender.push({
            uen: charitable.uen,
            beneficiaries: beneficiaryString,
            suppliers: supplierString,
          })
        }
        this.setState({data: dataToRender});
       
      })
    } */
  actionTemplate(rowData, column) {
    console.log('column', column);
    console.log('rowData', rowData);
    return (<div>
      <Button label="View"
        type="button" icon="fa-search"
        className="ui-button-success" onClick={() => this.selectUser(rowData.beneficiaries)}

      />
    </div>);
  }



  render() {
    return (
      <div>
        <DataTable value={this.state.data}>
          <Column field="uen" header="UEN" />
          <Column field="beneficiaries" header="Beneficiaries" />
          <Column field="suppliers" header="Suppliers" />
          <Column body={this.actionTemplate.bind(this)} header="Actions" style={{ textAlign: 'center', width: '6em' }} />
        </DataTable>

        <Dialog header="Godfather I" visible={this.state.visible} style={{ width: '50vw' }} onHide={this.onHide} maximizable>
          {this.state.beneficiary}
        </Dialog>
      </div>


    );
  }
}