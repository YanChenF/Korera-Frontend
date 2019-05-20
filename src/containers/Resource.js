import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { setResource, addRow, addColumn } from "../redux/actions/actionCreators";
import CsvFileInput from '../components/CsvFileInput/CsvFileInput';
// import SelectableTable from '../components/SelectableTable/SelectableTable';
import Spinner from '../components/Spinner/Spinner';
import "./Resource.css";

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


        let columns = this.props.columns.concat(this.props.extraColumns);
        // map((e) => ({...e, Cell: this.renderEditable}));
        let data = this.props.resource;
        if(this.state.search) {
            data = data.filter(row => {
                // console.log(row);
                // console.log(columns);
                let flag = columns.some(e => {
                    let content = row[e['accessor']];
                    // console.log(content);
                    if(!content) content = '';
                    let includes = content.toString().toLowerCase().includes(this.state.search);
                    // console.log(includes);
                    return includes;
                });
                // console.log(flag);
                return flag;
            })
            // console.log(data);
        }

        let table = <ReactTable 
        data={data} 
        columns={columns}
        defaultPageSize={10}
        // getTdProps={(state, rowInfo) => {
        //     if (rowInfo && rowInfo.row) {
        //       return {
        //         onClick: (e) => {
        //         //   this.setState({
        //         //     selected: rowInfo.index
        //         //   })
        //         console.log(rowInfo);
        //         }
        //         // },
        //         // style: {
        //         //   background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
        //         //   color: rowInfo.index === this.state.selected ? 'white' : 'black'
        //         // }
        //       }
        //     }else{
        //       return {}
        //     }
        //   }
        // }
        />
        if(this.props.loading) {
            table = <Spinner />
        }
        // <span><i className="fas fa-search"></i></span>
        return (
        <div className="table-container">
            <div className='table-header'>
                <div className='search-bar'><input value={this.state.search} 
                onChange={e => this.setState({search: e.target.value})}
                placeholder='Keyword'/></div>
                <div className='spacer'>Resource Catelog</div>
                <button><span><i className='fas fa-plus'></i></span></button>
            </div>
            <CsvFileInput />
            <button onClick={this.props.addRow}>Add Row</button>
            <button onClick={this.props.addColumn}>Add Column</button>
            {table}


            {/* <SelectableTable data={data}
            columns={columns}/> */}
        </div>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setResource: (resource) => dispatch(setResource(resource)),
        addRow: () => dispatch(addRow()),
        addColumn: (name) => dispatch(addColumn(name))
    }
}

const mapStateToProps = state => {
    return {resource: state.resource.data, columns: state.resource.columns,
    extraColumns: state.resource.extraColumns, loading: state.resource.isLoading};
}

export default connect(mapStateToProps, mapDispatchToProps)(Resource);