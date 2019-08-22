import React, {Component} from 'react';
import DetailRowView from '../DetailRowView/DetailRowView';

class Table extends Component {
    state = {
        clickrow: true,
    }
    render() {
        return (
            <div>
    <table className="table">
        <thead>
            <tr>
                <th onClick={this.props.onSort.bind(null, 'name')} >Name</th>
                <th onClick={this.props.onSort.bind(null, 'login')} >Login</th>
                <th onClick={this.props.onSort.bind(null, 'organization')} >Organization</th>
                <th onClick={this.props.onSort.bind(null, 'email')}> E-mail</th>
                <th onClick={this.props.onSort.bind(null, 'tema')} >Tema</th>
            </tr>
        </thead>
        <tbody>
            { this.props.data.map(item =>(
                <tr key={item.id} onClick={this.props.onRowSelect.bind(null, item)} >
                    <td>{item.name}</td>
                    <td>{item.login}</td>
                    <td>{item.organization}</td>
                    <td>{item.email}</td>
                    <td>{item.tema}</td>
                </tr>
            ))}
        </tbody>
    </table>
    
    </div>  
        )
    }
}
export default Table