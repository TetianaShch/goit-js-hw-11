
import axios from 'axios';

const API_KEY = '52852396-2e2f44ee304cf9c0c54250cb9';
const BASE_URL = 'https://pixabay.com/api/';

const DEFAULT_PARAMS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
};

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,          
        q: query.trim(),         
        image_type: 'photo',    
        orientation: 'horizontal',
        safesearch: true,         
        per_page: 40,             
      },
    })
    .then(res => res.data);
}


