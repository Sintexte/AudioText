import React from 'react'
import {Language} from '../../language/Lang'

class UploadFile extends React.Component{
    //[ALMOST FINISHED ?!]
    //this page is the page that make uploading file possible
    //it doesnt only do that
    


    state={
        default_msg:'', //default msg that should be shown in input browse
        actual_msg:'',  //changing this make the input browse message change (ususaly the file selected) 
        file: null, //this is a file object
        bad:false,  //boolean bad red color, to indicate that the file selected is bad (extensions)
        upload:false,   //(boolean) if true that mean that the file is being uploaded to the server
        serverror:false,    //(boolean) if true indicate that it received a 500 error from the api
        lg:Language[localStorage.getItem('language')].Main  //like every other compoenent this is the Language implementation
    }
    constructor(props){
        super(props)
        this.state.default_msg = this.state.lg.fileindefault;
        this.state.actual_msg = this.state.default_msg;
    }
    render(){
        
        return (
            <>
                <div className='uploadbody' >
                    <h1 className='center'>{this.state.lg.title}</h1>
                    
                    <br />
                    
                    <div className="input-group" style={{boxShadow:'10px 5px 50px rgba(0, 0, 0, 0.151)'}}>
                        
                        <div className="custom-file">
                            {/*input file area*/}
                            <input type="file" name="sampleFile" onChange={(e)=>{
                                if(e.target.files.length>=1){
                                    this.setState({actual_msg:e.target.files[0].name,file:e.target.files[0]})
                                    if(e.target.files[0].type.toString() !== "audio/mpeg"){
                                        this.setState({bad:true})
                                    }else{
                                        this.setState({bad:false})
                                    }
                                }
                            }} className="custom-file-input" id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01" accept="audio/mp3" />
                            
                            <label className="upload-area" style={this.state.bad?{backgroundColor:'red'}:{backgroundColor:''}} htmlFor="inputGroupFile01">
                                <span style={{position:'absolute',top:'7px',left:'10px'}}>{this.state.actual_msg}</span>
                                
                                <input type="button" value="Browse" className="choosebtn" />
                            </label>
                            
                        </div>
                        <div className="input-group-prepend">

                            {/*input uploading area*/}
                            <input type='button' onClick={()=>{
                                const formData  = new FormData();
                                //make a formData object instead of creating <form> on 'html' make it
                                //easier, and most importantly give more control

                                formData.append("sampleFile",this.state.file)
                                this.setState({upload:true})
                                this.setState({serverror:false})
                                
                                //fetch to the api
                                fetch('/api/upload', {
                                headers:{
                                    'Accept': 'application/json, text/plain, */*'
                                },
                                method: 'POST',
                                body: formData
                                })
                                .then(rs=>rs.text())
                                .then(data=>{
                                    //good data is here
                                    let js_data = JSON.parse(data)
                                    this.props.set_audiotxt(js_data)
                                }).catch(error=>{
                                    //bad catched a client/server error
                                    this.setState({upload:false})
                                    this.setState({serverror:true})
                                    alert('There has been a problem');
                                })
                            }} disabled={this.state.bad || (this.state.actual_msg === this.state.default_msg)?'disabled':''} style={{backgroundColor:'#2f4baf',border:'unset',color:'white',borderRadius:'0px 10px 10px 0px'}}  className="input-group-text" id="inputGroupFileAddon01"  value={this.state.lg.btnupload} />
                        </div>
                    </div>
                    <br />
                    <p>
                        {(this.state.upload)?"uploading ...":""}
                        {(this.state.serverror)?"Server Error ...":""}
                    </p>
                </div>
               
            </>
        )
    }
}
export default UploadFile;