import { FETCH_START_DATA, FETCH_MORE_DATA } from '../actions';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_START_DATA:
            return action.payload.data || state;
        case FETCH_MORE_DATA:
            return [...state, ...action.payload.data];
        default:
            return state;
    }
}