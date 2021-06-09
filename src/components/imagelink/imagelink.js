import React from 'react';
import './imagelink.css'

const imagelink=({onInputChange,onSubmit})=>{
    return(
    <div >
        <p className="f3 bold center">Enter link for an image to overlay
         the face in it with the super-awsome meme face </p>
        
        <div className="center">
            <div className="form center pa3 br4 shadow-5">
            <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
            <button className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple" onClick={onSubmit} >Detect</button>
            </div>
        </div>
    </div>
    );
}
export default imagelink;