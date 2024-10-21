export const FETCH_PLACES = 'FETCH_PLACES';
export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const MARK_VISITED = 'MARK_VISITED';
export const UNMARK_VISITED = 'UNMARK_VISITED';
export const SUGGEST_RANDOM_PLACE = 'SUGGEST_RANDOM_PLACE';

export const fetchPlaces = () => ({ type: FETCH_PLACES });
export const fetchPlacesSuccess = (places) => ({ type: FETCH_PLACES_SUCCESS, payload: places });
export const markVisited = (id) => ({ type: MARK_VISITED, payload: id });
export const unmarkVisited = (id) => ({ type: UNMARK_VISITED, payload: id });
export const suggestRandomPlace = () => ({ type: SUGGEST_RANDOM_PLACE });
