import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';


class DetailRowView1 extends Component {
 
    state = {
      data: [this.props.row_new],
      value_new: "CHANGE NEW!",
      update:true,
      theme:[],
      lab:[],
      jobTypes:'A',
      products: [
        {
          id: 1,
          name: 'TV',
          'price': 1000
        },
        {
          id: 2,
          name: 'Mobile',
          'price': 500
        },
        {
          id: 3,
          name: 'Book',
          'price': 20
        },
      ],
        columns: [{
            dataField: 'name',
            text: 'Name',
            sort:true,
          },
          {
            dataField: 'login',
            text: 'Login',
            sort:true
          }, {
            dataField: 'email',
            text: 'E-mail',
            sort: true
          },
          {
            dataField: 'tema',
            text: 'Tema',
            sort: true
          },
          {
            dataField: 'organization',
            text: 'Organization',
            sort: true,
          }],      
    }

    async componentDidMount() {
      const response = await fetch(`http://home-hlit.jinr.ru:8443/api/mysql/get_theme`, {
        method: 'POST',
        headers: {
          //Authorization: 'Bearer '+localStorage.getItem('id_token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      const data = await response.json();
      console.log(data);

      const response_org = await fetch(`http://home-hlit.jinr.ru:8443/api/mysql/get_lab`, {
        method: 'POST',
        headers: {
          //Authorization: 'Bearer '+localStorage.getItem('id_token'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      const data_org = await response_org.json();
      console.log(data_org);
      this.setState({
        lab:data_org,
      })
    }

    onSave= () => {
    //  this.props.row_new
        //console.log("Save value");
    }

    handleSearch = () => {  
       this.props.onHandleSearch(this.state.data[0]);
    }

    fetch(url,token, options) {
      // performs api calls sending the required authentication headers
      const headers = {
          Authorization: 'secret ' + token,
          'Content-Type': 'application/json'
      }
      return fetch(url, {
          headers,
          ...options
      })
          .then(this._checkStatus)
          .then(response => response.json())
  }
    
    updateParams (id, name,name_lat, organization, tel, email,tema,tema_project, login, name_of_work, about_work,resurs,po,country, flag) {
          const token = localStorage.getItem('id_token');
          return this.fetch(`http://home-hlit.jinr.ru:8443/api/mysql/EditUser2`, token, {
            method: 'POST',
            body: JSON.stringify({
                id,
                name,
                name_lat,
                organization,
                tel,
                email,
                tema,
                tema_project,
                login,
                name_of_work,
                about_work,
                resurs,
                po,
                country,
            })
        }).then(res => {          
            //console.log(res);
        })
    }

    render() {
      //console.log(this.state.data[0].name);
      const cellEdit = cellEditFactory({
        mode: 'click',
        afterSaveCell: (oldValue, newValue, row, column) => {this.updateParams(
          row.id,
          row.name,
          row.name_lat,
          row.organization,
          row.tel,
          row.email,
          row.tema,
          row.tema_project,
          row.login,
          row.name_of_work,
          row.about_work,
          row.resurs,
          row.po,
          row.country,
        )},
      })
      const onTableChange = (type, newState) => {
        console.log(type, newState)
      }
      
     // console.log(this.state.data)
            return (
                <div className="container" style={{ marginTop: 50 }}>
                   <div className="button-block">
                            <button type="button" className="btn btn-primary" >Edit</button>
                            <button type="button" className="btn btn-primary" onClick={this.jsPdfGenerator}>Download PDF</button>
                            <button type="button" className="btn close" aria-label="Close" onClick={this.props.onClickClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                   
                  <BootstrapTable 
                    striped
                    hover
                    keyField='id' 
                    trClassName="table detail"
                    data={ this.state.data} 
                    columns={ this.state.columns } 
                    cellEdit={ cellEdit }
                    onTableChange={ onTableChange }
                  />
                </div>
              );
    }
}
export default DetailRowView1;