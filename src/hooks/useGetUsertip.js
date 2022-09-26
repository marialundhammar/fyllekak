import useStreamRestaurant from "./useStreamRestaurant"

const useGetRestaurant = (id) => {
    return useStreamRestaurant('usertips', id)
}

export default useGetRestaurant
