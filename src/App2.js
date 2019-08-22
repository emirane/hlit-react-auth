import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import DetailRowView2 from './components/DetailRowView/DetailRowView2';
import Loader from './components/Loader/Loader';
import AuthService from './components/AuthService/AuthService';
import './App.css';
import Button from 'react-bootstrap/Button';


const Auth = new AuthService();

class App2 extends Component {
    constructor() {
        super()
        this.domain = `http://home-hlit.jinr.ru:8443/api/mysql`;
    }
    state = {
        data:[],
        isClose: true,
        isLoading: true,
        updateStatus: true,
    }

    async componentDidMount() {
        const response = await fetch(`${this.domain}/get`, {
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

    // Функция для формирования запроса к API и прием ответа 
    fetch(url, token, options) { 
        const headers = {
            Authorization: 'secret ' + token,
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

    // Функция для обновления статуса в БД
    updateStatus (id, is_ok) {
        const token = localStorage.getItem('id_token');
        return this.fetch(`${this.domain}/EditUser_status`, token, {
         method: 'POST',
         body: JSON.stringify({
             id,
             is_ok,
         })
         }).then(res => {          
             if(res.affectedRows===1) {
                 this.setState({
                    updateStatus: !this.state.updateStatus
                 })
                //window.location.reload(); 
             } // Проверить статус ответа и вывести сообщение а-ля "Успешно"
         })
    }

    onRowClick = (row, rowIdx) => {
        //console.log("Clok on row: "+ JSON.stringify(row))
        this.setState({
            row,
            isClose: false,
        })
    }

    afterUpdate = (value) => {
        this.setState({
            value
        })
    }

    onClickClose = () => {
        this.setState({
              isClose:!this.state.isClose,
          })
    }
    
    _validateFunction = (row) => {
        if(row.is_ok === 1) {
            this.updateStatus(
                row.id,
                0,
            );
            row.is_ok = 0;
        }
        else { 
            this.updateStatus(
                row.id,
                1,
            )
            row.is_ok = 1;
        }    
    	//console.log("activity row :"+ "Обновил");
    }
    
    buttonFunction(cell, row) {   
     	return <label>
            <button type="button" 
                onClick={() => {this._validateFunction(row)}} 
                className="bbtn btn-primary btn-sm">
                    { row.is_ok ===1 ? "Отменить" : 'Подтвердить'}
            </button>
            </label>        
    }

    buttonExpandRow (cell, row) {   
        return <label>
           <button type="button" 
               onClick={() => {this.onRowClick(row)}} 
               className="bbtn btn-primary btn-sm">
                   (+)
           </button>
           </label>        
   }

    isOkFunction(cell, row) {   
        return <label>
               <p> 
                    { row.is_ok === 1 ? "Подтверждена" : 'В обработке'}
               </p>
               </label>        
   }

    render() {
        const options = {
            //onRowClick: this.onRowClick,
            sizePerPage: 5,
            sortIndicator: true
          };
        return(
            <div className="App">
                <div>
                    <p className="App-intro">
                        <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
                    </p>
                    <p className="user-name">
                        Hi, {localStorage.getItem('current_user')}!
                    </p>
                </div>
            <div>
                {
                    this.state.isLoading 
                    ?<Loader/>
                    :<React.Fragment>
                    <BootstrapTable data={this.state.data} striped hover  options={ options } search pagination bordered={ false } >
                        <TableHeaderColumn dataField="button" dataFormat={this.buttonExpandRow.bind(this)}></TableHeaderColumn>
                        <TableHeaderColumn isKey dataField='name' dataSort={ true }>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='login' dataSort={ true }>Login</TableHeaderColumn>
                        <TableHeaderColumn dataField='email'>E-mail</TableHeaderColumn>
                        <TableHeaderColumn dataField='is_ok' dataFormat={this.isOkFunction.bind(this)}>Status</TableHeaderColumn>
                        <TableHeaderColumn dataField="button" dataFormat={this.buttonFunction.bind(this)}></TableHeaderColumn>
                    </BootstrapTable>
                    
                    <div>
                    {
                        this.state.row && !this.state.isClose ? 
                        <DetailRowView2
                        domain={this.domain}
                        row={this.state.row}
                        afterUpdate={this.afterUpdate}
                        onClickClose={this.onClickClose}
                        />
                        :null
                    }
                    </div>
                    </React.Fragment>
                }
            </div>
        </div>
        )
    }

    handleLogout(){
        Auth.logout()
        this.props.history.replace('/login');
    }
}
export default App2