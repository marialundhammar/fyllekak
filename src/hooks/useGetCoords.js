import MapsAPI from "../services/MapsAPI";

const useGetCoords = (address) => {
  return MapsAPI.getCoords(address);
};

export default useGetCoords;
