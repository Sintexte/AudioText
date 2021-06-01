import React from 'react'
import {Language} from '../../language/Lang'
import MicRecorder from 'mic-recorder-to-mp3';

//running this class on a server with no https gonna make this page useless
//this can only work on https (check https://w3c.github.io/webappsec-secure-contexts/)
//or in localhost (the browser assumes its secure enough) else dont try this component wont work
var timesec = 0;
var timemin = 0;
class Record extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            lg:Language[localStorage.getItem('language')].Main.Record, //setting up language as usual
            isRecording:false,  //if false not recording else it is
            isBlocked:true,    //if the user didnt accept the popup to use the mic
            Mp3Recorder:new MicRecorder({ bitRate: 128 }),  //object of the library mic-recorder-to-mp3
            blobURL:null,    //audio data buffer
            time_:  "0:0",      //string timer
            timer:  null,
        }
    }
    

    
    start = () => {
        if (this.state.isBlocked) {
            //if the user didnt accept and blocked
            console.log('Permission Denied');
        } else {
            this.setState({isRecording:true})  
            this.state.timer = setInterval(()=>{
                if(timesec >= 60){
                    timesec=0
                    timemin+=1
                }else{
                    timesec+=1
                }

                let a = timemin + ":" + timesec
                this.setState({time_:a})
            }, 1000);
            this.state.Mp3Recorder
                .start()
                .then(() => {
                this.setState({ isRecording: true });
                }).catch((e) => console.error(e));
        }
    };

    stop = () => {
        this.state.Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            clearInterval(this.state.timer)
            timesec = 0
            timemin = 0
            const blobURL = URL.createObjectURL(blob)
            let a = document.createElement('a')
            let e    = document.createEvent('MouseEvents')
            a.download = "audio.mp3"
            a.href = blobURL
            a.dataset.downloadurl =  ["audio/mp3", a.download, a.href].join(':')
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            a.dispatchEvent(e)
            this.setState({time_:'0:0', blobURL:blobURL, isRecording: false });
          }).catch((e) => console.log(e));
    };


    async componentDidMount(){
        try{
            let stream = await navigator.mediaDevices.getUserMedia({audio: true})
            this.setState({isBlocked:false})
        }catch(err){
            if(err.name==="NotAllowedError"||err.name==="NotFoundError"){
                this.setState({isBlocked:true})
            }
        }

    }

    render(){
        return(
            <> 
                <div className='uploadbody' >
                    <h1 className='center'>{this.state.lg.title}</h1>
                    
                    <br />
                    
                    <div className="input-group" style={{boxShadow:'10px 5px 50px rgba(0, 0, 0, 0.151)'}}>
                        
                        <div className="custom-file">
                            <label className="upload-area" htmlFor="inputGroupFile01">
                                <span style={{position:'absolute',top:'7px',left:'10px'}}>
                                    {this.state.isRecording?this.state.time_:"Start Recording"}
                                </span>
                            </label>
                            {/*

                            <input type="file" name="sampleFile" className="custom-file-input" id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01" accept="audio/mp3" />
                            <label className="upload-area" htmlFor="inputGroupFile01">
                                <span style={{position:'absolute',top:'7px',left:'10px'}}>Upload</span>
                                
                                <input type="button" value="Browse" className="choosebtn" />
                            </label>
                            */
                            }
                        </div>
                        <div className="input-group-prepend">
                            {!this.state.isRecording?
                                <input  
                                type='button' 
                                onClick={this.start} 
                                className="btn_record input-group-text" 
                                id="inputGroupFileAddon01" 
                                style={this.state.isBlocked?{cursor:'not-allowed'}:{}} 
                                value="⏺ Record" />
                                :
                                <input  
                                type='button' 
                                onClick={this.stop} 
                                className="btn_record input-group-text" 
                                id="inputGroupFileAddon01"  
                                value="⏺ Stop" />
                            }
                            {this.state.blobURL?<audio src={this.state.blobURL} controls="controls" />:<></>}
                            
                        </div>
                    </div>
                </div>
               
            </>
        );
    }
}
export default Record;