import React, { Component } from 'react';
import './Registration.css';
import { BrowserRouter, Link } from 'react-router-dom';

class Registartion extends Component {
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
        changeLang:false 
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

      onChangeLanguage = () => {
        this.setState({
            changeLang: !this.state.changeLang,
          });
          //console.log(this.state.changeLang)
      }


    render() {
        return(
            
           
            <main className="main">
                {     
                !this.state.isAdd ?
                !this.state.changeLang ?
                    <React.Fragment>
                    <Link to="/registration_ext">Для сотрдурников других организаций</Link>
                    <header>
                        <h1>Регистрация пользователя</h1>
                        <a onClick={this.onChangeLanguage}>
                        <span>English version <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAflJREFUeNpinDRzn5qN3uFDt16+YWBg+Pv339+KGN0rbVP+//2rW5tf0Hfy/2+mr99+yKpyOl3Ydt8njEWIn8f9zj639NC7j78eP//8739GVUUhNUNuhl8//ysKeZrJ/v7z10Zb2PTQTIY1XZO2Xmfad+f7XgkXxuUrVB6cjPVXef78JyMjA8PFuwyX7gAZj97+T2e9o3d4BWNp84K1NzubTjAB3fH0+fv6N3qP/ir9bW6ozNQCijB8/8zw/TuQ7r4/ndvN5mZgkpPXiis3Pv34+ZPh5t23//79Rwehof/9/NDEgMrOXHvJcrllgpoRN8PFOwy/fzP8+gUlgZI/f/5xcPj/69e/37//AUX+/mXRkN555gsOG2xt/5hZQMwF4r9///75++f3nz8nr75gSms82jfvQnT6zqvXPjC8e/srJQHo9P9fvwNtAHmG4f8zZ6dDc3bIyM2LTNlsbtfM9OPHH3FhtqUz3eXX9H+cOy9ZMB2o6t/Pn0DHMPz/b+2wXGTvPlPGFxdcD+mZyjP8+8MUE6sa7a/xo6Pykn1s4zdzIZ6///8zMGpKM2pKAB0jqy4UE7/msKat6Jw5mafrsxNtWZ6/fjvNLW29qv25pQd///n+5+/fxDDVbcc//P/zx/36m5Ub9zL8+7t66yEROcHK7q5bldMBAgwADcRBCuVLfoEAAAAASUVORK5CYII=" title="English" alt="English"/></span>
                        </a>
                    </header>
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
                            <div className="box1"><span id="zvezda">*</span>Лаборатория</div>
                            <div className="box2">
                                <select name="organization" defaultValue={'DEFAULT'} onChange={this.onChangeHandler}>
                                <option disabled="disabled" value="DEFAULT">Выберите лабораторию</option>
                                    { this.state.labs.map(item => (
                                        <option key={item.lab_name} value={item.lab_name}>
                                        { item.lab_name }
                                        </option>
                                    )) }
                                </select>
                            </div>
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
                            <div className="box1"><span id="zvezda">*</span>Тема</div>
                            <div className="box2">
                        <p><select name="tema"  defaultValue={'DEFAULT'} onChange={this.onChangeHandler}>
                            <option disabled="disabled" value="DEFAULT">Выберите тему из списка</option>
                                { this.state.thems.map(item => (
                                        <option key={item.theme_id} value={item.theme_id}>
                                        { item.theme_id }
                                        </option>
                                ))}
                            </select>
                            <br/>
                            <span >Вы можете найти полные названия тем, перейдя по этой <a href="http://www.jinr.ru/wp-content/uploads/JINR_Docs/JINR_Topical_Plan_2018_(rus).pdf" target="_blank" rel="noopener">ссылке</a></span>
                        </p>
                        </div>
                        </div>

                        <div className="box-row">
                            <div className="box1"><span id="zvezda">*</span>Проект из темы</div>
                            <div className="box2"><input name="tema_project" size="45" type="text" onChange={this.onChangeHandler}/></div>
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
                    :<React.Fragment>
                        <header>
                        <Link to="/registration_ext">For users from other organizations </Link>
                            <h1>Registration Form</h1>
                            <a onClick={this.onChangeLanguage}>
                                <span>Русская верия <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE2SURBVHjaYvz69T8DAvz79w9CQVj/0MCffwwAAcQClObiAin6/x+okxHMgPCAbOb//5n+I4EXL74ABBALxGSwagTjPzbAyMgItAQggBg9Pf9nZPx//x7kjL9////9C2QAyf9//qCQQCQkxFhY+BEggFi2b/+nq8v46BEDSPQ3w+8//3//BqFfv9BJeXmQEwACCOSkP38YgHy4Bog0RN0vIOMXVOTPH6Cv/gEEEEgDxFKgHEgDXCmGDUAE1AAQQCybGZg1f/d8//XsH0jTn3+///z79RtE/v4NZfz68xfI/vOX+4/0ZoZFAAHE4gYMvD+3/v2+h91wCANo9Z+/jH9VxBkYAAKIBRg9TL//MEhKAuWAogxgZzGC2CCfgUggAoYdGAEVAwQQ41egu5AQAyoXTQoIAAIMAD+JZR7YOGEWAAAAAElFTkSuQmCC" title="Русский" alt="Русский"/></span>
                            </a>
                        </header>
                        <form className="reg-form-jinr" onSubmit={this.handleFormSubmit}>
                        <div className="boxer">
                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>Full name</div>
                                <div className="box2"><input name="name" size="45" type="text" onChange={this.onChangeHandler}/></div>
                            </div>

                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>Laboratory</div>
                                <div className="box2">
                                    <select name="organization"  onChange={this.onChangeHandler}>
                                    <option disabled="disabled" selected="selected">Select laboratory</option>
                                        { this.state.labs.map(item => (
                                            <option key={item.lab_name} value={item.lab_name}>
                                            { item.lab_name }
                                            </option>
                                        )) }
                                    </select>
                                </div>
                            </div>

                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>Country</div>
                                <div className="box2"><input name="country" size="45" type="text" onChange={this.onChangeHandler}/></div>
                            </div>

                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>E-mail address</div>
                                <div className="box2"><input name="email" size="45" type="text" onChange={this.onChangeHandler}/></div>
                            </div>

                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>Phone number</div>
                                <div className="box2"><input name="tel" size="45" type="text" onChange={this.onChangeHandler}/></div>
                            </div>

                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>Funding source</div>
                                <div className="box2">
                            <p><select name="tema" onChange={this.onChangeHandler}>
                                <option disabled="disabled" selected="selected">Select funding source</option>
                                    { this.state.thems.map(item => (
                                            <option key={item.theme_id} value={item.theme_id}>
                                            { item.theme_id }
                                            </option>
                                    ))}
                                </select>
                                <br/>
                                <span >You can find the Full names list of Funding source <a href="http://www.jinr.ru/wp-content/uploads/JINR_Docs/JINR_Topical_Plan_2018_(rus).pdf" target="_blank" rel="noopener">here</a></span>
                            </p>
                            </div>
                            </div>

                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>Project from the funding source</div>
                                <div className="box2"><input name="tema_project" size="45" type="text" onChange={this.onChangeHandler}/></div>
                            </div>

                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>Login (latin)</div>
                                <div className="box2"><input name="login" size="45" type="text" onChange={this.onChangeHandler}/></div>
                            </div>

                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>Name of the scientific project</div>
                                <div className="box2"><textarea cols="45" name="name_of_work" rows="2" onChange={this.onChangeHandler}></textarea></div>
                            </div>

                            <div className="box-row">
                                <div className="box1"><span id="zvezda">*</span>Summary of the scientific project</div>
                                <div className="box2"><textarea cols="45" name="about_work" rows="10" onChange={this.onChangeHandler}></textarea></div>
                            </div>
                            <p>
                                <input type="submit" value="Send" className="reg-button"></input>
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
            if (res.fieldCount==0){
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
export default Registartion