import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query } from "@firebase/firestore";
import { db } from "../firebase";

const useRestaurants = () => {
  const resRef = collection(db, "restaurants");

  const queryRef = query(resRef);

  const resQuery = useFirestoreQueryData(["restaurants"], queryRef, {
    idField: "id",
    subscribe: true,
  });

  return resQuery;
};

export default useRestaurants;
