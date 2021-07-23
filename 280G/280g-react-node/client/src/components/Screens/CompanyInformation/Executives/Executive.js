import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { executiveState } from '../../../../recoil/executive';
import { editExecutive, deleteExecutive } from '../../../../api/executive';
import { allTrue } from '../../../../utilities/checkObject';

import Name from './Name/Name';
import Title from './Title/Title';

const Executive = ({ executiveId, removeExecutiveId }) => {

  const [ executive, setExecutive ] = useRecoilState(executiveState(executiveId));
  const [ completed, setCompleted ] = useState((executive.new) ? { executiveName: false, title: false } : {executiveName: true, title: true });

  const handlers = {
    change: ({ target: { name, value }}) => setExecutive({ ...executive, [name]: value }),
    edit: ({ target: { name }}) => setCompleted({ ...completed, [name]: false }),
    submit: async ({ target: { name }}) => {
      await editExecutive(executive);
      setCompleted({ ...completed, [name]: true });
    },
    handleDelete: async () => {
      await deleteExecutive(executiveId);
      setExecutive({ });
      removeExecutiveId(executiveId);
    }
  }

  useEffect(() => {

    if (executive.new && allTrue(completed)) setExecutive({ ...executive, new: false }); 
  
  }, [executive, completed, setExecutive])

  return (
    <>
      <Name name={ executive.executiveName } completed={ completed.executiveName } handlers={ handlers } />
      <Title title={ executive.title } completed={ completed.title } handlers={ handlers } />
    </>
  );

};

export default Executive;