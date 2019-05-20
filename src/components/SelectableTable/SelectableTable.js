import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

// import selectTableHOC from "react-table/lib/hoc/selectTable";

// const SelectTable = selectTableHOC(ReactTable);

// async function getData() {
//   const result = await (await fetch("/au_500_tree.json")).json();
//   // we are adding a unique ID to the data for tracking the selected records
//   return result.map(item => {
//     const _id = shortid.generate();
//     return {
//       _id,
//       ...item
//     };
//   });
// }

// function getColumns(data) {
//   const columns = [];
//   const sample = data[0];
//   for (let key in sample) {
//     if (key === "_id") continue;
//     columns.push({
//       accessor: key,
//       Header: key
//     });
//   }
//   return columns;
// }

export class SelectTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: this.props.selection? [...this.props.selection]: [],
      selectAll: false,
    };
  }
  // componentDidMount() {
  //   getData().then(data => {
  //     const columns = getColumns(data);
  //     this.setState({ data, columns });
  //   });
  // }
  toggleSelection = (key, shift, row) => {
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
  
      let selection = [...this.state.selection];
      const keyIndex = selection.indexOf(key);
      // check to see if the key exists
      if (keyIndex >= 0) {
        // it does exist so we will remove it using destructing
        selection = [
          ...selection.slice(0, keyIndex),
          ...selection.slice(keyIndex + 1)
        ];
      } else {
        // it does not exist so add it
        selection.push(key);
      }
      // update the state
      this.setState({ selection });
    
  };
  toggleAll = () => {
    const selectAll = !this.state.selectAll;
    const selection = [];
    if(selectAll) {
      this.props.resource.forEach(e => {
          selection.push(e.id);
      })
    }
    this.setState({selectAll, selection});
}
  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };
  logSelection = () => {
    console.log("selection:", this.state.selection);
  };
  // toggleType = () => {
  //   this.setState({
  //     selectType: this.state.selectType === "radio" ? "checkbox" : "radio",
  //     selection: [],
  //     selectAll: false
  //   });
  // };
  render() {
    const data = this.props.resource;
    const columns = [...this.props.columns];
    //columns
    columns.unshift({
        Header: "",
        accessor: 'id',
        Cell: row => (
            <input type="checkbox" onChange={e => this.toggleSelection(row.original.id)}
            checked={this.isSelected(row.original.id)}
            />
        ),
        width: 20
    })
    // console.log(columns);
    // const {
    //   toggleSelection,
    //   toggleAll,
    //   isSelected,
    //   logSelection
    // } = this;
    // const extraProps = {
    //   isSelected,
    //   toggleAll,
    //   toggleSelection
    // };
    return (
      <div style={{ padding: "10px" }}>
        <div className='header-project'>
          <div className='spacer'>{this.props.header}</div>
          {this.props.profile ? <span>
          <input type="checkbox" checked={this.state.selectAll} onChange={this.toggleAll}/> Select All</span>: null}
          {this.props.add ? <button 
          className='modify-project' onClick={() => this.props.add(this.state.selection)}><i className="fas fa-arrow-circle-right"></i></button> : null}
          {this.props.delete ? <button 
          className='modify-project' onClick={() => {this.props.delete(this.state.selection);
    this.setState({selection: []}); }}><i className="fas fa-trash-alt"></i></button> : null}        
        </div>

        {data ? (
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={10}
            // ref={r => (this.selectTable = r)}
            // className="-striped -highlight"
            // {...extraProps}
            // selectType="checkbox"
          />
        ) : null}
      </div>
    );
  }
}

export default SelectTable;