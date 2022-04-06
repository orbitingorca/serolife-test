import React from 'react';
import DisplayRecipe from '../DisplayRecipe/DisplayRecipe';
import { SearchService } from '../../services/Search/SearchService';
import "./Search.css";

export class Search extends React.Component {

    state: any;
    searchService: SearchService;

    constructor(props: any) {
      super(props);
      this.state = {
        searchTerm: '',
        go: false,
        searchResults: [],
        picked: ''
      };
      this.searchService = new SearchService();
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.pickRecipe = this.pickRecipe.bind(this);
    }
  
    handleChange(event: any) {
      this.setState({searchTerm: event.target.value, go: false});
    }
  
    handleSubmit(event: any) {
      event.preventDefault();
      this.searchService.searchByName(this.state.searchTerm).then(list => {
        if (list) {
          this.setState({go: false, searchResults: list})
        }
      });
    }

    pickRecipe(recipeName: string) {
      this.setState({picked: recipeName, go: true});
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.searchTerm} onChange={this.handleChange}
               placeholder="Recipe Name" title="Recipe Name.  Leave empty to see all"/>
            </label>
            <input type="submit" value="Search By Name" />
          </form>
          <div className="box">
            <div className={`${this.state.go?"hide":""} search-result`}>
              {this.state.searchResults.length > 0 && <h4>Found:</h4>}
              {this.state.searchResults.length > 0 && this.state.searchResults.map((r: string) => {
                return <button onClick={() => this.pickRecipe(r)}>{r}</button>
              })}
            </div>
            <div>
                {this.state.go && <DisplayRecipe recipe={this.state.picked}></DisplayRecipe>}
            </div>
          </div>
        </div>
      );
    }
  }

