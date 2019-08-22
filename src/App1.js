import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DetailRowView1 from './components/DetailRowView/DetailRowView1';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
//import cellEditFactory from 'react-bootstrap-table2-editor';
//import DetailRowView from './DetailRowView';
//import Registartion from './Registartion';

class App1 extends Component {
  state = {
    changer: false,
    rowIdxChange:null,
    upd_data:[],
    data: [],
    isUpdate: false,
    columns: [{
      dataField: 'name',
      text: 'Name',
      sort:true,
      filter: textFilter()
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
    isClose: true,
  }
  
  async componentDidMount() {
    const response = await fetch(`http://home-hlit.jinr.ru:8443/api/mysql/get`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('id_token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const data = await response.json();
    console.log(data);
    this.setState({
      isLoading: false,
      data: data
    })
  }

  fetch(url, options) { 
    const headers = {
          'Accept':'application/json',
          'Content-Type':'application/json',
    }
    return fetch(url, {
        headers,
        ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  rowEventMy = (row_new,rowIndex) => {
      this.setState({
        row_new,
        rowIndex,
        isClose: false,
      })
    console.log(this.state.row_new)
  }

  onClickClose = () => {
        this.setState({
          isClose:!this.state.isClose,
        })
        window.location.reload();
  }

  handleSearch = value => {
    this.setState({
      value,
      changer: true,
      isClose: false,
    }); 
    
  }

  render() {
    const rowEvents = {
      onClick: (e,row,rowIndex) => {
        const row_my = this.state.data[rowIndex];
        this.rowEventMy(row_my, rowIndex);
      }
    };
    const { SearchBar } = Search;
   //console.log(this.state.update_from);
    return (
       <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable 
        striped
        hover
        keyField='id'
        search = { true } 
        data={ this.state.data } 
        columns={ this.state.columns } 
        filter={ filterFactory() }
        pagination={ paginationFactory() }
        rowEvents={ rowEvents }
        />
        {
            this.state.row_new && !this.state.isClose ?          
            <DetailRowView1
              row_new={this.state.row_new} 
              onClickClose={this.onClickClose} 
              isClose={this.state.isClose}
              onHandleSearch={this.handleSearch}
              changer ={ this.state.changer}
              onUpdateData={this.onUpdateData}
              /> 
            : null
        }
      </div>
    );
  }
}

export default App1;