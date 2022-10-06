import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete"
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
	ComboboxOptionText,
} from "@reach/combobox"
import "@reach/combobox/styles.css"

const SearchBarTest = ({ setMapCenter }) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete()

	const handleSelect = async (address) => {
		setValue(address, false)
		clearSuggestions()

		const result = await getGeocode({ address })
		const latLng = await getLatLng(result[0])
		setMapCenter(latLng)
	}

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				className="text-darkish-blue rounded p-1 w-full"
				value={value}
				placeholder="Sök ort"
				onChange={(e) => {
					setValue(e.target.value)
				}}
				disabled={!ready}
			></ComboboxInput>
			<ComboboxPopover>
				<ComboboxList>
					{status === "OK" &&
						data.map(({ place_id, description }) => (
							<ComboboxOption
								key={place_id}
								value={description}
							/>
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	)
}

export default SearchBarTest
