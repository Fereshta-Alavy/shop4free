import { GOOGLE_API_KEY } from "../config";

export async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCoordinates,
        getLocationError
      );
    } else {
      alert("Geolocation is not suported by this browser");
    }

    async function getCoordinates(position) {
      resolve(position);
    }
  });

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

export function getNearbyPlaces(latitude, longitude) {
  return new Promise((resolve, reject) => {
    console.log(latitude, longitude);
    const nearbyPlaces = [];
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
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(json => {
        const results = json.results;
        const oldPlaces = [];
        for (let i = 0; i < results.length; i++) {
          nearbyPlaces.push(results[i].name);
        }
        resolve(nearbyPlaces);
      });
  });
}
