import React, { Component } from 'react';
import './Template.css';

class Template extends Component {

    state = {
        scopeFileds: [{header: "RESOURCE NAME", accessor: "name"}],
        extraFields: [{field: 'quantity', type: 'number', formula: ''},
        {field: 'price', type: 'number', formula: ''},
        {field: 'total price', type: 'formula', formula: 'quantity * number'}]
    }

    handleSave = () => {
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
                <div className='cell' key={e.field}>
                    <div className='field'>
                        <label className='label'>Field</label>
                        <input type='text' value={e.field} 
                        onChange={e => this.handleInputChange(index, e.target.value, 'field')}/>
                    </div>
                    <div className='type'>
                        <label className='label'>Type</label>
                        <select value={e.type} onChange={e => this.handleInputChange(index, e.target.value, 'type')}>
                            <option value='number'>Number</option>
                            <option value='text'>Text</option>
                            <option value='formula'>Formula</option>
                        </select>
                    </div>
                    <div className='formula'>
                    {e.type === 'formula' ?  
                        <><label className='label'>Formula</label>
                        <input type='text' value={e.formula} 
                        onChange={e => this.handleInputChange(index, e.target.value, 'formula')}/></>
                        : null}
                    </div>
                    <div className='delete' onClick={() => this.handleDelete(index)}><i className="fas fa-trash-alt"></i></div>
                </div>
            )
        });

        return (
        <div>
            <div className='container-template'>
                <div className='scope-fields'>
                    
                    <table className='table table-striped'>
                        <thead>
                            <tr><td><h5>Project Scope Fields</h5></td></tr>
                        </thead>
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
                    <h5>Quantity Survey Fields</h5>
                    {surveyFields}
                    <div>Add Field<button onClick={this.addField}>
                    <i className="fas fa-plus"></i></button></div>
                </div>
            </div>
            <button onClick={this.handleSave}>Save</button>
        </div>
        );
    }
}

export default Template;