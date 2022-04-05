import React, { useState } from 'react';
import DisplayRecipe from '../DisplayRecipe/DisplayRecipe';

export class Search extends React.Component {

    state: any;
    go: boolean;

    constructor(props: any) {
      super(props);
      this.state = {value: '', go: false};
      this.go = false;
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event: any) {
      this.setState({value: event.target.value, go: false});
    }
  
    handleSubmit(event: any) {
      event.preventDefault();
      this.setState({go: true})
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {this.state.go && <DisplayRecipe recipe={this.state.value}></DisplayRecipe>}
        </div>
      );
    }
  }