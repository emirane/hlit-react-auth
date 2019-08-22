import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './components/AuthService/AuthService';
import withAuth from './components/withAuth/withAuth';
import Loader from './components/Loader/Loader';
import Table from './components/Table/Table';
import DetailRowView from './components/DetailRowView/DetailRowView';
import _ from 'lodash'; 
import ReactPaginate from 'react-paginate'; 
import TableSearch from './components/TableSearch/TableSearch';

const Auth = new AuthService();

class App extends Component {

  state ={
    isLoading: true,
    data: [],
    sort: 'asc',  // 'desc'
    fullrow: false,
    sortField: 'Name', // поле по умолчанию
    search: '',
    currentPage:0,
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

  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(cloneData, sortField, sortType);
    //console.log(sortType);
    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    })
  }

  onRowSelect = row => {
    //const close_type1 = this.state.isClose === true ? false : false;
    this.setState({
      row,
      //fullrow: !this.state.fullrow,
      isClose: false,
    })
  }

  onClickClose = () => {
    const close_type2= this.state.isClose === false ? true : false;
    this.setState({
          isClose:!this.state.isClose,
      })
    this.props.history.replace('/login');
    console.log(close_type2);
  }

  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )

  searchHandler = search =>(
    this.setState({search, currentPage: 0})
  )

  getFilteredData(){
      const {data, search} = this.state

      if (!search) {
        return data
      }

      return data.filter(item => {
        return item['name'].toLowerCase().includes(search.toLowerCase())
          || item['login'].toLowerCase().includes(search.toLowerCase())
          || item['organization'].toLowerCase().includes(search.toLowerCase())
      })
  }
  

    render () {
      const pageSize = 2;
      const filteredData = this.getFilteredData(); 
      const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
      const pageCount = Math.ceil(filteredData.length / pageSize);
      console.log(this.state.isClose); 
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
            
           {
                this.state.isLoading 
                ? <Loader />
                :<React.Fragment>
                  <TableSearch onSearch={this.searchHandler}/> 
                  <Table 
                    data={displayData}
                    onSort={this.onSort}
                    sort={this.state.sort}
                    sortField={this.state.sortField}
                    onRowSelect={this.onRowSelect}
                    row={this.state.row}
                    //fullrow={this.state.fullrow}
                  />
                  {
                      this.state.row && !this.state.isClose ? 
                      <DetailRowView 
                        row={this.state.row} 
                        fullrow={this.state.fullrow} 
                        onClickClose={this.onClickClose} 
                        isClose={this.state.isClose}/> 
                      : null
                  }
                </React.Fragment>               
          }
          {
            this.state.data.length > pageSize
            ?
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.pageChangeHandler}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                forcePage={this.state.currentPage}
            />
            :null
          }
          </div>
        )
      }
        handleLogout(){
          Auth.logout()
          this.props.history.replace('/login');
      }
    }
export default App;
