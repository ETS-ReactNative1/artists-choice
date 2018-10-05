import React, { Component } from "react";

import fire from "../../../../config/fire";

import { dbSubmitArtistDetails } from "../../../services/dbService";

import "./styles/finishSignupPageComponent.css";

import validator from "validator";

import $ from "jquery";

import { WOW } from "wowjs";

class FinishSignupPageComponent extends Component {
  state = {
    artistName: "",
    artistGenre: "",
    artistCountry: "US",
    artistZipcode: ""
  };

  componentDidMount() {
    //Init WOW animations
    new WOW({
      live: false
    }).init();
  }

  handleNameChange = e => {
    this.setState({ artistName: e.target.value }, () => {});
  };

  handleGenreChange = e => {
    this.setState({ artistGenre: e.target.value }, () => {});
  };

  handleCountryChange = e => {
    this.setState({ artistCountry: e.target.value }, () => {});
  };

  handleZipCodeChange = e => {
    this.setState({ artistZipcode: e.target.value }, () => {});
  };

  validateName(name) {
    var regex = /^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g;
    if (validator.isLength(name, { min: 2 }) && regex.test(name)) {
      $("#name-form-group").removeClass("invalid");
      return true;
    } else {
      $("#name-form-group").addClass("invalid");
    }
  }

  validateGenre(genre) {
    if ((genre === "") | (genre === "Primary Genre *")) {
      $("#genre-form-group").addClass("invalid");
      return false;
    } else {
      $("#genre-form-group").removeClass("invalid");
      return true;
    }
  }

  validateCountry(country) {
    return true;
  }

  validateZipcode(zipcode) {
    const zipcodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
    if (zipcodePattern.test(zipcode)) {
      $("#zipcode-form-group").removeClass("invalid");
      return true;
    } else {
      $("#zipcode-form-group").addClass("invalid");
      return false;
    }
  }

  continue = e => {
    e.preventDefault(); //Prevent default submit behaviour

    this.validateName(this.state.artistName) &&
    this.validateGenre(this.state.artistGenre) &&
    this.validateCountry(this.state.artistCountry) &&
    this.validateZipcode(this.state.artistZipcode)
      ? dbSubmitArtistDetails(
          fire.auth().currentUser,
          this.state.artistName,
          this.state.artistGenre,
          this.state.artistCountry,
          this.state.artistZipcode
        )
      : null;
  };

  render() {
    return (
      <div className="wow fadeIn">
        {this.props.userType === "artist" ? (
          <div id="artist-info-form-container">
            <div id="artist-info-form-inner">
              <img
                id="star-logo"
                src={require("../../../../assets/logo_star.svg")}
              />
              <h1>Artist Details</h1>
              <form className="artist-signup-form">
                <div id="name-form-group" className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="artistName"
                    placeholder="Artist or Band Name *"
                    value={this.state.artistName}
                    onChange={this.handleNameChange}
                  />
                  <div id="invalid-email-text" className="invalid-field-text">
                    Name must be at least 2 characters with no invalid symbols.
                  </div>
                </div>

                <div id="genre-form-group" className="form-group">
                  <select
                    className="form-control"
                    id="genre"
                    aria-describedby="artistGenre"
                    value={this.state.artistGenre}
                    onChange={this.handleGenreChange}
                  >
                    <option value="">Primary Genre *</option>
                    <option value="Alternative">Alternative</option>
                    <option value="Ambient">Ambient</option>
                    <option value="Americana">Americana</option>
                    <option value="Bluegrass">Bluegrass</option>
                    <option value="Blues">Blues</option>
                    <option value="Bollywood/Tollywood">
                      Bollywood/Tollywood
                    </option>
                    <option value="Celtic">Celtic</option>
                    <option value="Childrens">Childrens</option>
                    <option value="Christian Rock">Christian Rock</option>
                    <option value="Christian/Gospel">Christian/Gospel</option>
                    <option value="Classical">Classical</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Country">Country</option>
                    <option value="DJ">DJ</option>
                    <option value="Dance">Dance</option>
                    <option value="Dubstep">Dubstep</option>
                    <option value="EDM">EDM</option>
                    <option value="Electronica">Electronica</option>
                    <option value="Experimental">Experimental</option>
                    <option value="Folk">Folk</option>
                    <option value="Funk">Funk</option>
                    <option value="Grime">Grime</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="Holiday">Holiday</option>
                    <option value="House">House</option>
                    <option value="Indie">Indie</option>
                    <option value="Instrumental">Instrumental</option>
                    <option value="Jam">Jam</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Latin">Latin</option>
                    <option value="Metal">Metal</option>
                    <option value="Other">Other</option>
                    <option value="Pop">Pop</option>
                    <option value="Punk">Punk</option>
                    <option value="R&amp;B/Soul">R&amp;B/Soul</option>
                    <option value="Rap">Rap</option>
                    <option value="Reggae">Reggae</option>
                    <option value="Rock">Rock</option>
                    <option value="Rockabilly">Rockabilly</option>
                    <option value="Singer Songwriter">Singer Songwriter</option>
                    <option value="Ska">Ska</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Spoken Word">Spoken Word</option>
                    <option value="World">World</option>
                  </select>
                  <div id="invalid-genre-text" className="invalid-field-text">
                    Please select a genre.
                  </div>
                </div>
                <div id="country-form-group" className="form-group">
                  <select
                    className="form-control"
                    id="country"
                    aria-describedby="artistCountry"
                    defaultValue="US"
                    onChange={this.handleCountryChange}
                  >
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Aland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AQ">Antarctica</option>
                    <option value="AG">Antigua and Barbuda</option>
                    <option value="AR">Argentina</option>
                    <option value="AM">Armenia</option>
                    <option value="AW">Aruba</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BD">Bangladesh</option>
                    <option value="BB">Barbados</option>
                    <option value="BY">Belarus</option>
                    <option value="BE">Belgium</option>
                    <option value="BZ">Belize</option>
                    <option value="BJ">Benin</option>
                    <option value="BM">Bermuda</option>
                    <option value="BT">Bhutan</option>
                    <option value="BO">Bolivia</option>
                    <option value="BQ">Bonaire/Sint Eust...</option>
                    <option value="BA">Bosnia and Herzeg...</option>
                    <option value="BW">Botswana</option>
                    <option value="BV">Bouvet Island</option>
                    <option value="BR">Brazil</option>
                    <option value="BN">Brunei Darussalam</option>
                    <option value="BG">Bulgaria</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="BI">Burundi</option>
                    <option value="KH">Cambodia</option>
                    <option value="CM">Cameroon</option>
                    <option value="CA">Canada</option>
                    <option value="CV">Cape Verde</option>
                    <option value="KY">Cayman Islands</option>
                    <option value="CF">Central African R...</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CX">Christmas Island</option>
                    <option value="CC">Cocos Islands</option>
                    <option value="CO">Colombia</option>
                    <option value="KM">Comoros</option>
                    <option value="CG">Congo</option>
                    <option value="CD">Congo, the Democr...</option>
                    <option value="CK">Cook Islands</option>
                    <option value="CR">Costa Rica</option>
                    <option value="CI">Cote D&#39;Ivoire</option>
                    <option value="HR">Croatia</option>
                    <option value="CU">Cuba</option>
                    <option value="CW">Curacao</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="DK">Denmark</option>
                    <option value="DJ">Djibouti</option>
                    <option value="DM">Dominica</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EG">Egypt</option>
                    <option value="SV">El Salvador</option>
                    <option value="GQ">Equatorial Guinea</option>
                    <option value="ER">Eritrea</option>
                    <option value="EE">Estonia</option>
                    <option value="ET">Ethiopia</option>
                    <option value="FK">Falkland Islands ...</option>
                    <option value="FO">Faroe Islands</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GF">French Guiana</option>
                    <option value="PF">French Polynesia</option>
                    <option value="GA">Gabon</option>
                    <option value="GM">Gambia</option>
                    <option value="GE">Georgia</option>
                    <option value="DE">Germany</option>
                    <option value="GH">Ghana</option>
                    <option value="GI">Gibraltar</option>
                    <option value="GR">Greece</option>
                    <option value="GL">Greenland</option>
                    <option value="GD">Grenada</option>
                    <option value="GP">Guadeloupe</option>
                    <option value="GU">Guam</option>
                    <option value="GT">Guatemala</option>
                    <option value="GG">Guernsey</option>
                    <option value="GN">Guinea</option>
                    <option value="GW">Guinea-Bissau</option>
                    <option value="GY">Guyana</option>
                    <option value="HT">Haiti</option>
                    <option value="VA">Holy See (Vatican...</option>
                    <option value="HN">Honduras</option>
                    <option value="HK">Hong Kong</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="ID">Indonesia</option>
                    <option value="IR">Iran, Islamic Rep...</option>
                    <option value="IQ">Iraq</option>
                    <option value="IE">Ireland</option>
                    <option value="IM">Isle of Man</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="JE">Jersey</option>
                    <option value="JO">Jordan</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="KE">Kenya</option>
                    <option value="KI">Kiribati</option>
                    <option value="KP">Korea, Democratic...</option>
                    <option value="KR">Korea, Republic of</option>
                    <option value="KW">Kuwait</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="LA">Lao People&#39;s Demo...</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LS">Lesotho</option>
                    <option value="LR">Liberia</option>
                    <option value="LY">Libyan Arab Jamah...</option>
                    <option value="LI">Liechtenstein</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MO">Macao</option>
                    <option value="MK">Macedonia, the Fo...</option>
                    <option value="MG">Madagascar</option>
                    <option value="MW">Malawi</option>
                    <option value="MY">Malaysia</option>
                    <option value="MV">Maldives</option>
                    <option value="ML">Mali</option>
                    <option value="MT">Malta</option>
                    <option value="MH">Marshall Islands</option>
                    <option value="MQ">Martinique</option>
                    <option value="MR">Mauritania</option>
                    <option value="MU">Mauritius</option>
                    <option value="MX">Mexico</option>
                    <option value="FM">Micronesia, Feder...</option>
                    <option value="MD">Moldova, Republic of</option>
                    <option value="MC">Monaco</option>
                    <option value="MN">Mongolia</option>
                    <option value="ME">Montenegro</option>
                    <option value="MS">Montserrat</option>
                    <option value="MA">Morocco</option>
                    <option value="MZ">Mozambique</option>
                    <option value="MM">Myanmar</option>
                    <option value="NA">Namibia</option>
                    <option value="NR">Nauru</option>
                    <option value="NP">Nepal</option>
                    <option value="NL">Netherlands</option>
                    <option value="NC">New Caledonia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="NI">Nicaragua</option>
                    <option value="NE">Niger</option>
                    <option value="NG">Nigeria</option>
                    <option value="NU">Niue</option>
                    <option value="NF">Norfolk Island</option>
                    <option value="MP">Northern Mariana ...</option>
                    <option value="NO">Norway</option>
                    <option value="OM">Oman</option>
                    <option value="PK">Pakistan</option>
                    <option value="PW">Palau</option>
                    <option value="PS">Palestinian Terri...</option>
                    <option value="PA">Panama</option>
                    <option value="PG">Papua New Guinea</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Peru</option>
                    <option value="PH">Philippines</option>
                    <option value="PN">Pitcairn</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="QA">Qatar</option>
                    <option value="RE">Reunion</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russian Federation</option>
                    <option value="RW">Rwanda</option>
                    <option value="BL">Saint Barthelemy</option>
                    <option value="SH">Saint Helena</option>
                    <option value="KN">Saint Kitts and N...</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="MF">Saint Martin</option>
                    <option value="PM">Saint Pierre and ...</option>
                    <option value="VC">Saint Vincent and...</option>
                    <option value="WS">Samoa</option>
                    <option value="SM">San Marino</option>
                    <option value="ST">Sao Tome and Prin...</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="SN">Senegal</option>
                    <option value="RS">Serbia</option>
                    <option value="SC">Seychelles</option>
                    <option value="SL">Sierra Leone</option>
                    <option value="SG">Singapore</option>
                    <option value="SX">Sint Maarten</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="SB">Solomon Islands</option>
                    <option value="SO">Somalia</option>
                    <option value="ZA">South Africa</option>
                    <option value="GS">South Georgia/Sou...</option>
                    <option value="SS">South Sudan</option>
                    <option value="ES">Spain</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="SD">Sudan</option>
                    <option value="SR">Suriname</option>
                    <option value="SJ">Svalbard and Jan ...</option>
                    <option value="SZ">Swaziland</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="SY">Syrian Arab Republic</option>
                    <option value="TW">Taiwan, Province ...</option>
                    <option value="TJ">Tajikistan</option>
                    <option value="TZ">Tanzania, United ...</option>
                    <option value="TH">Thailand</option>
                    <option value="TL">Timor-Leste</option>
                    <option value="TG">Togo</option>
                    <option value="TK">Tokelau</option>
                    <option value="TO">Tonga</option>
                    <option value="TT">Trinidad and Tobago</option>
                    <option value="TN">Tunisia</option>
                    <option value="TR">Turkey</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="TC">Turks and Caicos ...</option>
                    <option value="TV">Tuvalu</option>
                    <option value="UG">Uganda</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="UK">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="UY">Uruguay</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="VU">Vanuatu</option>
                    <option value="VE">Venezuela</option>
                    <option value="VN">Viet Nam</option>
                    <option value="VG">Virgin Islands, B...</option>
                    <option value="VI">Virgin Islands, U.S.</option>
                    <option value="WF">Wallis and Futuna</option>
                    <option value="EH">Western Sahara</option>
                    <option value="YE">Yemen</option>
                    <option value="ZM">Zambia</option>
                    <option value="ZW">Zimbabwe</option>
                  </select>
                  <div id="invalid-country-text" className="invalid-field-text">
                    Please select a country.
                  </div>
                </div>
                <div id="zipcode-form-group" className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="zipcode"
                    aria-describedby="zipCode"
                    placeholder="ZIP/Postalcode *"
                    value={this.state.artistZipcode}
                    onChange={this.handleZipCodeChange}
                  />
                  <div id="invalid-zipcode-text" className="invalid-field-text">
                    Invalid zip/postalcode.
                  </div>
                </div>
                <button
                  id="signup-button"
                  className="btn btn-primary"
                  onClick={this.continue}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        ) : this.props.userType === "fan" ? (
          <div />
        ) : (
          <div id="placeholder">
            <img
              id="loading-blips"
              src={require("../../../../assets/loading-blips.gif")}
            />
          </div>
        )}
      </div>
    );
  }
}

export default FinishSignupPageComponent;
