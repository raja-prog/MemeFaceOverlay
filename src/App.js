import './App.css';
import React ,{ Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Logo from './components/logo/logo';
import Particles from 'react-particles-js';
import Imagelink from './components/imagelink/imagelink';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
 
const app = new Clarifai.App({
 apiKey: '7b6f0aa115f54f86ae318ca8e691e1d9'
});

const partikils= {
  particles: {
    number: {
      value :1500,
      density: {
        enable:true,
        value_area:10000
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageurl:'',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageurl: this.state.input});
    app.models
      .predict(
        // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
        // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
        // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
        // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
        // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
        // so you would change from:
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        // to:
        // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
  
      }
    
  render(){
    const {  imageurl, box } = this.state;
  return (
    <div>
      <Particles className="party"
              params={partikils}
            /> 
      <Navbar></Navbar>
      <Logo></Logo>
      <Imagelink onInputChange = {this.onInputChange} onSubmit={this.onSubmit}></Imagelink>
      <FaceRecognition box={box} imageurl={this.state.imageurl}></FaceRecognition>
    </div>
  );
}
}

export default App;
