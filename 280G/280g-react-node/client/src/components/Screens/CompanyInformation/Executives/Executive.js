import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { executiveState } from '../../../../recoil/executive';
import { editExecutive, deleteExecutive } from '../../../../api/executive';
import isCompleted from '../../../../utilities/isCompleted';

import Name from './Name/Name';
import Title from './Title/Title';

const Executive = ({ executiveId, add, handleCreate, removeExecutiveId }) => {

  const [ executive, setExecutive ] = useRecoilState(executiveState(executiveId));
  const [ completed, setCompleted ] = useState({});
  const formSubmit = useRef(false)

  const nameHandlers = {
    change: (e) => setExecutive({ ...executive, name: e.target.value }),
    edit: () => setCompleted({ ...completed, name: false }),
    submit: (e) => {
      e.preventDefault();
      setCompleted({ ...completed, name: true });
      formSubmit.current = true;
    }
  };

  const titleHandlers = {
    change: (e) => setExecutive({ ...executive, title: e.target.value }),
    edit: () => setCompleted({ ...completed, title: false }),
    submit: (e) => {
      e.preventDefault();
      setCompleted({ ...completed, title: true })
      formSubmit.current = true;
    },
    deleteExecutive: async () => {
      await deleteExecutive(executiveId);
      setExecutive({ });
      removeExecutiveId(executiveId);
    }
  };
  
  useEffect(() => {
    
    const createExecutive = async () => await handleCreate(executive);

    const updateExecutive = async () => await editExecutive(executive);
      
    if (isCompleted(completed) && formSubmit.current) {
      (add) ? createExecutive() : updateExecutive();
      formSubmit.current = false;
    }

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