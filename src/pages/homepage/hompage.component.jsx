import React from 'react';

import Header from '../../components/header/header.components';
import './homepage.styles.scss';

const isAuthorised = () => {
  return true;
}

const Homepage = () => {
  return <div className='homepage'>Some homepage text</div>;
};

export default Homepage;
