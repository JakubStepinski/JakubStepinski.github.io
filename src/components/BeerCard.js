import React, { Component } from 'react';
import Spinner from './spinner';
import { Link } from 'react-router-dom';

export default class BeerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadSrc: false,
            badSrc: false
        };
        this.image = new Image();
    }
    componentWillUnmount() {
        this.image.onload = null;
        this.image.onerror = null;
    }
    componentDidMount() {
        this.handleImageDownload();
    }
    handleImageDownload() {
        this.image.src = this.props.data.image_url;
        if (!this.image.complete) {
            this.image.onload = () => {
                this.setState({
                    loadSrc: true
                });
            }
            this.image.onerror = () => {
                this.setState({
                    badSrc: true
                });
            }
        }
        else {
            this.setState({
                loadSrc: true
            })
        }
    }
    render() {
        const viewDownload = <div className='beerListBuffer'>
            <img src='images/drink-big.png' />
            <Spinner downError={this.state.badSrc} height='100px' />
        </div>;
        return (
            <div className='col-12 col-sm-4 col-xl-3 p-2 p-lg-4 p-xl-4 cardElement'>
                <Link to={`/details/${this.props.data.id}`} className='card text-center p-2 col-12'>
                    {this.state.loadSrc ? <img className='card-img-top mx-auto p-1' src={this.props.data.image_url} alt='beer image' /> : viewDownload}
                    <div className='card-block'>
                        <h4 className='card-title'><span className='cardTitle'>{this.props.data.name}</span></h4>
                        <p className='card-text px-2'>{this.props.data.tagline}</p>
                    </div>
                </Link>
            </div>
        );
    }
}
