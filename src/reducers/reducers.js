import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES  } from '../actions/actions';

//reducer function
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

//reducer function
function movies(state = [], action) {
  switch(action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached')
      return action.value;
    default:
      return state;
  }
}

//combined reducer function - original, broken down way

    /* function moviesApp(state = {}, action) {
      return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        movies: movies(state.movies, action)
      }
    } */

//updated combined reducer using combineReducers function
const moviesApp = combineReducers({
  visibilityFilter,
  movies
});

export default moviesApp;
