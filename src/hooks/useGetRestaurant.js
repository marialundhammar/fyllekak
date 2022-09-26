import useStreamRestaurant from "./useStreamRestaurant"

const useGetRestaurant = (id) => {
    return useStreamRestaurant('restaurants', id)
}

export default useGetRestaurant
