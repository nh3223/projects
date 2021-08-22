import { useState } from 'react';
import { useLoadCompany } from './useLoadCompany';
import { useLoadExecutives } from './useLoadExecutives';

export const useLoadProject = (companyId) => {

  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState([]);

  const toggleLoading = () => setLoading(!loading);
  
  const handleError = (errorMessage) => setError([ ...error, errorMessage]);

  useLoadCompany(companyId, toggleLoading, handleError);
  useLoadExecutives(companyId, toggleLoading, handleError);

  return { loading, error }

};
