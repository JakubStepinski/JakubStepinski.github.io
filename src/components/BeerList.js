import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStartData, fetchMoreData } from '../actions';
import BeerCard from './BeerCard';
import Spinner from './spinner';

class BeerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            downloading: false,
            fullList: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        if (!this.props.beerData.length) {
            this.props.fetchStartData();
            this.setState({
                downloading: true
            });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    componentWillReceiveProps(nextProps) {
        nextProps.beerData.length && this.setState({
            downloading: false,
            fullList: (nextProps.beerData.length && nextProps.beerData.length === this.props.beerData.length) && true
        })
    }
    handleScroll(e) {
        const doc = document.documentElement;
        const offset = doc.scrollTop + window.innerHeight;
        const height = doc.offsetHeight;
        if (offset >= height && !this.state.downloading && !this.state.fullList) {
            this.props.fetchMoreData(Math.ceil(this.props.beerData.length / 20) + 1);
            this.setState({
                downloading: true
            });
        }
    }
    render() {
        const beerViewList = this.props.beerData.map(beer => <BeerCard key={beer.id} data={beer} />);
        const endOfTheLine = <div className='fullList col-12' >No more Data!</div>;
        return (
            <div className='cardContainer p-3 p-lg-5'>
                {beerViewList}
                <Spinner hidden={!this.state.downloading} />
                {this.state.fullList ? endOfTheLine : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    beerData: state.beerData
});
const mapDispatchToProps = ({
    fetchStartData,
    fetchMoreData
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerList);
