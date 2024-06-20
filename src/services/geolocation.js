import axios from 'axios';

const GEOCODE_API_URL = 'https://nominatim.openstreetmap.org/search';
const REVERSE_GEOCODE_API_URL = 'https://nominatim.openstreetmap.org/reverse';

export const geocode = (address) => {
  return axios.get(GEOCODE_API_URL, {
    params: {
      q: address,
      format: 'json'
    }
  });
};

export const reverseGeocode = (lat, lon) => {
  return axios.get(REVERSE_GEOCODE_API_URL, {
    params: {
      lat,
      lon,
      format: 'json'
    }
  });
};