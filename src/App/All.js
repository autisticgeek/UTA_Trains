import React, {
  Component
} from "react";
import GoogleMapReact from 'google-map-react'

import {
  connect
} from "react-redux";
import {
  getFrontrunner
} from "../redux/frontrunnerReducer";
import {
  getBlue
} from "../redux/blueReducer";



class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    }
    this.onGeolocateError = this.onGeolocateError.bind(this);
    this.onGeolocateSuccess = this.onGeolocateSuccess.bind(this);
    this.geolocate = this.geolocate.bind(this)
  }
  componentDidMount() {
    this.geolocate();
    this.props.getFrontrunner();
    this.props.getBlue(701);
    setInterval(() => {
      this.geolocate();
      this.props.getFrontrunner();
      this.props.getBlue(701);
    }, 30000)
  }
  onGeolocateSuccess(coordinates) {
    const {
      latitude,
      longitude
    } = coordinates.coords;
    this.setState(() => {
      return {
        lat: latitude,
        lng: longitude
      };
    });
  }

  onGeolocateError(error) {
    console.warn(error.code, error.message);

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
    console.log("blue", this.props.blue.trains)
    let fr = [];
    let blue = [];
    if (this.props.frontrunner.trains) {
      fr = this.props.frontrunner.trains.map((vehicleObj, index) => {
        let temp = null;
        if (vehicleObj.DirectionRef[0] !== "") {
          const direction = vehicleObj.DirectionRef[0]
          temp = < div key = {
            index
          }
          lat = {
            vehicleObj.VehicleLocation["0"].Latitude["0"]
          }
          lng = {
            vehicleObj.VehicleLocation["0"].Longitude["0"]
          }
          text = {
            direction
          }
          title = {
            direction
          } > <i class= "fas fa-train fa-2x fr" ></i></div > ;

        }
        return temp
      })
    }
    if (this.props.blue.trains) {
      blue = this.props.blue.trains.map((vehicleObj, index) => {
        let temp = null;
        if (vehicleObj.DirectionRef[0] !== "") {
          const direction = vehicleObj.DirectionRef[0]
          temp = < div key = {
            index
          }
          lat = {
            vehicleObj.VehicleLocation["0"].Latitude["0"]
          }
          lng = {
            vehicleObj.VehicleLocation["0"].Longitude["0"]
          }
          text = {
            direction
          }
          title = {
            direction
          } > < i class = "fas fa-train fa-2x blue" > < /i></div > ;

        }
        return temp
      })
    }



    return <div >
      <
      div className = 'google-map' >
      <
      GoogleMapReact
    bootstrapURLKeys = {
      {
        key: "AIzaSyAp_gcAL9g64umPJUNU10vjP3Y-MHbmmQo"
      }
    }
    center = {
      {
        lat: 40.7,
        lng: -111.80
      }
    }
    zoom = {
        9
      } > {
        fr
      } {
        blue
      } <
      div lat = {
        this.state.lat
      }
    lng = {
        this.state.lng
      } > < i class = "fas fa-map-marker fa-2x" > < /i></div >


      <
      /GoogleMapReact>

      <
      /div>



      <
      /div>
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {
  getFrontrunner,
  getBlue
})(Train);
