import { useState } from 'react'
import useRestaurants from '../hooks/useRestaurants'

const SearchBar = ({ handleSearch }) => {
    const [search, setSearch] = useState("")
    const [display, setDisplay] = useState(false)

    const restaurantQuery = useRestaurants("restaurants")
    const restaurantNames = restaurantQuery.data.map((restaurant) => restaurant.name)
    console.log("restaurantNames ==>", restaurantNames)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!search.length) return

        // console.log("Search button clicked")
        // console.log("Search in handleSubmit ==>", search)

        handleSearch(search)
    }

    const onClickedAutocomplete = (option) => {
        // setSearch(option)
        // setDisplay(false)

        console.log("option ==>", option)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Skriv in en adress eller namn på restaurang"
                onChange={(e) => {setSearch(e.target.value)}}
                onClick={() => setDisplay(!display)}
                value={search}
            />
            <button>Sök</button>
            {display && (
                <div>
                    {restaurantNames
                        .map((name) => {
                            return (
                                <div onClick={onClickedAutocomplete(name)} key={name}>
                                    <span>{name}</span>
                                </div>
                            )
                    })}
                </div>
            )}
        </form>
    )
}

export default SearchBar