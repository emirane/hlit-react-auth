import React, { Component } from 'react';
import './Registration.css';

class Registartion_ext extends Component {
    constructor(props) {
        super(props);
        //this.state = { value: this.props.data[0] };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
      }

    state = {
        isAdd: false,
        thems:[],
        labs:[],
        selectedOption: null,
    }

    async componentDidMount() {
        const response_theme = await fetch(`http://home-hlit.jinr.ru:8443/api/mysql/get_theme`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        const data_theme = await response_theme.json();
        this.setState({
          thems: data_theme
        })

        const response_lab = await fetch(`http://home-hlit.jinr.ru:8443/api/mysql/get_lab`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        const data_lab= await response_lab.json();
        this.setState({
          labs: data_lab
        })
        console.log(this.state.labs)
    }

    onChangeHandler(event) {
        this.setState({
          //organization: event.target.value,
          [event.target.name]: event.target.value
        });
        //console.log(this.state.value)
      }

    render() {
        return(
           
            <main className="main">
                {
                !this.state.isAdd ?
                <React.Fragment>
                <header><h1>Регистрационная форма</h1></header>
                <form className="reg-form-jinr" onSubmit={this.handleFormSubmit}>
                <div className="boxer">
                    <div className="box-row">
                        <div className="box1"><span id="zvezda">*</span>Ф.И.О.</div>
                        <div className="box2"><input name="name" size="45" type="text" onChange={this.onChangeHandler}/></div>
                    </div>

                    <div className="box-row">
                        <div className="box1"><span id="zvezda">*</span>Ф.И.О. латиницей</div>
                        <div className="box2"><input name="name_lat" size="45" type="text" onChange={this.onChangeHandler}/></div>
                    </div>

                    <div className="box-row">
                        <div className="box1"><span id="zvezda">*</span>Организация</div>
                        <div className="box2"><input name="organization" size="45" type="text" onChange={this.onChangeHandler}/></div>     
                    </div>

                    <div className="box-row">
                        <div className="box1"><span id="zvezda">*</span>Страна</div>
                        <div className="box2"><input name="country" size="45" type="text" onChange={this.onChangeHandler}/></div>
                    </div>

                    <div className="box-row">
                        <div className="box1"><span id="zvezda">*</span>Электронная почта</div>
                        <div className="box2"><input name="email" size="45" type="text" onChange={this.onChangeHandler}/></div>
                    </div>

                    <div className="box-row">
                        <div className="box1"><span id="zvezda">*</span>Номер телефона</div>
                        <div className="box2"><input name="tel" size="45" type="text" onChange={this.onChangeHandler}/></div>
                    </div>

                    <div className="box-row">
                        <div className="box1"><span id="zvezda">*</span>Логин (латиницей)</div>
                        <div className="box2"><input name="login" size="45" type="text" onChange={this.onChangeHandler}/></div>
                    </div>

                    <div className="box-row">
                        <div className="box1"><span id="zvezda">*</span>Название научной работы</div>
                        <div className="box2"><textarea cols="45" name="name_of_work" rows="2" onChange={this.onChangeHandler}></textarea></div>
                    </div>

                    <div className="box-row">
                        <div className="box1"><span id="zvezda">*</span>Краткое описание научной работы</div>
                        <div className="box2"><textarea cols="45" name="about_work" rows="10" onChange={this.onChangeHandler}></textarea></div>
                    </div>
                    <p>
                        <input type="submit" value="Отправить" className="reg-button"></input>
                        </p>
                </div>
                </form>
                </React.Fragment>
                :<Registartion2/> 
            } 
            </main>
            
        )
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    signup (name,name_lat,organization,tel,email,tema,tema_project,login, name_of_work, about_work, resurs, po, country) {
        return this.fetch(`http://home-hlit.jinr.ru:8443/api/mysql/AddUser`, {
            method: 'POST',
            body: JSON.stringify({
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
            //localStorage.setItem('currentUser', JSON.stringify(res));
            if (res.fieldCount===0){
            this.setState({
              isAdd: true
            })
            console.log(res.fieldCount)
        }
            //return Promise.resolve(res);
        })
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // /console.log
         this.signup(
            this.state.name,
            this.state.name_lat,
            this.state.organization,
            this.state.tel,
            this.state.email,
            this.state.tema,
            this.state.tema_project,
            this.state.login,
            this.state.name_of_work,
            this.state.about_work,
            this.state.resurs,
            this.state.po,
            this.state.country,
            )
    }
}

class Registartion2 extends Component {
    render() {
        return(
            <div>
                <h1>Поздравляем! Регистрация прошла успешно</h1>
                <br/>
                <a>Download PDF</a>
            </div>
        )
    }
}
export default Registartion_ext