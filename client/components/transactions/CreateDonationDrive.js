import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { httpPOST } from '../../utils/httpUtils'

export default class CreateDonationDrive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      something: '',
      something2: '',
      error: null
    }

    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onClickSubmit() {
    let data = {
      something: this.state.something,
      something2: this.state.something2
    }

    httpPOST('http://localhost:3000/private/link', data)
    .then(response => {
      // do something
    })
    .catch(error => {
      // catch errors
      let errorMsg = "";
      this.setState({error: errorMsg})
    });
  }

  render() {
    return (
      <div className="p-grid p-fluid p-justify-center">
        <Helmet>
          <title>Create Donation Drive</title>
          <meta name="description" content="Create Donation Drive" />
        </Helmet>
        <div className="p-col-12">
          <div className="card card-w-title">
            <h1>Create New Donation Drive</h1>
            <div className="p-col-4" style={{marginTop:'8px'}}>
              <label htmlFor="somethingInput">Something</label>
              <InputText id="somethingInput" value={this.state.something} onChange={e => this.setState({something: e.target.value})} />
            </div>
            <div className="p-col-4" style={{marginTop:'8px'}}>
              <label htmlFor="something2Input">Something 2</label>
              <InputText id="something2Input" value={this.state.something2} onChange={e => this.setState({something2: e.target.value})} />
            </div>
            {
              this.state.error && <div className="p-col-10">
                <small style={{color:'red'}}>{this.state.error}</small>
              </div>
            }
            <div className="p-col-1">
              <Button label="Submit" icon="pi pi-user-plus" onClick={this.onClickSubmit}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
