import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import beerDetailsReducer from './detailsReducer';
import dataSimilarReducer from './dataSimilarReducer';

const rootReducer = combineReducers({
  beerData: dataReducer,
  beerDetails: beerDetailsReducer,
  beerSimilar: dataSimilarReducer
});

export default rootReducer;
