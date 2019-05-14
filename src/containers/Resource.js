import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { setResource, addRow, addColumn } from "../redux/actions/actionCreators";
import CsvFileInput from '../components/CsvFileInput/CsvFileInput';

class Resource extends Component {

    state = {
        search: ''
    }

    renderEditable = (cellInfo) => {
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.props.resource];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.props.setResource(data);
            }}
            dangerouslySetInnerHTML={{
              __html: this.props.resource[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
    }

    render() {


        let columns = this.props.columns.map((e) => ({...e, Cell: this.renderEditable}));
        let data = this.props.resource;
        if(this.state.search) {
            data = data.filter(row => {
                //console.log(row);
                //console.log(columns);
                let flag = columns.some(e => {
                    let content = row[e['accessor']];
                    //console.log(content);
                    return content.toString().includes(this.state.search);
                });
                return flag;
            })
            console.log(data);
        }
        return (<div>
            <CsvFileInput />
            <button onClick={this.props.addRow}>Add Row</button>
            <button onClick={this.props.addColumn}>Add Column</button>
            Search: <input value={this.state.search} 
            onChange={e => this.setState({search: e.target.value})}
            placeholder='search'/>
        {data && columns ? 
        <ReactTable 
        data={data} 
        columns={columns}
        />: null} 
        </div>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setResource: (data) => dispatch(setResource(data)),
        addRow: () => dispatch(addRow()),
        addColumn: (name) => dispatch(addColumn(name))
    }
}

const mapStateToProps = state => {
    return {resource: state.resource.data, columns: state.resource.columns};
}

export default connect(mapStateToProps, mapDispatchToProps)(Resource);