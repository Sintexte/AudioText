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
            <>
                {this.state.upload?<AudiotextSaudio page={this.props.page_}/>:null}
            </>
        )
    }
}
export default Audiotext;