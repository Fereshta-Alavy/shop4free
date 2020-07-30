import React, { useState, useEffect } from "react";
import { GOOGLE_API_KEY } from "../config";
import google from "google-maps-react";

function GetLocation() {
  const [latitude, setlatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [publicPlaces, setPublicPlaces] = useState([]);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoordinates, getLocationError);
  } else {
    alert("Geolocation is not suported by this browser");
  }

  async function getCoordinates(position) {
    await setlatitude(position.coords.latitude);
    await setlongitude(position.coords.longitude);
  }

  function getNearbyPlaces() {
    const lat = latitude;
    const lon = longitude;
    const output = "json";
    const type = "store";
    const radius = 5000;
    const key = GOOGLE_API_KEY;
    const param =
      "radius=" +
      radius +
      "&location=" +
      lat +
      "," +
      lon +
      "&key=" +
      key +
      "&type=" +
      type;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/" +
      output +
      "?" +
      param;
    console.log(url);
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const results = json.results;
        for (let i = 0; i < results.length; i++) {
          const oldPlaces = publicPlaces;
          oldPlaces.push(results[i].place_id + " - " + results[i].name);
          setPublicPlaces([...oldPlaces]);
        }
      });
    console.log(publicPlaces);
  }
  return (
    <div>
      <button onClick={getNearbyPlaces}>places</button>
    </div>
  );

  function getLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
}

export default GetLocation;
