import React from 'react'
import {Language} from '../../language/Lang'

class Transcript extends React.Component{
    //this component is simply used to show the transcription of the audio file
    //receive a json and put it in a code section
    //it also adds color to the background of text depending on the confidence of the AI

    state={
        lg:Language[localStorage.getItem('language')].Main.transcript
    }
    render(){
        return(
            
            <div className="transcriptbody" >
                <h1>{this.state.lg.title}</h1>
                <div className="form-group green-border-focus">
                    <label htmlFor="exampleFormControlTextarea5">English</label>
                    <code style={{height: '200px',overflow:'auto'}} className="form-control transc-code" >
                        {
                        this.props.msg.map(ob=>{
                            console.log(ob.alternatives[0].confidence);
                            console.log('rgb('+((ob.alternatives[0].confidence+1)*255-255).toString()+','+(-(ob.alternatives[0].confidence)*255+255)+',150)');
                            return(<span key={ob.alternatives[0].confidence.toString()} style={{backgroundColor:'rgb('+(-(ob.alternatives[0].confidence)*400+400).toString()+','+((ob.alternatives[0].confidence+1)*255-255).toString()+',0)'}}>
                                {ob.alternatives[0].transcript}
                            </span>)
                        })}
                    </code>
                </div>
                <input className="gobackbtn" type="button" value={this.state.lg.btnback} onClick={()=>{this.props.null()}}/>
                            
            </div>
        );
    }
}
export default Transcript;