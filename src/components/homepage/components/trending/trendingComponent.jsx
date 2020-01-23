import React, { Component } from "react";

import "./styles/trendingComponent.css";

import {
  getTrendingTracksList,
  getTrendingArtistsList
} from "../../../services/trendingService";

import { WOW } from "wowjs";

class TrendingComponent extends Component {
  state = {
    trendingTracks: [],
    trendingArtists: [],
    trendingTracksFirstHalf: [],
    trendingTracksSecondHalf: [],
    is768px: false
  };

  componentDidMount() {
    getTrendingTracksList(20).then(res => {
      const trendingTracksFirstHalf = [...res].splice(0, 10);
      const trendingTracksSecondHalf = [...res].splice(10, 19);
      this.setState({ trendingTracks: res }, () => {
        //console.log(this.state.trendingTracks);
      });
      this.setState({ trendingTracksFirstHalf });
      this.setState({ trendingTracksSecondHalf });
    });

    getTrendingArtistsList(8).then(res => {
      //console.log("Artists: ", res);
      this.setState({ trendingArtists: res }, () => {
        //console.log(this.state.trendingArtists);
        //Init WOW animations
        new WOW({
          live: false
        }).init();
      });
    });

    this.updateScreenWidth();
    window.addEventListener("resize", this.updateScreenWidth);
  }

  updateScreenWidth = () => {
    this.setState({ is768px: window.innerWidth > 768 });
  };

  render() {
    return (
      <div id="trending-section" className="row">
        <div id="trending-header" className="col-12 wow fadeIn">
          <img
            id="whats-trending-text"
            src={require("../../../../assets/whats_trending.svg")}
          />
        </div>
        <div id="trending-artist-section" className="row">
          {this.state.trendingArtists.map(artist => (
            <div
              key={artist.name}
              className="col-6 col-sm-3 col-xl trending-artist-image-container wow zoomIn"
              data-wow-duration="0.5s"
            >
              <a href={artist.url} target="_blank">
                <div
                  className="trending-artist-image"
                  style={{
                    backgroundImage: `url(${artist.image[2]["#text"]})`
                  }}
                >
                  <div id="trending-artist-image-overlay">
                    <div id="trending-artist-image-overlay-text">
                      {artist.name}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div id="trending-tracks-section" className="row">
          <div
            id="trending-tracks-list-left"
            className="col-12 col-md-6 trending-tracks-list"
          >
            <ul>
              <li className="row trending-tracks-list-header">
                <div className="col-2">#</div>
                <div className="col-6">TITLE</div>
                <div className="col-4">ARTIST</div>
              </li>
              {this.state.trendingTracksFirstHalf.map(track => (
                <a
                  href={track.url}
                  target="_blank"
                  key={this.state.trendingTracks.indexOf(track)}
                >
                  <li className="row">
                    <div className="col-2">
                      {this.state.trendingTracks.indexOf(track) + 1}
                    </div>
                    <div className="col-6">{track.name}</div>
                    <div className="col-4">{track.artist.name}</div>
                  </li>
                </a>
              ))}
            </ul>
          </div>
          <div
            id="trending-tracks-list-right"
            className="col-12 col-md-6  trending-tracks-list"
          >
            <ul>
              {this.state.is768px ? (
                <li className="row trending-tracks-list-header">
                  <div className="col-2">#</div>
                  <div className="col-6">TITLE</div>
                  <div className="col-4">ARTIST</div>
                </li>
              ) : null}
              {this.state.trendingTracksSecondHalf.map(track => (
                <a
                  href={track.url}
                  target="_blank"
                  key={this.state.trendingTracks.indexOf(track)}
                >
                  <li className="row">
                    <div className="col-2">
                      {this.state.trendingTracks.indexOf(track) + 1}
                    </div>
                    <div className="col-6">{track.name}</div>
                    <div className="col-4">{track.artist.name}</div>
                  </li>
                </a>
              ))}
            </ul>
          </div>
        </div>
        <div id="trending-section-footer" className="col-12">
          <div>Powered by</div>
          <a href="http://www.lastfm.com" target="_blank">
            <img
              id="lastfm-logo"
              src={require("../../../../assets/Last_fm.svg")}
            />
          </a>
        </div>
      </div>
    );
  }
}

export default TrendingComponent;
