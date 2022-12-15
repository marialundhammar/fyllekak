import { useCallback } from "react";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import isolateCityName from "../helpers/cityName";

const SearchBarTest = ({ setMapCenter, onCityChange, setSearchParams }) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete();

	const handleSelect = async (address) => {
		handleCityChange(isolateCityName(address));
		setValue(address, false);
		setSearchParams({ address: address })
		clearSuggestions();

		const result = await getGeocode({ address });
		console.log("this is result", result);
		const latLng = await getLatLng(result[0]);
		setMapCenter(latLng);
	};

	const handleCityChange = useCallback(
		(city) => {
			onCityChange(city);
		},
		[onCityChange]
	);

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				className="text-darkish-blue rounded p-1 w-full"
				value={value}
				placeholder="Sök ort"
				onChange={(e) => {
					setValue(e.target.value);
				}}
				disabled={!ready}
			></ComboboxInput>
			<ComboboxPopover>
				<ComboboxList>
					{status === "OK" &&
						data.map(({ place_id, description }) => (
							<ComboboxOption key={place_id} value={description} />
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
};

export default SearchBarTest;
