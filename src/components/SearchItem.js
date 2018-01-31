import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchItem extends Component {
    render() {
        return (
            <Link to={`/details/${this.props.id}`}>
                <li className='p-1 searchItem'>
                    <img className='pr-2' src={this.props.beerImgUrl} />
                    <span>{this.props.beerName}</span>
                </li>
            </Link>
        );
    }
}