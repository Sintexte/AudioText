//mini component to send audio

import React from 'react'
import UploadFile from './UploadFile'
import Transcript from './Transcript'

class AudiotextSaudio extends React.Component{
    constructor(props){
        super(props)
        this.state={
            audio_txt: null
        }
    }

    set_audiotxt = (json_res) =>{
        this.setState({audio_txt:json_res.results})
        console.log(this.state.audio_txt)
    }

   render(){
           if(this.state.audio_txt !== null){
               try{
                    //console.log(this.state.audio_txt.results);
                    if(this.state.audio_txt[0].alternatives[0]){
                        //good :)
                        return(
                            <>
                                <Transcript msg={this.state.audio_txt}/>
                            </>
                        );
                    }else{
                        //backend didnt return good json
                        return("bad")
                    }
               }catch(e){
                    return("Error - ")
               }
           }else{
                return(
                    <>
                        <UploadFile set_audiotxt = {this.set_audiotxt}/>
                    </>
                );
           }
   }
}
export default AudiotextSaudio;