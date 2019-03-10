import React, { Component } from 'react';
// package use to import media queries - inline styling
import Radium, {StyleRoot} from 'radium';
import './App.css';
// check the case while importing
import Person from './Person/Person'

class App extends Component {
  // assign the state, in other words assign the variables
  state = {
    persons:[
      { id: 'adaf1', name: 'Nikhil', age: 28 },
      { id: 'asff2', name: 'Stephanie', age: 27 }
    ],
    // set the initial status or assign a variable
    toggleStatus: false
  };

  // function and change the state using setState - manipulate the variables
  // switchHandler = (newName) => {
  //   console.log('I am clicked');
  //   // do not do this if you want to override values, it wont work in React
  //   // this.stae.persons[1].name = "Steph"
  //   this.setState( {
  //     persons:[
  //       { name: newName, age: 29 },
  //       { name: 'Stephanie Chikorde', age: 28 }
  //     ]
  //   })
  // };

  toggleSwitchHandler = (event) => {
    event.preventDefault();
    // grab the current state to manipulate
    const showstatus = this.state.toggleStatus;
    // manipulate the toggleStatus
    this.setState( {
      toggleStatus: !showstatus
    })
  };

  changeNameHandler = (event, id) => {
    // grab the index of a particular person
    const personIndex = this.state.persons.findIndex(p =>{
      return id === p.id
    });

    // do not mutate the object directly
    // create a new object and copy the original array
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
      })
  };

  deleteHandler = (index) => {
    // grab the person
    // bad practice to mutate the original array
    // const deletePerson = this.state.persons;
    //make a copy and then delete
    const deletePerson = [...this.state.persons];
    // delete using index value
    deletePerson.splice(index, 1);
    // update the person to its latest state
    this.setState({
      persons: deletePerson
    })
  };

  render() {
    // Inline style restricted to scope
    const style = {
      backgroundColor: 'green',
      color: 'white',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;
    // always check or use something with the state
    if(this.state.toggleStatus){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              // dynamic content thats why paranthesis
                name={person.name}
                age={person.age}
                key={person.id}
                // 2 ways to attach event handler, other commented below - anonymous function
                // click = {this.deleteHandler.bind(this, index)}
                click = {() => this.deleteHandler(index)}
                change={(event) => this.changeNameHandler(event, person.id)}
            />
          })
          }
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    // Add dynamic css class
    const classes = [];
    if (this.state.persons.length <=2 ){
      classes.push('blue') // classes = ['red']
    }

    if(this.state.persons.length <= 1){
      classes.push('bold') // classes = ['red', 'bold']
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi I'm a React Developer!</h1>
          <p className={classes.join(' ' )}>Ruby on Rails</p>
          <button style = {style}
            onClick={this.toggleSwitchHandler}>Switch me</button>
            {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
