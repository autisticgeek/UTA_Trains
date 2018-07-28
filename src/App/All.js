import React, {
    Component
} from "react";
import GoogleMapReact from 'google-map-react'

import {connect} from "react-redux";
import {getGreen} from "../redux/greenReducer";
import {getBlue} from "../redux/blueReducer";
import {getRed} from "../redux/redReducer";
import {getFrontrunner} from "../redux/frontrunnerReducer";

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {lat: 40.7, lng: -111.80, zoom: 13}
    this.onGeolocateError = this.onGeolocateError.bind(this);
    this.onGeolocateSuccess = this.onGeolocateSuccess.bind(this);
    this.geolocate = this.geolocate.bind(this)
  }
  componentDidMount() {
    this.geolocate();
    this.props.getGreen();
    this.props.getBlue();
    this.props.getRed();
    this.props.getFrontrunner();
    
    
    setInterval(() => {
    this.props.getGreen();
    this.props.getBlue();
    this.props.getRed();
    this.props.getFrontrunner();
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

  
  render() {
    let green = [];
    let blue = [];
    let red = [];
    let frontrunner = [];
    if (this.props.frontrunner.trains) {
      frontrunner = this.props.frontrunner.trains.map((vehicleObj, index) => {
        let temp = null;
        if (vehicleObj.DirectionRef[0] !== "") {
          const direction = vehicleObj.DirectionRef[0];
          const bearing = vehicleObj.Extensions[0].Bearing[0];
          temp=<div key={index} lat={vehicleObj.VehicleLocation["0"].Latitude["0"]} lng={vehicleObj.VehicleLocation["0"].Longitude["0"]} text={direction} title={direction}
          ><i class="fas fa-long-arrow-alt-up fa-2x fr" style={{"transform": "rotate("+bearing+"deg)"}}></i></div>;
        }
        return temp;
      })
    }
    if (this.props.green.trains) {
      green = this.props.green.trains.map((vehicleObj, index) => {
        let temp = null;
        if (vehicleObj.DirectionRef[0] !== "") {
          const direction = vehicleObj.DirectionRef[0];
          const bearing = vehicleObj.Extensions[0].Bearing[0];
          temp=<div key={index} lat={vehicleObj.VehicleLocation["0"].Latitude["0"]} lng={vehicleObj.VehicleLocation["0"].Longitude["0"]} text={direction} title={direction}
          ><i class="fas fa-long-arrow-alt-up fa-2x green" style={{"transform": "rotate("+bearing+"deg)"}}></i></div>;
        }
        return temp;
      })
    }
    if (this.props.blue.trains) {
      blue = this.props.blue.trains.map((vehicleObj, index) => {
        let temp = null;
        if (vehicleObj.DirectionRef[0] !== "") {
          const direction = vehicleObj.DirectionRef[0];
          const bearing = vehicleObj.Extensions[0].Bearing[0];
          temp=<div key={index} lat={vehicleObj.VehicleLocation["0"].Latitude["0"]} lng={vehicleObj.VehicleLocation["0"].Longitude["0"]} text={direction} title={direction}
          ><i class="fas fa-long-arrow-alt-up fa-2x blue" style={{"transform": "rotate("+bearing+"deg)"}}></i></div>;
        }
        return temp;
      })
    }
    if (this.props.red.trains) {
      red = this.props.red.trains.map((vehicleObj, index) => {
        let temp = null;
        if (vehicleObj.DirectionRef[0] !== "") {
          const direction = vehicleObj.DirectionRef[0];
          const bearing = vehicleObj.Extensions[0].Bearing[0];
          temp=<div key={index} lat={vehicleObj.VehicleLocation["0"].Latitude["0"]} lng={vehicleObj.VehicleLocation["0"].Longitude["0"]} text={direction} title={direction}
          ><i class="fas fa-long-arrow-alt-up fa-2x red" style={{"transform": "rotate("+bearing+"deg)"}}></i></div>;
        }
        return temp;
      })
    }
    return <div>
      <div className = 'google-map' ><GoogleMapReact bootstrapURLKeys = {{key:"AIzaSyAp_gcAL9g64umPJUNU10vjP3Y-MHbmmQo"}} center = {{lat: this.state.lat, lng: this.state.lng}} zoom={this.state.zoom}>{green}{blue}{red}{frontrunner}<div lat={this.state.lat} lng = {this.state.lng}><i class="fas fa-map-marker fa-2x"></i></div></GoogleMapReact></div></div>
      }
    }
    export default connect(state => state, {getGreen, getBlue, getRed, getFrontrunner})(Train);