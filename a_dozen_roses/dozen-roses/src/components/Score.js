import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

import convertScore from '../utilities/convertScore';

const Score = () => {

  const { user, score } = useContext(GlobalContext)
  const [ level, setLevel ] = useState(1);
  const [ levelScore, setLevelScore ] = useState(0);

  useEffect(() => {
    if (user.isAuthenticated) {
      const convertedScore = convertScore(score);
      setLevel(convertedScore.level);
      setLevelScore(convertedScore.score);
    } else {
      setLevel(1);
      setLevelScore(0);
    }
  }, [user, score])

  const backgroundStyle = {
    background: 'red',
    width: '100px',
    height: '10px'
  };

  const progressStyle = {
    background: 'blue',
    width: `${levelScore}%`,
    height: '10px'
  }

  return (
    <React.Fragment>
      <h3>Level: { level }</h3>
      <h3>Score: { levelScore }</h3>
      <div style={ backgroundStyle }>
        <div style={ progressStyle }>
        </div>
      </div>
    </React.Fragment>
  )
};

export default Score;