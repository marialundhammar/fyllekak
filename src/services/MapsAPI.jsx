import axios from "axios";

axios.defaults.baseURL = `https://maps.googleapis.com/maps/api/`;

const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API;

const get = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response.data;
};

//from address ---> coords
export const getCoords = (address) => {
  return get(`geocode/json?address=${address}&key=${googleAPI}`);
};

export const getAddress = (lat, lng) => {
  return get(`/geocode/json?latlng=${`${lat},${lng}`}&key=${googleAPI}`);
};

export default {
  getCoords,
  getAddress,
};
