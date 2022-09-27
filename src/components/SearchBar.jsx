import React from 'react'

const SearchBar = () => {
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("Search button clicked")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Skriv in en adress"
                onChange={() => {}}
            />
            <button>Sök</button>
        </form>
    )
}

export default SearchBar