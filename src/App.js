import React from 'react';
import './App.css';
import { validations } from './validation';

class CreditCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
    this.hasError = this.hasError.bind(this);
    this.state = {
      creditCardForm: {
        name: '',
        cardNum: '',
        cvv: '',
        month: '',
        year: ''
      },
      errors: {
        name: '',
        cardNum: '',
        cvv: '',
        month: '',
        year: ''
      }
    };
  }

  hasErrors = () => {
    for (let error of Object.values(this.state.errors)) {
      if (error !== '') {
        return true;
      }
    }
    return false;
  };

  hasError = (name) => {
    return this.state.errors[name] !== '';
  };

  submit = (event) => {
    event.preventDefault();
    if (this.hasErrors()) {
      alert('Please fix errors');
    }
    let expDate = new Date(
      this.state.creditCardForm.year,
      this.state.creditCardForm.month,
      '01'
    );
    if (expDate < new Date()) {
      alert('Your credit card has expired.  Please try a different card');
    } else if (
      this.state.creditCardForm.cardNum.length === 16 &&
      this.state.creditCardForm.cardNum[0] === '4' &&
      this.state.creditCardForm.cvv.length === 3
    ) {
      alert('Successfully added Visa credit card');
    } else if (
      this.state.creditCardForm.cardNum.length === 15 &&
      (this.state.creditCardForm.cardNum.substring(0, 2) === '34' ||
        this.state.creditCardForm.cardNum.substring(0, 2) === '37') &&
      this.state.creditCardForm.cvv.length === 4
    ) {
      alert('Successfully added AmEx credit card');
    } else {
      alert('Not a valid credit card.  Please try again');
    }
  };

  updateForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const validation = event.currentTarget.getAttribute('validation');
    const error = validations(validation, value);
    this.setState((prevState) => ({
      creditCardForm: {
        ...prevState.creditCardForm,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: error
      }
    }));
  };

  render() {
    return (
      <form onSubmit={this.submit} className="creditForm">
        <h3>Enter your Credit Card Info</h3>
        <div>
          <input
            type="text"
            className={'textInput' + (this.hasError('name') ? ' error' : '')}
            name="name"
            placeholder="Name"
            value={this.state.creditCardForm.name}
            onChange={this.updateForm}
            validation="name"
            required
          />
          <p className="errorText">{this.state.errors.name}</p>
        </div>
        <div>
          <input
            type="text"
            className={'textInput' + (this.hasError('cardNum') ? ' error' : '')}
            name="cardNum"
            placeholder="Card Number"
            value={this.state.creditCardForm.cardNum}
            onChange={this.updateForm}
            validation="creditNum"
            required
          />
          <p className="errorText">{this.state.errors.cardNum}</p>
        </div>
        <div>
          <input
            type="text"
            className={'textInput' + (this.hasError('cvv') ? ' error' : '')}
            name="cvv"
            placeholder="CVV2"
            value={this.state.creditCardForm.cvv}
            onChange={this.updateForm}
            validation="cvv"
            required
          />
          <p className="errorText">{this.state.errors.cvv}</p>
        </div>
        <div>
          <select
            value={this.state.creditCardForm.month}
            className="selectInput"
            onChange={this.updateForm}
            name="month"
            required
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <input
            type="text"
            className={
              'textInput year' + (this.hasError('cardNum') ? ' error' : '')
            }
            name="year"
            placeholder="Exp. Year"
            value={this.state.creditCardForm.year}
            onChange={this.updateForm}
            validation="year"
            required
          />
          <p className="errorText">{this.state.errors.year}</p>
        </div>
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default CreditCardForm;
