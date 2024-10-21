import { FETCH_PLACES_SUCCESS, MARK_VISITED, UNMARK_VISITED, SUGGEST_RANDOM_PLACE } from './actions';

const initialState = {
  places: [],
  visitedPlaces: [],
  randomPlace: null,
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { ...state, places: action.payload };
    case MARK_VISITED:
      return { ...state, visitedPlaces: [...state.visitedPlaces, action.payload] };
    case UNMARK_VISITED:
      return {
        ...state,
        visitedPlaces: state.visitedPlaces.filter(id => id !== action.payload),
      };
    case SUGGEST_RANDOM_PLACE:
      const randomIndex = Math.floor(Math.random() * state.places.length);
      return { ...state, randomPlace: state.places[randomIndex] };
    default:
      return state;
  }
};

export default placesReducer;
