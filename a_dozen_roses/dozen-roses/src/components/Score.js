import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

import convertScore from '../utilities/convertScore';

const Score = () => {

  const { score } = useContext(GlobalContext)
  const [ level, setLevel ] = useState(1);
  const [ levelScore, setLevelScore ] = useState(0);

  useEffect(() => {
    const convertedScore = convertScore(score);
    setLevel(convertedScore.level);
    setLevelScore(convertedScore.score);
  }, [score])

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