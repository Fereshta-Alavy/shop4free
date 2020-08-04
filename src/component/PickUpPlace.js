import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default function PickUpPlace({ setCoordinates, setAddress, address }) {
  // const [address, setAddress] = useState("");
  // const [coordinates, setCoordinates] = useState({
  //   lat: null,
  //   lng: null
  // });
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    // console.log("address", value);
    setCoordinates(latLng);
  };

  return (
    <div className="canvas">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}

            <input
              {...getInputProps({
                placeholder: "Search Places...",
                className: "location-search-input"
              })}
            />

            <div className="autoComplete_dropdown_container">
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = suggestion.active
                  ? { backgroundColor: "#41b6e6", cursor: "pointer" }
                  : { backgroundColor: "#fff", cursor: "pointer" };
                return (
                  <div
                    className="input-suggestions"
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    <i class="material-icons">location_on</i>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
