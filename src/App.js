import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Facerecognition from './components/Facerecognition/Facerecognition'
import Signin from './components/SignIn/Signin';
import Register from './components/Register/Register'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import './App.css';

const app = new Clarifai.App({
  apiKey: '2860fb4461b54aaea2c0869135977011'
});

const particlesOptions = {
    particles: {
     number: {
      value: 90, 
      density: {
        enable: true,
        value_area:700
      }
    } 
  }
}



class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin', /*Route Keeps track of where we are on the page*/
      isSignedIn: false

    }
  }

  calculateFaceLocation =(data) => {
    const image = document.getElementById('input_image');
    const width = Number(image.width);
    const height = Number(image.height);
    //var clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    var box_parameters = []
    var leftCol = 0, rightCol = 0, topRow = 0, bottomRow = 0;
    var clarifaiFace = data.outputs[0].data.regions

    //console.log(clarifaiFace.length)
    for(var i =0; i < clarifaiFace.length; i++){
      const item = clarifaiFace[i].region_info.bounding_box;
      leftCol = item.left_col * width;
      topRow = item.top_row * height;
      rightCol = width - (item.right_col * width);
      bottomRow = height - (item.bottom_row * height);
      // console.log(item);
      // console.log(leftCol, topRow, rightCol, bottomRow);
      box_parameters.push({left_Col: leftCol, top_Row: topRow, right_Col: rightCol, bottom_Row: bottomRow})
      //console.log('Im in calculateFaceLocation');
      // console.log(box_parameters[0][0].leftCol)
    }
    // const image = document.getElementById('input_image');
    // const width = Number(image.width);
    // const height = Number(image.height);
    return [...box_parameters]
    // return {box_parameters}
      // leftCol: clarifaiFace.left_col * width,
      // topRow: clarifaiFace.top_row * height,
      // rightCol: width - (clarifaiFace.right_col * width),
      // bottomRow: height - (clarifaiFace.bottom_row * height)
      
    

  }

  displayFaceBox = (box) => {
    //console.log('box in App.js', box)
    //console.log('This length is in App.js displayFaceBox function', box.box_parameters.length)
    // console.log('im in displayFaceBox')
    // var leftCol = 0, rightCol = 0, topRow = 0, bottomRow = 0;
    // for(var j = 0; j < box.box_parameters.length; j++) {
    //   console.log('Im inside looop: j = ', j)
    //   var inside_box = box.box_parameters[j][0];
    //   leftCol = inside_box.leftCol;
    //   topRow = inside_box.topRow;
    //   rightCol = inside_box.rightCol;
    //   bottomRow = inside_box.bottomRow;
    //   console.log(leftCol, topRow, rightCol, bottomRow);
    //   this.setState({box: inside_box});

    // }

    
    this.setState({box: box});
    //console.log('boxie', box);

  }



  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})

    //console.log('click');

    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
                      this.state.input)
                    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
                    .catch(err => console.log(err));

  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route})
  }

  render() {

    const {isSignedIn, imageUrl, box, route} =  this.state;

    return (
      <div className="App">
        <Particles className='particles'
        params={particlesOptions} />
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home' 
            ?  <div>
                <Logo/>
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} 
                              onButtonSubmit={this.onButtonSubmit}/>
                <Facerecognition box ={box} imageUrl={imageUrl}/>
              </div>
            : (
                route === 'signin'
                ? <Signin onRouteChange = {this.onRouteChange}/>
                 : (
                    route === 'signout'
                    ? <Signin onRouteChange = {this.onRouteChange}/>
                    : <Register onRouteChange = { this.onRouteChange}/>
                  )
              )
        }
      </div>
    );
  }
}

export default App;




















