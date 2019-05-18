import React, { Component } from 'react';
import ReactTable from 'react-table';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Formula extends Component {
    state = {
        data: [...this.props.data],
        addedColumns: []
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
        let columns = this.props.columns.map(e => ({...e, Cell: this.renderEditable}));
        return (
        <div>
            <ReactTable 
            data={this.state.data}
            columns={columns}
            />

            <NavLink to='/template'>Edit Quantity Survey Template</NavLink>
            <button>Submit</button>
        </div>);
    }
}

const mapStateToProps = ({ resource }) => {
    return {
        data: resource.selectedData,
        columns: resource.columns
    }
}

export default connect(mapStateToProps)(Formula);