import React from 'react';

const ExecutivesForm = ({ name, title, handleSubmit, handleNameChange, handleTitleChange}) => (
  <form>
    <label>Executive: </label>
    <input value={ name } placeholder="Name" onChange={ handleNameChange }></input>
    <input value={ title } placeholder="Title" onChange={ handleTitleChange }></input>
    <button onClick={ handleSubmit }>Submit</button>
  </form>
);

export default ExecutivesForm;