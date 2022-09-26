import axios from "axios";

axios.defaults.baseURL = `https://maps.googleapis.com/maps/api/`;

const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API;

//just for testing now
const lat = `55.59309041799387`;
const lng = `13.01655957305921`;

//just for testing now
const address = `3+Listergatan+Malmo`;

const get = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response.data;
};

//from coords/location --> address
export const getAddress = () => {
  return get(`geocode/json?latlng=${lat},${lng}&key=${googleAPI}`);
};

//from address ---> coords
export const getCoords = () => {
  return get(`geocode/json?address=${address}&key=${googleAPI}`);
};

export default {
  getAddress,
  getCoords,
};
