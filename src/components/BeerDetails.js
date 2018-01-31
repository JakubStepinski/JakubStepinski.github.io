import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from './spinner';
import BeerCard from './BeerCard';
import { fetchBeer, fetchStrongerBeer, fetchWeakerBeer, resetBeerDetails } from '../actions';

class BeerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }
    componentDidMount() {
        this.downloadDetails(this.props.match.params.id);
    }
    componentWillUnmount() {
        this.props.resetBeerDetails();
    }
    componentWillReceiveProps(newProps) {
        // url changed, fetch new data, reset current component
        if (this.props.match.params.id !== newProps.match.params.id) {
            this.downloadDetails(newProps.match.params.id);
            this.props.resetBeerDetails();
            this.setState({
                error: false
            });
        }
        // new data, check if there is error, if not fetch propositions
        if (newProps.beerDetails.id !== this.props.beerDetails.id) {
            if (newProps.beerDetails.error) {
                this.setState({
                    error: true
                });
            }
            else if (newProps.beerDetails.id) {
                this.props.fetchStrongerBeer(Math.ceil(newProps.beerDetails.ibu));
                this.setState({
                    error: false
                });
            }
        }
    }
    downloadDetails(id) {
        this.props.fetchBeer(id);
    }
    renderBeerDetails() {
        let similarBeers = <Spinner />;
        //check if the similar beers are loaded
        if (this.props.beerSimilar.length) {
            //check if there are at least 3 of them, otherwise load beers with less ibu
            //with lt api sends whole list, not the beers with closest parameters
            if (this.props.beerSimilar.length < 3) {
                this.props.fetchWeakerBeer(Math.floor(this.props.beerDetails.ibu));
            }
            else {
                similarBeers = this.props.beerSimilar.map(beer => <BeerCard key={beer.id} data={beer} />);
            }
        }
        return (
            <div className='col-12 col-xl-8 offset-xl-2 px-1 py-3 beerDetails'>
                <div className='col-4 col-sm-3 col-md-3 text-center'>
                    <img key={this.props.beerDetails.image_url} src={this.props.beerDetails.image_url} />
                </div>
                <div className='d-block d-sm-none col-8'>
                    <h4 className=''><span className='beerTitle'>{this.props.beerDetails.name}</span></h4>
                    <p className=''>{this.props.beerDetails.tag_line}</p>
                    <ul className='beerStatList'>
                        <li><strong>IBU:</strong>{this.props.beerDetails.ibu}</li>
                        <li><strong>ABV:</strong>{this.props.beerDetails.abv}</li>
                        <li><strong>EBC:</strong>{this.props.beerDetails.ebc}</li>
                    </ul>
                </div>
                <div className='d-block d-sm-none col-12'>
                    <p className=''>{this.props.beerDetails.description}</p>
                </div>
                <div className='d-none d-sm-block col-sm-9 col-md-4'>
                    <h4 className=''><span className='beerTitle'>{this.props.beerDetails.name}</span></h4>
                    <p className=''>{this.props.beerDetails.tag_line}</p>
                    <ul className='beerStatList'>
                        <li><strong>IBU:</strong>{this.props.beerDetails.ibu}</li>
                        <li><strong>ABV:</strong>{this.props.beerDetails.abv}</li>
                        <li><strong>EBC:</strong>{this.props.beerDetails.ebc}</li>
                    </ul>
                    <p className='py-1'>{this.props.beerDetails.description}</p>
                </div>
                <div className='col-12 col-md-5 py-2 py-md-0'>
                    <h5><span className='beerTips'>Brewers tips</span></h5>
                    <p>{this.props.beerDetails.brewers_tips}</p>
                </div>
                <div className='col-12 text-center p-2 beerProposition'>
                    <h5 className='col-12'>You may also like</h5>
                    {similarBeers}

                </div>
            </div>
        );
    }
    render() {
        let downloadView = <Spinner />;
        if (this.props.beerDetails.error) {
            downloadView = <p className='text-center'>No data found</p>;
        }
        else if (this.props.beerDetails.id) {
            downloadView = this.renderBeerDetails();
        }
        return (
            <div className='p-3 p-lg-5'>
                {downloadView}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    beerDetails: state.beerDetails,
    beerSimilar: state.beerSimilar
});
const mapDispatchToProps = ({
    fetchBeer,
    fetchStrongerBeer,
    fetchWeakerBeer,
    resetBeerDetails
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerDetails);