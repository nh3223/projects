import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { fetchCompanies } from '../api/company/fetchCompanies';
import { projectNamesState } from '../recoil/company'; 

export const useLoadProjectNames = () => {
  
  const [ projectNames, setProjectNames ] = useRecoilState(projectNamesState());;

  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const setNames = async () => {

      setLoading(true);
      setLoaded(false);

      try {
        const projects = await fetchCompanies();
        setProjectNames(projects.map((project) => project.projectName));
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!projectNames) setNames();
  
  }, [projectNames, setProjectNames]);

  return { loading, error };

};

