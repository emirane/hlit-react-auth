import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../App.css';
import 'jspdf-autotable';
import './DetailViewRow.css';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class DetailRowView2 extends Component {

    state = {
        products: [this.props.row],
        labs:[],
        thems:[],
        domain: this.props.domain,
    }

    // Загружаем данные с API 
    async componentDidMount() {
        const response_theme = await fetch(`${this.state.domain}/get_theme`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        const data_theme = await response_theme.json();
        this.setState({
          thems: data_theme
        })

        const response_lab = await fetch(`${this.state.domain}/get_lab`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        const data_lab= await response_lab.json();
        this.setState({
          labs: data_lab
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

    // Функция, которая сработает после сохранения значения в редактируемой ячейке
    afterSaveCell = (row, cellName, cellValue) => {
        this.updateParams(
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
        )
        //this.props.afterUpdate(JSON.stringify(row))
    }

    // Функция для обновления данных в БД (передаем в afterSaveCell)
     updateParams (id, name,name_lat, organization, tel, email,tema,tema_project, login, name_of_work, about_work,resurs,po,country) {
       const token = localStorage.getItem('id_token');
       return this.fetch(`${this.state.domain}/EditUser2`, token, {
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
            console.log(res); // Проверить статус ответа и вывести сообщение а-ля "Успешно"
        })
    }
    
      jsPdfGenerator = () => {
        var dd = {
            content: [
                    {
                        columns: [
                        {
                            image:'data:image/png;base64,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',
                            width: 175,
                        },
                          {
                            stack: [
                              // second column consists of paragraphs
                              {
                                  text: 'Регистрационная форма HYBRILIT',
                                  margin:[20,10]
                              },
                            ],
                            fontSize: 18
                          }
                        ]
                    },
                    {
                    style: 'tableExample',
                    table: {
                        widths: [180, 300],
                        heights: 25,
                        body: [
                            ['ФИО / FIO', this.props.row.name],     
                            ['Лаборатория / Laboratory', this.props.row.organization],
                            ['Страна / Country', this.props.row.country],
                            ['E-mail', this.props.row.email],
                            ['Номер телефона / Phone number', this.props.row.tel],
                            ['Тема / Funding source', this.props.row.tema],
                            ['Логин (латиницей) / Login (latin)', this.props.row.login],
                            ['Название научной работы / Name of the scientific project', this.props.row.name_of_work],
                            ['Краткое описание научной работы / Summary of the scientific project' , this.props.row.about_work],
                            ['Виды ресурсов / Resource categories', this.props.row.resurs],
                            ['Список ПО / Software packages', this.props.row.po],
                        ]
                    }
                }
            ],
            styles: {
                tableExample: {
                    margin: [0, 5, 0, 15]
                }
            }   
        }
        pdfMake.createPdf(dd).download();
        
    }

    render() {
        console.log(this.state.domain);
        const cellEdit = {
            mode: 'click', // click cell to edit
            blurToSave: true,
            afterSaveCell: (row, cellName, cellValue) => {
                this.updateParams(
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
                )
                this.props.afterUpdate(JSON.stringify(row))
            }
          };
          const _labs = this.state.labs;
          const lab_name = [];
          for (var i=0; i<_labs.length; i++) {
              lab_name[i] =_labs[i].lab_name;
          }

          const _thems = this.state.thems;
          const thema_name = [];
          for (var i=0; i<_thems.length; i++) {
            thema_name[i] =_thems[i].theme_id;
            //console.log(thema_name[i]);
          }
        return (
            <div className="detailview-row" > 
                <div className="container-detail">
                    <div className="button-block">
                        <button type="button" className="btn btn-primary" >EMAIL PM</button>
                        <button type="button" className="btn btn-primary" >Создать в IPA</button>
                        <button type="button" className="btn btn-primary" onClick={this.jsPdfGenerator}>Download PDF</button>
                        <button type="button" className="btn close" aria-label="Close" onClick={this.props.onClickClose}>
                           <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <BootstrapTable data={this.state.products} cellEdit={ cellEdit } bordered={ false } >
                        <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='login' dataSort={ true } >Login</TableHeaderColumn>
                        <TableHeaderColumn dataField='email'>E-mail</TableHeaderColumn>
                        <TableHeaderColumn dataField='tel'>Telephone</TableHeaderColumn>
                        <TableHeaderColumn dataField='organization' editable={ { type: 'select', options: { values: lab_name }}}>Organization</TableHeaderColumn>
                        <TableHeaderColumn dataField='name_of_work'>Name of work</TableHeaderColumn>
                        <TableHeaderColumn dataField='about_work' editable={ { type: 'textarea' }}>About work</TableHeaderColumn>          
                        <TableHeaderColumn dataField='tema' editable={ { type: 'select', options: { values: thema_name }}}>Thema</TableHeaderColumn>
                        <TableHeaderColumn dataField='tema_project'>Thema project</TableHeaderColumn>
                        <TableHeaderColumn dataField='resurs'>Resurs</TableHeaderColumn>
                        <TableHeaderColumn dataField='country'>Country</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
}
export default DetailRowView2