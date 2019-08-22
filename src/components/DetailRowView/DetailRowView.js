import React,{Component} from 'react';
import jsPDF from 'jspdf';


class DetailRowView extends Component {
    state = {
        edit: null,
        data: [],
    }

    jsPdfGenerator = () => {

        // Example From https://parall.ax/products/jspdf
        var doc = new jsPDF('p', 'pt');
        
        doc.text(20, 40, this.props.row.name) 

        doc.setFont('courier')
        doc.setFontType('normal')
        doc.text(20, 80, this.props.row.login)

        doc.setFont('times')
        doc.setFontType('italic')
        doc.text(20, 180, this.props.row.organization)

        doc.setFont('helvetica')
        doc.setFontType('bold')
        doc.text(20, 280, this.props.row.email)

        doc.setFont('courier')
        doc.setFontType('bolditalic')
        doc.text(20, 380, 'Name of work:' + this.props.row.name_of_work)
        
        // Save the Data
        doc.save('Generated.pdf')
    }
    _showEditor(){
        this.setState({
            edit: {
                //row: parseInt(e.target.row, 10),
                //cell: e.target.cellIndex,
        }});
        //console.log(this.state.edit);
    }
    
    render() {
        return (
            <div>
                {
                    <div className="detailview-row">
                        <div className="button-block">
                            <button type="button" className="btn btn-primary" >Edit</button>
                            <button type="button" className="btn btn-primary" onClick={this.jsPdfGenerator}>Download PDF</button>
                            <button type="button" className="btn close" aria-label="Close" onClick={this.props.onClickClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <input value={this.props.row.name}/>
                        </form>
                        <table className="table detail">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Login</th>
                                <th>Organization</th>
                                <th>E-mail</th>
                                <th>Tema</th>
                                <th>about_work</th>
                                <th>name_of_work</th>
                                <th>tel</th>
                                <th>tema_project</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.props.row.name}</td>
                            <td>{this.props.row.login}</td>
                            <td>{this.props.row.organization}</td>
                            <td>{this.props.row.email}</td>
                            <td>{this.props.row.tema}</td>
                            <td>{this.props.row.about_work}</td>
                            <td>{this.props.row.name_of_work}</td>
                            <td>{this.props.row.tel}</td>
                            <td>{this.props.row.tema_project}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
        )
    }
}
export default DetailRowView;