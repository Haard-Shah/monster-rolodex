import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import "./App.css";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super(); // call parent constructor

    this.state = {
      monsters: [],
      searchFiled: "",
    };
  }

  //USEFUL: for assessment API calls
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((Response) => Response.json())
      // .then((users) => console.log(users));
      .then((users) => this.setState({ monsters: users }))
      .catch((error) => console.log(error));
  }

  handleChange = (e) => {
    this.setState({ searchFiled: e.target.value });
  };

  render() {
    const { monsters, searchFiled } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchFiled.toLowerCase())
    ); //this will refilter the array every time render() is called which in this case would be onchange() for input

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="Search Monsters"
          handleChange={this.handleChange} // parsing a functions as a call for onchange()
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
