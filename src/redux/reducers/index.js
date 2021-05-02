import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import filters from './filters';
import metalDetectors from './metalDetectors';
import cart from './cart';


const rootReducer = combineReducers({
  filters,
  metalDetectors,
  cart,
  form: formReducer
});

export default rootReducer;
