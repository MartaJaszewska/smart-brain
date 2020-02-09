import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from '../../components/Navigation';
import Logo from '../../components/Logo';
import ImageLinkForm from '../../components/ImageLinkForm';
import Rank from '../../components/Rank';
import FaceRecognition from '../../components/FaceRecognition';
import SignIn from '../../components/SignIn';
import Register from '../../components/Register';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 100
      }
    },
  }
}

const app = new Clarifai.App({
  apiKey: 'b0d7e2ce250443d493e9f7c018959129'
 });
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(width, height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = box => {
    console.log(box)
    this.setState({ box: box })
  }

  onInputChange = e => {
    this.setState({ input: e.target.value })
  }

  onButtonClick = () => {
    this.setState({ imageUrl: this.state.input })
    console.log('click')
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
      .catch(err => console.log(err))
}

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const {
      isSignedIn,
      route,
      box,
      imageUrl
    } = this.state
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
          ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/> 
        </div>
          : route === 'signin'
          ? <SignIn onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
          }
      </div>
    );
  }
}

export default App;
