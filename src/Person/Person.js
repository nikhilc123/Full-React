import React from 'react';
import Radium from 'radium';

import './Person.css';

// const name should be lowercase
const person = (props) => {
  const style = {
    '@media: (min-width: 500px)':{
      width: '450px'
    }
  };
  // override Person class css style with new {style}
  return (
    <div className='Person' style={style}>
      <p>{props.children}</p>
      <p onClick={props.click}>I'm {props.name} and I'm {props.age} years old </p>
      <input type="text" onChange ={props.change}></input>
    </div>
  )

};

// export the const name to use in App.js
export default Radium(person);
