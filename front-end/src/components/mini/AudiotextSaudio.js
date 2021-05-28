//mini component to send audio

import React from 'react'
import UploadFile from './UploadFile'
import Transcript from './Transcript'
import Record from './Record'


class AudiotextSaudio extends React.Component{
    constructor(props){
        super(props)
        this.state={
            audio_txt: null
        }
    }


    set_audiotxt = (json_res) =>{
        this.setState({audio_txt:json_res.results})
    }

    set_audionull = () => {
        this.setState({audio_txt:null})
    }

   render(){
           if(this.state.audio_txt !== null){
               try{
                    //console.log(this.state.audio_txt.results);
                    if(this.state.audio_txt[0].alternatives[0]){
                        //good :)
                        return(
                            <>
                                <Transcript msg={this.state.audio_txt} null={this.set_audionull} />
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
               if(this.props.page===0){
                    return(
                        <>
                            {/*Component Upload file*/}
                            <UploadFile set_audiotxt = {this.set_audiotxt}/>
                        </>
                    );
                }else if(this.props.page===1){
                    return(
                        <>
                            {/*Component Record file*/}
                            <Record set_audiotxt = {this.set_audiotxt} />
                        </>
                    )
                }
                else{
                    return (<></>)
                }
           }
   }
}
export default AudiotextSaudio;