import React, { Component } from 'react';
import { addColumn, setColumns } from '../../redux/actions/actionCreators';
import { connect } from 'react-redux';
import './Template.css';

class Template extends Component {

    state = {
        scopeFileds: [{header: "RESOURCE NAME", accessor: "name"}],
        // extraFields: [{field: 'quantity', type: 'number', formula: ''},
        // {field: 'price', type: 'number', formula: ''},
        // {field: 'total price', type: 'formula', formula: 'quantity * number'}]
        // extraFields: this.props.extraColumns? this.props.extraColumns.map(e => ({
        //     field: e.accessor, type: 'number', formula: ''
        // })): {}
        extraFields: []
    }

    handleSave = () => {
        this.props.setColumns(this.state.scopeFileds);
        this.props.addColumn(this.state.extraFields.map(e => e.field));
        this.props.history.push('/formula');
    }

    toggleScope = () => {
        let scopes = [...this.state.scopeFileds];
        if(scopes.length > 1) {
            scopes.pop();
        } else {
            scopes.push({header: "RESOURCE CODE", accessor: "code"});
        }
        this.setState({scopeFileds: scopes});
    }

    addField = () => {
        let extraFields = [...this.state.extraFields, {field: '', type: 'number', formula: ''}]
        this.setState({extraFields});
    }

    handleInputChange = (index, newValue, inputType) => {
        let newFields = [...this.state.extraFields];
        newFields[index][inputType] = newValue;
        this.setState({extraFields: newFields});
    }

    handleDelete = (index) => {
        let origin = this.state.extraFields;
        let newFields = [...origin.slice(0, index), ...origin.slice(index+1)];
        this.setState({extraFields: newFields});
    }

    render() {
        let surveyFields = this.state.extraFields.map((e, index) => {
            return (
                <div className='cell' key={index}>
                    <div className='cell-left'>
                        <div className='input'><label className='label'>Field</label>
                        <input type='text' name='field' value={e.field} 
                        onChange={e => this.handleInputChange(index, e.target.value, 'field')}/></div>
                    </div>
                    <div className='cell-left'>
                        <div className='input'><label className='label'>Type</label> 
                        <select value={e.type} 
                        onChange={e => this.handleInputChange(index, e.target.value, 'type')}>
                            <option value='number'>Number</option>
                            <option value='text'>Text</option>
                            <option value='formula'>Formula</option>
                        </select></div>
                    </div>
                    <div className='cell-left'>
                        <div className='input'>
                        {e.type === 'formula' ?  
                            <><label className='label'>Formula</label> 
                            <input type='text' name='formula' value={e.formula} 
                            onChange={e => this.handleInputChange(index, e.target.value, 'formula')}/></>
                            : null}</div>
                    </div>
                    <button className='delete' onClick={() => this.handleDelete(index)}><i className="fas fa-trash-alt"></i></button>
                </div>
            )
        });

        return (
        <div className='container-template'>
            <div className='container-fields'>
                <div className='scope-fields'>
                <h6 className='header-quantity'>Project Scope Fields</h6>
                    <table className='table table-striped'>
                        {/* <thead>
                            <tr><td><h5 className='header-quantity'>Project Scope Fields</h5></td></tr>
                        </thead> */}
                        <tbody>
                            <tr>
                                <td>RESOURCE NAME</td>
                                <td><input type='checkbox' checked={true} disabled={true}/></td>
                            </tr>
                            <tr>
                                <td>RESOURCE CODE</td>
                                <td><input type='checkbox' onChange={this.toggleScope} checked={this.state.scopeFileds.length > 1}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='survey-fields'>
                    <h6 className='header-quantity'>Quantity Survey Fields</h6>
                    {surveyFields}
                    <div id='add-field'>Add Field<button onClick={this.addField}>
                    <i className="fas fa-plus"></i></button></div>
                </div>
            </div>
            <button className='button-save' onClick={this.handleSave}>Save</button>
        </div>
        );
    }
}

const mapStateToProps = ({resource}) => (
    {
        extraColumns: resource.extraColumns
    }
)

const mapDispatchToProps = dispatch => ({
    addColumn: (cols) => dispatch(addColumn(cols)),
    setColumns: (cols) => dispatch(setColumns(cols))
})

export default connect(mapStateToProps, mapDispatchToProps)(Template);