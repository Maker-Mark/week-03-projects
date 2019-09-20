import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// City component
class City extends Component {
  render() {
    return (
      <div className="city">
        <h2>{this.props.title}</h2>
        <ul>
          <li>State: {this.props.state}</li>
          <li>Location: {this.props.location}</li>
          <li>Population (estimated): {this.props.population}</li>
          <li>Total Wages: {this.props.wages}</li>
        </ul>
      </div>
    );
  }
}

class CityCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    console.log("here");
    if (this.props.cities) {
      return (
        <div>
          {this.props.cities.map((city, i) => {
            return (
              <City
                title={city.cityName}
                state={city.state}
                location={city.location}
                population={city.population}
                wages={city.totalWages}
                index={i}
                key={i}
              />
            );
          })}
        </div>
      );
    } else {
      console.log("no res");
      return <div>No results</div>;
    }
  }
}

//Zip Search Field Component
class ZipSearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: ""
    };
  }

  updateTarget = () => {
    let newTarget = document.getElementById("target-zip").value;
    this.props.changeHandler(newTarget);
  };

  render() {
    return (
      <div className="zip-search-field">
        <b>Zip Code: </b>
        <input
          type="text"
          id="target-zip"
          placeholder="ie 11216"
          onChange={this.updateTarget}
        />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: "",
      cityList: []
    };
  }

  getNewPlace = newPlace => {
    this.setState(
      {
        place: newPlace
      },
      this.getCities
    );
  };

  getCities = () => {
    //If we already have a target place
    if (this.state.place) {
      this.getZipData();
    } else {
      return "Not found!";
    }
  };

  getZipData = async () => {
    console.log(this.state.place);
    let { targetZip } = this.state;
    let cityRes = [];
    try {
      let res = await fetch(
        `http://ctp-zip-api.herokuapp.com/zip/${this.state.place}`
      );
      let data = await res.json();

      //For every item in the response array
      data.map(place => {
        let city = {
          cityName: place.LocationText,
          state: place.State,
          location: "(" + place.Lat + "," + place.Long + ")",
          population: place.EstimatedPopulation,
          totalWages: place.TotalWages
        };
        cityRes.push(city);
        console.log(cityRes);
      });
    } catch (error) {
      return "Error!";
    }

    this.setState({
      cityList: cityRes
    });
    return cityRes;
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField changeHandler={this.getNewPlace} />
        <p>Place:{this.state.place}</p>
        <div>
          <CityCard cities={this.state.cityList} />
        </div>
      </div>
    );
  }
}

export default App;
