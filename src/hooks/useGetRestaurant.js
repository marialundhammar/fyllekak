import { collection } from "firebase/firestore"
import useStreamRestaurant from "./useStreamRestaurant"

const useGetRestaurant = (collection, id) => {
    return useStreamRestaurant(collection, id)
}

export default useGetRestaurant
