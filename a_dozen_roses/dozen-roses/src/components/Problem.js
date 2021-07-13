import React from 'react';

const Problem = ({ problem, response, handleChange, handleSubmit }) => (
  <>
    <h1>{ problem }</h1>
    <form onSubmit={ handleSubmit }>
      <input value={ response } onChange={ handleChange } />
      <button>Submit</button>
    </form>    
  </>
);

export default Problem;

