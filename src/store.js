// src/store.js
import { createStore } from 'redux';

const initialState = {
  movies: [],
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const store = createStore(movieReducer);
export default store;
