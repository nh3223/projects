import React from 'react';

const ExecutivesForm = ({ name, title, nameChange, titleChange, handleSubmit }) => (
  <form>
    <label>Executive: </label>
    <input value={ name } placeholder="Name" onChange={ nameChange }></input>
    <input value={ title } placeholder="Title" onChange={ titleChange }></input>
    <button onClick={ handleSubmit }>Submit</button>
  </form>
);

export default ExecutivesForm;