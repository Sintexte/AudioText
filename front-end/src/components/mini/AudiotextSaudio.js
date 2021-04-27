//mini component to send audio

import React from 'react'

class AudiotextSaudio extends React.Component{
    render(){
        return (
            <>
                <div style={{width:'70%', paddingTop:'20%',paddingLeft:'29%'}} >
                    <h1 className='center'>Upload your 🎵.flac file</h1>
                    <br />
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01" accept="audio/flac" />
                            <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                        <div className="input-group-prepend">
                            <input type='submit' className="input-group-text" id="inputGroupFileAddon01"  value='upload'/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default AudiotextSaudio;