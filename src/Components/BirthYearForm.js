import React, { Component } from 'react';

export default class BirthYearForm extends Component {

  state = {
    searchTerm: ''
  }

  handleSearch = (event) => {
   this.setState({searchTerm: event.target.value})
  }

  searchForYear = (year) => {
    this.props.setBirthYear(year);
    window.location='http://localhost:3000/api/v1/search/?year=' + year;
  }

  render(){
    return(
      <div className="birth-form-container">
        <div className="home-container">
          <p>please enter your birth year:</p>
          <input value={this.state.searchTerm} onChange={this.handleSearch} />
          <button className="submit-year-button" onClick={() => this.searchForYear(this.state.searchTerm)}>submit</button>
        </div>
      </div>

    )
  }
}
