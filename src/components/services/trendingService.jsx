import axios from "axios";

const apiKey = "c4e316bf99731ae830fda29bac20abcd";

export const getTrendingTracksList = limit => {
  console.log("Getting trending tracks list...");

  return axios
    .get(
      "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" +
        apiKey +
        "&format=json" +
        "&limit=" +
        limit
    )
    .then(res => {
      return res.data.tracks.track;
    });
};

export const getTrendingArtistsList = limit => {
  console.log("Getting trending artists list...");

  return axios
    .get(
      "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
        apiKey +
        "&format=json" +
        "&limit=" +
        limit
    )
    .then(res => {
      return res.data.artists.artist;
    });
};
