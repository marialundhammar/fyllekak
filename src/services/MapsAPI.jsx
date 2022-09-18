
import axios from 'axios';


axios.defaults.baseURL = `https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=`

const API_KEY = import.meta.env.VITE_API_KEY


const get = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response.data;
};
 
 
export const getMap = () => {
  return get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=55.59309041799387,13.01655957305921&key=AIzaSyB2xmpbYfKI9OKjimyjkTNXLo0RPZ4yNv0`)
}
 
 
export default {
  getMap,
};
