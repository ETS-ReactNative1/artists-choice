import React, { Component } from "react";

import "./styles/footerComponent.css";

class FooterComponent extends Component {
  state = {};
  render() {
    return (
      <div id="footer-section" className="row">
        <div className="col-4 col-lg footer-links-list">
          <div id="footer-links-list-header">Artist's Choice</div>
          <ul>
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>Help</li>
            <li>Forgot Password</li>
          </ul>
        </div>
        <div className="col-4 col-lg footer-links-list">
          <div id="footer-links-list-header">For Artists</div>
          <ul>
            <li>Overview</li>
            <li>Feature Index</li>
            <li>Opportunity Submissions</li>
            <li>Crowd Reviews</li>
            <li>Gig Finder</li>
          </ul>
        </div>
        <div className="col-4 col-lg footer-links-list">
          <div id="footer-links-list-header">Policies</div>
          <ul>
            <li>Terms &#38; Conditions</li>
            <li>Privacy</li>
            <li>Copyright</li>
            <li>Trademark</li>
            <li>Legal</li>
          </ul>
        </div>
        <div id="footer-bottom" className="col-12">
          <div id="footer-copyright-text">&copy; 2018 Artist's Choice</div>
          <div id="footer-disclaimer-text">
            All third party trademarks are the property of the respective
            trademark owners. Artist's Choice is not affiliated with those
            trademark owners.
          </div>
        </div>
      </div>
    );
  }
}

export default FooterComponent;
