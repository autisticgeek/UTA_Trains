import React, {
    Component
} from "react";
import GoogleMapReact from 'google-map-react'

import {connect} from "react-redux";
import {getGreen} from "../redux/greenReducer";
import {getBlue} from "../redux/blueReducer";

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {lat: 0, lng: 0}
    this.onGeolocateError = this.onGeolocateError.bind(this);
    this.onGeolocateSuccess = this.onGeolocateSuccess.bind(this);
    this.geolocate = this.geolocate.bind(this)
  }
  componentDidMount() {
    this.geolocate();
    this.props.getGreen();
    this.props.getBlue();
    setInterval(() => {
      this.geolocate();
      this.props.getGreen();
      this.props.getBlue();
    }, 15000)
  }
  onGeolocateSuccess(coordinates) {
    const {latitude, longitude} = coordinates.coords;
    console.log('Found coordinates: ', latitude, longitude);
    this.setState(() => {
      return {
        lat: latitude,
        lng: longitude
      };
    });
  }
  onGeolocateError(error) {console.warn(error.code, error.message);
    if (error.code === 1) {
      console.log("they said no")
    } else if (error.code === 2) {
      console.log("position unavailable")
    } else if (error.code === 3) {
      console.log("timeout")
    }
  }
  geolocate() {
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onGeolocateSuccess, this.onGeolocateError);
    }
  }
  vehicle = (vehicleObj, index, train) => {
    const direction = vehicleObj.DirectionRef[0]
    return <div key={index} lat={vehicleObj.VehicleLocation["0"].Latitude["0"]} lng={vehicleObj.VehicleLocation["0"].Longitude["0"]} text={direction} title={direction}><i className="fas fa-train fa-2x" className={train}></i></div> ;
  }
  
  render() {
    let green = []
    let blue = []
    if (this.props.green.trains) {
      green = this.props.green.trains.map((vehicleObj, index) => {
        let temp = null;
        if (vehicleObj.DirectionRef[0] !== "") {
          temp=this.vehicle(vehicleObj, index, ;
        }
        return temp;
      })
    }
    if (this.props.blue.trains) {
      blue = this.props.blue.trains.map((vehicleObj, index) => {
        let temp = null;
        if (vehicleObj.DirectionRef[0] !== "") {
          const direction = vehicleObj.DirectionRef[0];
          temp=<div key={index} lat={vehicleObj.VehicleLocation["0"].Latitude["0"]} lng={vehicleObj.VehicleLocation["0"].Longitude["0"]} text={direction} title={direction}
          ><i class="fas fa-train fa-2x blue"></i></div>;
        }
        return temp;
      })
    }
    return <div>
      <div className = 'google-map' ><GoogleMapReact bootstrapURLKeys = {{key:"AIzaSyAp_gcAL9g64umPJUNU10vjP3Y-MHbmmQo"}} center = {{lat: 40.7, lng: -111.80}} zoom={9}>{green}{blue}<div lat={this.state.lat} lng = {this.state.lng}><i class="fas fa-map-marker fa-2x"></i></div></GoogleMapReact></div></div>
      }
    }
    export default connect(state => state, {getGreen, getBlue})(Train);