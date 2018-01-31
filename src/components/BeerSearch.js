import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchItem from './SearchItem';
import axios from 'axios';
import Spinner from './spinner';
import _ from 'lodash';

export default class BeerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            searchPhrase: '',
            results: [],
            loading: false
        }
        //request limiter
        this.downloadList = _.debounce(this.downloadList, 300);
    }
    componentDidMount() {
        window.addEventListener('click', e => {
            this.setState({
                showList: false
            });
        });
    }
    componentWillReceiveProps(newProps) {
        this.handleSearchReset();
    }
    handleHideClick(e) {
        e.stopPropagation();
    }
    handleShowClick() {
        this.setState({
            showList: true
        });
    }
    downloadList(phrase) {
        const request = axios.get(`https://api.punkapi.com/v2/beers?beer_name=${phrase}`);
        this.setState({
            results: [],
            loading: true
        });
        request.then(data => {
            this.setState({
                results: data.data,
                loading: false
            });
        });
    }
    handleNameSearch(e) {
        if (e.target.value.length > 2) {
            this.downloadList(e.target.value);
        }
        else {
            this.setState({
                results: [],
                loading: false
            });
        }
        this.setState({
            searchPhrase: e.target.value
        });
    }
    handleSearchReset() {
        this.setState({
            results: [],
            loading: false,
            showList: false,
            searchPhrase: ''
        });
    }
    render() {
        const resultArray = this.state.results.map(result => {
            return <SearchItem
                key={result.id} beerName={result.name}
                beerImgUrl={result.image_url}
                id={result.id}
                />;
        });

        return (
            <div onClick={this.handleHideClick.bind(this)} ref='searchWindow' className='searchBar'>
                <input
                    onFocus={this.handleShowClick.bind(this)}
                    onChange={this.handleNameSearch.bind(this)}
                    value={this.state.searchPhrase}
                    className='col-12 navSearch'
                    type='search'
                    />
                <img className='searchIcon' src={'../../images/search.PNG'} alt='' />
                <div className={this.state.showList ? 'col-12 p-2 searchRecords' : 'searchRecordsInvi'}>
                    {this.state.loading ? <Spinner /> : <ul className='m-0'>{resultArray}</ul>}
                </div>
            </div>
        );
    }
}