import React from 'react'

class Transcript extends React.Component{
    render(){
        return(
            
            <div style={{width:'70%', paddingTop:'20%',paddingLeft:'29%'}} >
                <h1>Transcript of your Audio File 🎵</h1>
                <div className="form-group green-border-focus">
                    <label htmlFor="exampleFormControlTextarea5">English</label>
                    <code style={{height: 'inherit'}} contentEditable="false" className="form-control" id="exampleFormControlTextarea5" >
                        {
                        this.props.msg.map(ob=>{
                            console.log('rgb('+((ob.alternatives[0].confidence+1)*255-255).toString()+','+(-(ob.alternatives[0].confidence)*255+255)+',150)');
                            return(<span key={ob.alternatives[0].confidence.toString()} style={{backgroundColor:'rgb('+(-(ob.alternatives[0].confidence)*255+255).toString()+','+((ob.alternatives[0].confidence+1)*255-255).toString()+',0)'}}>
                                {ob.alternatives[0].transcript}
                            </span>)
                        })}
                    </code>
                </div>
            </div>
        );
    }
}
export default Transcript;