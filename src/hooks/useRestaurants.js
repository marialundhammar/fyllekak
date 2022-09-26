import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query } from "@firebase/firestore";
import { db } from "../firebase";

const useRestaurants = (col, id) => {
  const resRef = collection(db, col);

  const queryRef = query(resRef);

  const resQuery = useFirestoreQueryData([col], queryRef, {
    idField: "id",
    subscribe: true,
  });

  return resQuery;
};

export default useRestaurants;
