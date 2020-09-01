import React, { Component } from "react";
import "./styles/main.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isEmpty, merge, includes, forIn, uniq } from "lodash";
import {
  Row,
  Col,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import Slider, { createSliderWithTooltip } from "rc-slider";
import {
  fetchDashboardLocation,
  fetchClearLocation,
  fetchDashboardSubLocation,
  fetchClearHeatMap,
} from "../actions/googleActions";
import CartSection from "./cart_section";
import MapContainer from "./map";
import "rc-slider/assets/index.css";
import { CSVLink } from "react-csv";

var dataInfo = [];
var dataInfoDefault = [];
var dataInfoEmpty = [];

const Range = createSliderWithTooltip(Slider.Range);

@connect((store) => {
  return {
    locations: store.location_info.locations,
    markerPosition: store.location_info.markerPosition,
    heatmap: store.location_info.heatmap,
    fetching: store.location_info.fetching,
  };
})
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: "",
      currentInfo: dataInfo,
      hideRadius: true,
      timeScale: [10, 11],
      finalList: [],

      phong_test: 1,

      markerPosition: this.props.markerPosition,
    };


    this._handleChangeText = this._handleChangeText.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
    this._handleEstimate = this._handleEstimate.bind(this);
    this._handleSelected = this._handleSelected.bind(this);
    this._handleToCart = this._handleToCart.bind(this);
    this._handleDeleteColumn = this._handleDeleteColumn.bind(this);
    this._handleBackToInfo = this._handleBackToInfo.bind(this);
    this._handleChangeData = this._handleChangeData.bind(this);
    this._handleChangeTime = this._handleChangeTime.bind(this);
  }

  // -----------------------------------------------------------
  
  UNSAFE_componentWillMount() {
    console.log("------------------componentWillMount------------------")
    this._handleChangeData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("------------------componentWillReceiveProps------------------")
    this.setState({ markerPosition: nextProps.markerPosition });
  }

  componentWillUpdate(){
    console.log("------------------componentWIll Update------------------")
  }


  componentDidMount(){
    console.log("------------------componentDidMount------------------")
    console.log(this.state.phong_test)
  }

  // shouldComponentUpdate(){
  //   console.log("------------------shouldComponentUpdate------------------")
  //   return true
  // }

  

  componentDidUpdate(){
    console.log("------------------componentDidUpdate------------------")
    
  }

  // 17.x -> rename, should add UNSAFE -> UNSAFE_componentWillMount, UNSAFE_componentWillReceiveProps, and UNSAFE_componentWillUpdate

  // -----------------------------------------------------------

  // involked is invoked right before calling the render method 
  // If you want to re-compute some data only when a prop changes, use a memoization helper instead.
  static getDerivedStateFromProps(props, state) { 
    // can update state
    console.log("------------------getDerivedStateFromProps------------------")
    console.log(props)
    // return state or null
    // console.log(state.prevsearchFilter)
    // console.log(state.searchFilter)
    if(state.prevsearchFilter !== state.searchFilter){
     return {
        prevsearchFilter: state.searchFilter,
      }
    }

    return{
      phong_test: state.phong_test + 1 // update state with this
    }


  }  


  componentWillUnmount(){
    console.log("------------------componentWillUnmount------------------")
  }
























  _titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  _mergeState(v) {
    this.setState({ markerPosition: _.merge(this.state.markerPosition, v) });
    this._handleChangeData();
    if (this.props.heatmap.length > 1) {
      this.props.fetchClearHeatMap();
    }
  }

  _IAPCategory() {
    const listIAP = [
      "Arts & Entertainment",
      "Automotive",
      "Business",
      "Careers",
      "Education",
      "Family & Parenting",
      "Health & Fitness",
      "Food & Drink",
      "Hobbies & Interests",
      "Home & Garden",
      "Style & Fashion",
      "Technology & Computing",
      "Travel",
      "Real Estate",
      "Shopping",
    ];
    return this._randomName(listIAP, 4);
  }

  _IAPCategory() {
    const listIAP = [
      "Arts & Entertainment",
      "Automotive",
      "Business",
      "Careers",
      "Education",
      "Family & Parenting",
      "Health & Fitness",
      "Food & Drink",
      "Hobbies & Interests",
      "Home & Garden",
      "Style & Fashion",
      "Technology & Computing",
      "Travel",
      "Real Estate",
      "Shopping",
      "Reading",
      "Celebrity News",
      "Comedy",
      "Movies",
      "Music",
      "Car",
      "Professionals",
      "Learning",
      "Exercise",
      "Dining",
      "Social Activities",
      "Drawing",
      "Board games/Puzzles",
      "Card Games",
      "Comics",
      "Guitar",
      "Photography",
      "Roleplaying Games",
      "Video & Computer games",
      "Home & Garden",
      "Home Entertainment",
      "Legal Services",
      "Business, Finance and Politics",
      "Local News",
      "Personal Finance",
      "Investment",
      "Bocial Lifestyle",
      "Dating",
      "Gay Life",
      "Science",
      "Weather Forecast",
      "Sport Activities",
      "Fashion Styles",
      "Technology & Computing",
      "Videos",
      "Online Entertainment",
      "Travel",
      "Adventure",
    ];
    return this._randomNameCategory(listIAP, 5);
  }
  _ageGroup() {
    const listIAP = ["16-24", "25-34", "35-44", "45-54", "55-64"];
    let age_1 = Math.floor(Math.random() * 20 + 10);
    let age_3 = Math.floor(Math.random() * 20 + 5);
    let age_4 =Math.floor(Math.random() * 20 + 10);
    let age_5 =Math.floor(Math.random() * 20 + 5);
    let age_2 = 100 - age_1 -age_3 - age_4  - age_5
    return "16-24"+ " (" +age_1 +"%), " +"25-34" + " (" +age_2 +"%), " + "35-44" + " (" +age_3 +"%),  "+  "45-54"+" (" +age_4 +"%), "+ "55-64"+" (" +age_5 +"%)"
  }

  _ReleAuSegment() {
    const listIAP = [
      "Art & Entertainment",
      "Automotive",
      "Business",
      "Business, Finance & Politics",
      "Education",
      "Food & Drink",
      "Health & Fitness",
      "Home & Garden",
      "Law, Government & Politics",
      "Personal Finance",
      "Relevant_audience_segment",
      "Science",
      "Science / Satural events",
      "Shopping",
      "Social activities",
      "Social Lifestyle",
      "Sports",
      "Style & Fashion",
      "Technology & Computing",
      "Travel",
    ];

    return this._randomNameCategory(listIAP, 5);
  }

  _randomName(list_elements, count) {
    let result = [];
    let x = Math.floor(Math.random() * count + 1);

    for (var i = 0; i < x; i++) {
      let iap_number = Math.floor(Math.random() * (list_elements.length - 1));
      result.push(list_elements[iap_number]);
    }

    return _.uniq(result).join(", ");
  }
  _randomNameCategory(list_elements, count) {
    let result = [];
    for (var i = 0; i < count; i++) {
      let precent = Math.floor(Math.random() * 20 + 5) + "%";
      let iap_number = Math.floor(Math.random() * (list_elements.length - 1));
      result.push(list_elements[iap_number] + '('+precent+ ')');
      list_elements.splice(iap_number,1)
    }

    return _.uniq(result).join(", ");
  }

  _randomPercentage(min = 10, max = 80) {
    return Math.floor(Math.random() * max + min) + "%";
  }

  _randomPercentGender(min = 10, max = 80) {
    let per = Math.floor(Math.random() * max + min);
    return "Male: " + per + "%" + ", " + "Female: " + (100 - per) + "%";
  }

  _handleChangeText(text) {
    this.setState({ searchFilter: text });
  }

  _handleSearch() {
    this.props.fetchDashboardLocation(this.state.searchFilter);
  }

  _handleEstimate() {
    // if (_.isEmpty(this.props.heatmap))
    let promises = []
    promises.push(this.props.fetchDashboardSubLocation(this.state.markerPosition));

    Promise.all(promises)
      .then((results) => {
        console.log("All done");
      })
      .catch((e) => {
        console.log(e)
      });
  }

  _handleChangeTime(timeScale) {
    this.setState({ timeScale });
    this._handleChangeData();
  }

  _handleChangeData(name = null, type = null) {
    const { markerPosition, timeScale } = this.state;
    var location_name = _.isEmpty(name) ? this.state.searchFilter : name;
    var point_type = _.isEmpty(type) ? this.state.searchFilter : type;
    var first_t =
      timeScale[0] < 13 ? timeScale[0] + "am" : timeScale[0] - 12 + "pm";
    var second_t =
      timeScale[1] < 13 ? timeScale[1] + "am" : timeScale[1] - 12 + "pm";

    dataInfo = [
      {
        key: 1,
        featureType: "Location Name",
        value: location_name,
      },
      {
        key: 9,
        featureType: "Latitude",
        value: markerPosition.lat,
      },
      {
        key: 10,
        featureType: "Longtitude",
        value: markerPosition.lng,
      },
      {
        key: 11,
        featureType: "Radius",
        value: markerPosition.radius + " m"
      },
      {
        key: 2,
        featureType: "Time Frame",
        value: first_t + " - " + second_t,
      },
      {
        key: 3,
        featureType: "Population",
        value:
          (((2000 * markerPosition.radius) / 100) *
          (timeScale[1] - timeScale[0]) *
          0.1) +" Unique Devices"
      },
      {
        key: 4,
        featureType: "Point of Interest",
        value: point_type,
      },
      {
        key: 5,
        featureType: "Gender Breakdown",
        value: this._randomPercentGender(),
      },
      {
        key: 6,
        featureType: "Age Group Breakdown",
        value:this._ageGroup()
      },
      {
        key: 7,
        featureType: "Key Behaviors",
        value: this._IAPCategory(),
      },
      {
        key: 8,
        featureType: "Relevant Audience Segments",
        value: this._ReleAuSegment(),
      },
    ];
    dataInfoDefault = [
      {
        key: 1,
        featureType: "Location Name",
        value: location_name,
      },
      {
        key: 9,
        featureType: "Latitude",
        value: markerPosition.lat,
      },
      {
        key: 10,
        featureType: "Longtitude",
        value: markerPosition.lng,
      },
      {
        key: 11,
        featureType: "Radius",
        value: markerPosition.radius + " m"
      },
      {
        key: 2,
        featureType: "Time Frame",
        value: first_t + " - " + second_t,
      },
      {
        key: 3,
        featureType: "Population",
        value:
          ((2000 * markerPosition.radius) / 100) *
          (timeScale[1] - timeScale[0]) *
          0.1 +" Unique Devices"
      },
      {
        key: 4,
        featureType: "Point of Interest",
        value: point_type,
      },
      {
        key: 5,
        featureType: "Gender Breakdown",
        value: "",
      },
      {
        key: 6,
        featureType: "Age Group Breakdown",
        value: "",
      },
      {
        key: 7,
        featureType: "Key Behaviors",
        value: "",
      },
      {
        key: 8,
        featureType: "Relevant Audience Segments",
        value: "",
      },
    ];
    dataInfoEmpty = [
      {
        key: 1,
        featureType: "Location Name",
        value: location_name,
      },
      {
        key: 9,
        featureType: "Latitude",
        value: '',
      },
      {
        key: 10,
        featureType: "Longtitude",
        value: '',
      },
      {
        key: 11,
        featureType: "Radius",
        value: markerPosition.radius + " m"
      },
      {
        key: 2,
        featureType: "Time Frame",
        value: first_t + " - " + second_t,
      },
      {
        key: 3,
        featureType: "Population",
        value:
          ((2000 * markerPosition.radius) / 100) *
          (timeScale[1] - timeScale[0]) *
          0.1 +" Unique Devices"
      },
      {
        key: 4,
        featureType: "Point of Interest",
        value: point_type,
      },
      {
        key: 5,
        featureType: "Gender Breakdown",
        value: "",
      },
      {
        key: 6,
        featureType: "Age Group Breakdown",
        value: "",
      },
      {
        key: 7,
        featureType: "Key Behaviors",
        value: "",
      },
      {
        key: 8,
        featureType: "Relevant Audience Segments",
        value: "",
      },
    ];
    if (this.state.markerPosition.radius == 0 && this.state.searchFilter == "")
      this.setState({
        hideRadius: true,
        currentInfo: dataInfoEmpty
      });
    else if (this.state.markerPosition.radius == 0 && this.state.searchFilter != "")
      this.setState({
        hideRadius: false,
        currentInfo: dataInfoDefault
      });
    else if  (this.state.markerPosition.radius != 0 && this.state.searchFilter == "")
      this.setState({
        hideRadius: false,
        currentInfo: dataInfoEmpty
      });
    else
      this.setState({
        hideRadius: false,
        currentInfo: dataInfo
      });
    // this.setState({
    //   currentInfo:
    //     (this.state.markerPosition.radius == 0 || this.state.searchFilter == "") ? dataInfoDefault : dataInfo,
    // });
  }

  _handleSelected(index) {
    const { locations } = this.props;
    const { markerPosition } = this.state;

    this.setState({ searchFilter: locations[index].formatted_address });
    this.setState({
      markerPosition: _.merge(
        this.state.markerPosition,
        locations[index].geometry.location
      ),
    });
    this.setState({ hideRadius: false });
    this._handleChangeData(
      locations[index].name + ", " + locations[index].formatted_address,
      this._titleCase(locations[index].types.join(", ").replace(/_/g, " "))
    );
    this.props.fetchClearLocation();
    this.props.fetchClearHeatMap();
  }

  _handleToCart() {
    var title = this.state.currentInfo.map((item) => item.featureType);
    var vau = this.state.currentInfo.map((item) => item.value);
    var item = {};

    if (!_.includes({ title }, "Location Name")) {
      item["Location Name"] = "";
    }

    title.forEach((til, i) => (item[til] = vau[i]));
    this.setState({ finalList: [item, ...this.state.finalList] });
    this.setState({ hideRadius: true });
  }

  _handleDeleteColumn(index) {
    this.setState({
      finalList: this.state.finalList.filter((_, i) => i !== index),
    });
  }

  _handleBackToInfo(index) {
    let info = [];
    let pointer = {};
    _.forIn(this.state.finalList[index], function(value, key) {
      info.push({ featureType: key, value: value });
      if (key == "Latitude" || key == "Longtitude" || key == "Radius") {
        if (key == "Latitude") key = "lat";
        if (key == "Longtitude") key = "lng";
        if (key == "Radius") key = "radius";
        pointer[key] = value;
      }
    });

    this._mergeState(pointer);
    this.setState({ currentInfo: info });
  }

  analyseBox() {
    return (
      <div className="analyse-frame br10">
        <div className="analyse-header">
          <h2 className="bd-b">Location's Info</h2>
        </div>
        <div className="analyse-body">{this.locationInfo()}</div>
        <div className="analyse-footer bd-t">{this.addToCartButton()}</div>
      </div>
    );
  }

  displayMap() {
    const { markerPosition, finalList } = this.state;
    return (
      <div className="map-frame br10">
        {this.props.fetching && (
          <div className="loading-container">
            <div className="loading-content"></div>
          </div>
        )}
        <div className="mapbox">
          <span
            className="btn-estimate"
            onClick={(e) => this._handleEstimate(e.target.value)}
          ></span>
          <MapContainer
            onChangeLocation={this._mergeState.bind(this)}
            location={markerPosition}
            marker_list={finalList}
            heatmap={this.props.heatmap}
            hideMarker= {!this.state.hideRadius}
            isMarkerShown={true}
          />
          {this.timeSlider()}
          {this.radiusSlider()}
        </div>
      </div>
    );
  }

  radiusSlider() {
    const { radius } = this.state.markerPosition;

    if (this.state.hideRadius)
      return (
        <h3 className="center-red mt40">Please choose another location</h3>
      );

    return (
      <div>
        <h3 className="center">Radius: {radius} M</h3>
        <div className="map-radius">
          <Slider
            step={100}
            defaultValue={0}
            max={5000}
            onChange={(value) => this._mergeState({ radius: value })}
            trackStyle={{ backgroundColor: "#EB2F2D", height: 1 }}
            handleStyle={{
              backgroundColor: "#EB2F2D",
            }}
          />
        </div>
      </div>
    );
  }

  timeSlider() {
    const { timeScale } = this.state;
    var first_t =
      timeScale[0] < 13 ? timeScale[0] + "am" : timeScale[0] - 12 + "pm";
    var second_t =
      timeScale[1] < 13 ? timeScale[1] + "am" : timeScale[1] - 12 + "pm";

    return (
      <div>
        <h3 className="center">
          {first_t} - {second_t}
        </h3>
        <Range
          dots
          min={1}
          max={24}
          pushable={1}
          onChange={this._handleChangeTime}
          value={timeScale}
          allowCross={false}
        />
      </div>
    );
  }

  addToCartButton() {
    return (
      <Button
        className="add-to-cart-button"
        bsStyle="danger"
        onClick={() => this._handleToCart()}
      >
        Add To Cart
      </Button>
    );
  }

  locationInfo() {
    return (
      <div>
        {this.state.currentInfo.map((location, index) =>
          this._renderLocationRow(location, index)
        )}
      </div>
    );
  }

  _renderLocationRow(location, index) {
    return (
      <p>
        <b>{location.featureType}:</b> {location.value}
      </p>
    );
  }

  _renderCartRow(location, index) {
    return (
      <Row>
        <Col md={11}>{location}:</Col>
      </Row>
    );
  }

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this._handleSearch(e.target.value);
    }
  };

  searchBar() {
    const { locations } = this.props;
    return (
      <div className="mb50 search-bar-box">
        <div className="br10 search-bar">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search"
              className="custom-input"
              value={this.state.searchFilter}
              onChange={(e) => this._handleChangeText(e.target.value)}
              onKeyDown={this._handleKeyDown}
            />
            <span
              className="input-group-addon"
              onClick={(e) => this._handleSearch(e.target.value)}
            ></span>
          </InputGroup>
          <ul className="drop-list">
            {locations.map(function(location, i) {
              return (
                <li key={i} onClick={() => this._handleSelected(i)}>
                  <b>{location.name}</b>, {location.formatted_address}
                </li>
              );
            }, this)}
          </ul>
        </div>
      </div>
    );
  }

  _csvButton() {
    const { finalList } = this.state;
    var headers = [
      { label: "Location Name", key: "Location Name" },
      { label: "Time Frame", key: "Time Frame" },
      { label: "Population", key: "Population" },
      { label: "Point of Interest", key: "Point of Interest" },
      { label: "Gender Breakdown", key: "Gender Breakdown" },
      { label: "Age Group Breakdown", key: "Age Group Breakdown" },
      { label: "Key Behaviors", key: "Key Behaviors" },
      {
        label: "Relevant Audience Segments",
        key: "Relevant Audience Segments",
      },
      { label: "Latitude", key: "Latitude" },
      { label: "Longtitude", key: "Longtitude" },
      { label: "Radius", key: "Radius" },
    ];

    if (isEmpty(finalList)) return <div></div>;

    return (
      <CSVLink
        data={finalList}
        filename={"list_sub_locations.csv"}
        className="btn download-button"
        headers={headers}
      >
        Download
      </CSVLink>
    );
  }

  //

  render() {





    console.log("--------------------------render-------------------------")
    console.log(this.state.phong_test)



    return (
      <div className="wrapper">
        <div className="background-header"></div>

        <div className="container">
          <Row>
            <Col md={4}>
              <img
                src="https://s3-ap-southeast-1.amazonaws.com/st.yoose.com/YOOSE_Logo_500px_transparentBG.png"
                className="logo"
              />
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Row>
                <Col md={12}>{this.searchBar()}</Col>
              </Row>
              <Row>
                <Col md={12}>{this.displayMap()}</Col>
              </Row>
              <Row>
                <Col md={12}>
                  <CartSection
                    finalList={this.state.finalList}
                    onDeleteColumn={this._handleDeleteColumn}
                    onBackToList={this._handleBackToInfo}
                  />
                  {this._csvButton()}
                </Col>
              </Row>
            </Col>

            <Col md={4}>
              <Row>
                <Col md={12}>{this.analyseBox()}</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    markerPosition: state.markerPosition,
    searchFilter: state.searchFilter,
    listInfo: state.listInfo,
    currentInfo: state.currentInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchDashboardLocation,
      fetchClearLocation,
      fetchDashboardSubLocation,
      fetchClearHeatMap,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
