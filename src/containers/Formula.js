import React, { Component } from 'react';
import ReactTable from 'react-table';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { postData } from '../redux/actions/actionCreators';

class Formula extends Component {
    state = {
        data: [...this.props.data],
        addedColumns: []
    }

    handleSubmit = (data, col, project) => {
        this.props.postData(data, col, project);
    }

    renderEditable = (cellInfo) => {
        console.log(cellInfo);
        console.log(this.state.data);
        return (
          <div
            // style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.data];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.data[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }

    render() {
        console.log(this.state.data);
        let columns = this.props.columns.concat(this.props.extraColumns).map(e => ({...e, Cell: this.renderEditable}));
        return (
        <div className="table-container">
            <div className='table-header'>
                <div className='spacer'>Quantity Survey</div>
            </div>
            <ReactTable 
            data={this.state.data}
            columns={columns}
            defaultPageSize={10}
            />

            <NavLink to='/template'>Edit Quantity Survey Template</NavLink>
            <button style={{float: 'right'}}
            onClick={() => this.handleSubmit(this.state.data, this.props.extraColumns, 1)}>Submit</button>
        </div>);
    }
}

const mapStateToProps = ({ resource }) => {
    return {
        data: resource.selectedData,
        columns: resource.columns,
        extraColumns: resource.extraColumns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postData: (data, extraColumns, projectId) => dispatch(postData(data, extraColumns, projectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Formula);