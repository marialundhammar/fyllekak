import MapsAPI from "../services/MapsAPI";

const useGetAddress = (lat, lng) => {
  return MapsAPI.getAddress(lat, lng);
};

export default useGetAddress;
