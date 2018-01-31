import axios from 'axios';
export const FETCH_START_DATA = 'FETCH_START_DATA';
export const FETCH_MORE_DATA = 'FETCH_MORE_DATA';
export const FETCH_BEER = 'FETCH_BEER';
export const FETCH_STRONGER_BEER = 'FETCH_STRONGER_BEER';
export const FETCH_WEAKER_BEER = 'FETCH_WEAKER_BEER';
export const RESET_BEER_DETAILS = 'RESET_BEER_DETAILS';

const ROOT_URL = 'https://api.punkapi.com/v2/';

export function fetchStartData() {
    const request = axios.get(`${ROOT_URL}beers?page=1&per_page=20`);
    return {
        type: FETCH_START_DATA,
        payload: request
    }
}

export function fetchMoreData(page) {
    const request = axios.get(`${ROOT_URL}beers?page=${page}&per_page=20`);
    return {
        type: FETCH_MORE_DATA,
        payload: request
    }
}

export function fetchBeer(id) {
    const request = axios.get(`${ROOT_URL}beers/${id}`);
    return {
        type: FETCH_BEER,
        payload: request
    }
}

export function fetchStrongerBeer(ibu) {
    const request = axios.get(`${ROOT_URL}beers?ibu_gt=${ibu}&per_page=3`);
    return {
        type: FETCH_STRONGER_BEER,
        payload: request
    }
}

export function fetchWeakerBeer(ibu) {
    const request = axios.get(`${ROOT_URL}beers?ibu_lt=${ibu}&per_page=3`);
    return {
        type: FETCH_WEAKER_BEER,
        payload: request
    }
}

export function resetBeerDetails() {
    return {
        type: RESET_BEER_DETAILS,
    }
}
