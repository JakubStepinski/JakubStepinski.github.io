import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BeerSearch from './BeerSearch';

export default class NavBar extends Component {
    render() {
        return (
            <nav className='navbar naviBar'>
                <Link to='/' className='navbar-brand col-12 col-sm-5 col-lg-3' href='#'>
                    <img className='d-inline-block align-top' src={'../../images/drink.png'} alt='' />
                    Beer app
                </Link>
                <div className='col-12 col-sm-5 col-lg-3'>
                    <BeerSearch />
                </div>
            </nav>
        );
    }
}