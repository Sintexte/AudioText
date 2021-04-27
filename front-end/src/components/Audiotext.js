import React from 'react'
import AudiotextSaudio from './mini/AudiotextSaudio'


class Audiotext extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            upload:true
        }
    }
    
    render(){
        return (
            <div >
                {this.state.upload?<AudiotextSaudio />:null}
            </div>
        )
    }
}
export default Audiotext;