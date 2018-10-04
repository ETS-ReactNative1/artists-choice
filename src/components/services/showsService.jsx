import axios from "axios";

const apiKey = "07BKHybfGuAc8fjY";

function getDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  dd < 10 ? (dd = "0" + dd) : null;
  mm < 10 ? (mm = "0" + mm) : null;

  today = yyyy + "-" + mm + "-" + dd;
  return today;
}

export const getMetroArea = () => {
  console.log("getting initial location...");
  return axios
    .get(
      "https://api.songkick.com/api/3.0/search/locations.json?location=clientip&apikey=" +
        apiKey
    )
    .then(res => {
      return res.data.resultsPage.results.location[0].metroArea;
    });
};

export const getLocationStringResults = str => {
  //console.log("getting location string results...");
  if (str.length > 0) {
    return axios
      .get(
        "https://api.songkick.com/api/3.0/search/locations.json?query=" +
          str +
          "&apikey=" +
          apiKey
      )
      .then(res => {
        return res.data.resultsPage.results.location;
      });
  }
};

export const searchByMetroAreaID = id => {
  console.log("getting shows by metro area id...");

  return axios
    .get(
      "https://api.songkick.com/api/3.0/metro_areas/" +
        id +
        "/calendar.json?apikey=" +
        apiKey +
        "&min_date=" +
        getDate()
    )
    .then(res => {
      return res.data.resultsPage.results.event;
    });
};

export const translateDate = date => {};
