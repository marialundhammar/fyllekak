import { useState } from "react"

const SearchBar = ({ handleSearch, placeholder }) => {
	const [search, setSearch] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!search.length) return

		// console.log("Search button clicked")
		// console.log("Search in handleSubmit ==>", search)

		handleSearch(search)
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder={placeholder}
				onChange={(e) => {
					setSearch(e.target.value)
				}}
				value={search}
			/>
			<button>Sök</button>
		</form>
	)
}

export default SearchBar
