import React from 'react';
import { Link } from 'react-router-dom';

import Description from '../Description/Description';

const LinkedDescription = ({ path, text }) => (
  <Link to={ path }>
    <Description text={ text } />
  </Link>
);

export default LinkedDescription;