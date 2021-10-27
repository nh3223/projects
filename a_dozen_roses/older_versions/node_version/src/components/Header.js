import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>A Dozen Roses</h1>
        <NavLink to="/" activeClassName="is-active" exact={ true }>Home</NavLink>
    </header>
);

export default Header;