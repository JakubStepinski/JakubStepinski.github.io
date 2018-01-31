import { FETCH_BEER, RESET_BEER_DETAILS } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_BEER:
            return action.payload.data ? action.payload.data[0] : { error: true };
        case RESET_BEER_DETAILS:
            return {};
        default:
            return state;
    }
}