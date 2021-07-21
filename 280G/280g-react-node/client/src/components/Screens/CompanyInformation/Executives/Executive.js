import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { executiveState } from '../../../../recoil/executive';
import { editExecutive, deleteExecutive } from '../../../../api/executive';
import { allTrue } from '../../../../utilities/checkObject';

import Name from './Name/Name';
import Title from './Title/Title';

const Executive = ({ executiveId, add, handleCreate, removeExecutiveId }) => {

  const [ executive, setExecutive ] = useRecoilState(executiveState(executiveId));
  const [ completed, setCompleted ] = useState({});

  const nameHandlers = {
    change: (e) => setExecutive({ ...executive, name: e.target.value }),
    edit: () => setCompleted({ ...completed, name: false }),
    submit: async (e) => {
      e.preventDefault();
      if (!add) await editExecutive(executive);
      setCompleted({ ...completed, name: true });
    }
  };

  const titleHandlers = {
    change: (e) => setExecutive({ ...executive, title: e.target.value }),
    edit: () => setCompleted({ ...completed, title: false }),
    submit: async (e) => {
      e.preventDefault();
      if (!add) await editExecutive(executive);
      setCompleted({ ...completed, title: true })
    },
    deleteExecutive: async () => {
      await deleteExecutive(executiveId);
      setExecutive({ });
      removeExecutiveId(executiveId);
    }
  };
  
  useEffect(() => {
    const createExecutive = async () => await handleCreate(executive);
    if (add && allTrue(completed)) createExecutive() 
  }, [add, completed, executive, handleCreate])

  useEffect(() => (add) ? setCompleted({ name: false, title: false }) : setCompleted({ name: true, title: true }), [add, setCompleted]);

  return (
    <>
      <Name name={ executive.name } completed={ completed.name } handlers={ nameHandlers } />
      <Title title={ executive.title } completed={ completed.title } handlers={ titleHandlers } />
    </>
  );

};

export default Executive;