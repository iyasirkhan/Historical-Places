import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { FETCH_PLACES, fetchPlacesSuccess } from './actions';

// Mock data for historical places
const places = [
  { id: 1, name: 'Great Wall of China', description: 'Ancient wall in China', image: 'wall.jpg' },
  { id: 2, name: 'Mohen jo darro', description: 'Ancient pyramids in Mohen jo darro', image: 'pyramids.jpg' },
  // Add more places here...
];

const fetchPlacesEpic = action$ =>
  action$.pipe(
    ofType(FETCH_PLACES),
    map(() => fetchPlacesSuccess(places))
  );

export default fetchPlacesEpic;
