import React, { useState, useEffect } from 'react';

import { convertScore } from '../../utilities/convertScore';

import { Background, Progress, ScoreText } from './styles';

const Score = ({ score }) => {

  const [ level, setLevel ] = useState(1);
  const [ levelScore, setLevelScore ] = useState(0);

  useEffect(() => {
    const convertedScore = convertScore(score);
    setLevel(convertedScore.level);
    setLevelScore(convertedScore.score);
  }, [score]);

  console.log('score', score);

  return (
    <>
      <ScoreText>Level: { level }</ScoreText>
      <Background>
        <Progress width={ `${levelScore}%` } />
      </Background>
      <ScoreText>Score: { levelScore }</ScoreText>
    </>
  );

};

export default Score;