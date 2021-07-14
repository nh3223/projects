import React, { useState, useEffect } from 'react';

import { fetchProblems } from '../firebase/problems';
import { calculateTotalScore } from '../utilities/updateScore';
import { getTimes } from '../utilities/getTimes';

import Header from './Header/Header';
import PlayRound from './PlayRound';
import Welcome from './Welcome/Welcome';

const Home = ({ user, login, logout }) => {

  const [ times, setTimes ] = useState({});
  const [ score, setScore ] = useState(0);
  const [ problems, setProblems ] = useState([]);
  const [ play, setPlay ] = useState(false);

  const updateTimes = (problemId, newTime) => setTimes({ ...times, [problemId]: newTime });
  const updateScore = (newScore) => setScore(newScore)
  const togglePlay = () => setPlay(!play);
  
  useEffect(() => {

    const loadTimes = async () => {
      const userTimes = await getTimes(user.uid);
      const userScore = calculateTotalScore(userTimes);
      setTimes(userTimes);
      setScore(userScore);
    };
   
    if (user.isAuthenticated && Object.keys(times).length === 0) loadTimes();

  }, [user, times, setTimes]);
  
  useEffect(() => {

    const loadProblems = async () => setProblems(await fetchProblems());
    
    if (Object.keys(problems).length === 0) loadProblems();

  }, [problems, setProblems]);

  return (
    <>
      <Header user={ user } score={ score } login={ login } logout={ logout } />
      { (play)
        ? <PlayRound user={ user } problems={ problems } times={ times } score={ score } updateTimes={ updateTimes } updateScore={ updateScore } togglePlay={ togglePlay } />
        : <Welcome user={ user } onClick={ togglePlay } />
      }
    </>
  )

};

export default Home;