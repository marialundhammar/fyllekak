import axios from 'axios';

axios.defaults.baseURL = `https://maps.googleapis.com/maps/api/`

const googleAPI =  import.meta.env.VITE_GOOGLE_MAP_API

const lat = `55.59309041799387`
const lng = `13.01655957305921`

const address = `Listergatan%203`



const get = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response.data;
};
 
 
export const getAddress = async () => {
  return get(`geocode/json?latlng=${lat},${lng}&key=${googleAPI}`)
}

export const getCoords = async () => {
    return get(`geocode/json?address=9+Bragegatan+Malmo&key=${googleAPI}`)
}
 
 
export default {
  getAddress,
  getCoords
};
