//mini component to send audio

import React from 'react'

class AudiotextSaudio extends React.Component{
    state={
        default_msg:'Choose File',
        actual_msg:'Choose File',
        file: null,
        bad:false
    }
    render(){
        
        return (
            <>  
                <iframe title='titlei' name="dummyframe" id="dummyframe" style={{display: 'none'}}></iframe>
                <form  target="dummyframe" ref='uploadForm' id='uploadForm'  method='post' action='/api/upload' encType="multipart/form-data"  style={{width:'70%', paddingTop:'20%',paddingLeft:'29%'}} >
                    <h1 className='center'>Upload your 🎵.flac file</h1>
                    <br />
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" name="sampleFile" onChange={(e)=>{
                                if(e.target.files.length>=1){
                                    this.setState({actual_msg:e.target.files[0].name,file:e.target.files[0]})
                                    if(e.target.files[0].type.toString() !== "audio/x-flac"){
                                        this.setState({bad:true})
                                    }else{
                                        this.setState({bad:false})
                                    }
                                }
                            }} className="custom-file-input" id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01" accept="audio/flac"  />
                            <label className="custom-file-label" style={this.state.bad?{borderColor:'red'}:{border:''}} htmlFor="inputGroupFile01">
                                {this.state.actual_msg}
                            </label>
                        </div>
                        <div className="input-group-prepend">
                            <input type='submit' disabled={this.state.bad || (this.state.actual_msg === this.state.default_msg)?'disabled':''} className="input-group-text" id="inputGroupFileAddon01"  value='upload'/>
                        </div>
                    </div>
                </form>
               
            </>
        )
    }
}
export default AudiotextSaudio;