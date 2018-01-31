import { FETCH_STRONGER_BEER, FETCH_WEAKER_BEER, RESET_BEER_DETAILS } from '../actions';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_STRONGER_BEER:
            return action.payload.data || [];
        case FETCH_WEAKER_BEER:
            return action.payload.data || [];
        case RESET_BEER_DETAILS:
            return [];
        default:
            return state;
    }
}