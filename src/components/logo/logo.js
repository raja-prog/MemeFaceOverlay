import React from 'react';
import Tilt from 'react-tilt';
import './logo.css'
import Face from './face.png'

const logo=()=>{
    return(
    <div className="ma4 mt0">
        <h2 className="center">Overlay your face with the meme face on any image !</h2>
        <Tilt className="Tilt br2 shadow-3" options={{ max :65 }} style={{ height: 150, width: 150 }} >
        <div    className="Tilt-inner">
            <img alt='logo' className="im" src={Face}/>
        </div>
        </Tilt>
    </div>
    );
}
export default logo;