import React from 'react';

import { ProblemPage, ProblemText, ProblemInput } from './styles';

const Problem = ({ problem, response, handleChange, handleSubmit }) => (
  <ProblemPage>
    <ProblemText>{ problem }</ProblemText>
    <form onSubmit={ handleSubmit }>
      <ProblemInput value={ response } onChange={ handleChange } autoFocus />
    </form>    
  </ProblemPage>
);

export default Problem;

