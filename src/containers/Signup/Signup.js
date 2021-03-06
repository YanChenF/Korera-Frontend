import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
// import Button from '../../components/Button/Button';
import classes from './Signup.module.css';
import { signup } from '../../redux/actions/actionCreators';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Signup extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'username'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        // console.log(...this.state.controls);
          const updatedControls = {
              ...this.state.controls,
              [controlName]: {
                  ...this.state.controls[controlName],
                  value: event.target.value,
                  valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                  touched: true
              }
          };
          console.log(updatedControls);
          console.log(this.state);
          this.setState( { controls: updatedControls } );
  
      }

    switchToLogin = () => {
        console.log(this.props.history);
        this.props.history.push('/login');
    }

    signup = (e) => {
        e.preventDefault();
        this.props.signup(this.state.controls.email.value, this.state.controls.password.value,
        this.state.controls.username.value);
    }


    render() {
        const inputsArray = [];
        for(let key in this.state.controls) {
            inputsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (inputsArray.map(e => (
            <Input 
            key={e.id}
            elementType={e.config.elementType}
            elementConfig={e.config.elementConfig}
            value={e.config.value}
            invalid={!e.config.valid}
            touched={e.config.touched}
            shouldValidate={e.config.validation}
            label={e.id}
            changed={event => this.inputChangedHandler( event, e.id )} />
        )));

        if (this.props.auth.isLoading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.auth.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.auth.completeSignup) {
            authRedirect = <Redirect to='/login'/>
        }
        // console.log(this.props.auth);
        return (<div className={classes.Auth}>
            <form onSubmit={this.signup}>
                {form}
                {authRedirect}
                {errorMessage}
                {/* <Button btnType="Success">Log in</Button> */}
                <div className={classes.signup}><button className={classes.button}>Sign up</button></div>
            </form>
            <div className={classes.signup}><button className={classes.switch} onClick={this.switchToLogin}>Switch To Login</button></div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth }
} 

const mapDispatchToProps = (dispatch) => ({
    signup: (email, password, username) => dispatch(signup(email, password, username))
});


export default connect(mapStateToProps, mapDispatchToProps)(Signup);