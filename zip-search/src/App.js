import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



  
function City(props) {

  return (<div>
    
    </div>);
}

function ZipSearchField(props) {

  const getZipData = async (zip) => {
    let res = await fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
    let data = await res.json()
    console.log(data) // Grab the first item in the list JSON response
    return data;
  }
  let zip = props.zip
  let resApi = getZipData(zip)
  // const {}
  console.log(resApi[0])
  return (<div>
   
  </div>);
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zip = {props.zip} />
        <div>
          <City />
          <City />
        </div>
      </div>
    );
  }
}

export default App;
