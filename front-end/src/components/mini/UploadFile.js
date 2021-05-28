import React from 'react'
import {Language} from '../../language/Lang'

class UploadFile extends React.Component{
    state={
        default_msg:'',
        actual_msg:'',
        file: null,
        bad:false,
        upload:false,
        serverror:false,
        lg:Language[localStorage.getItem('language')].Main
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
                            <input type='button' onClick={()=>{
                                const formData  = new FormData();
                                formData.append("sampleFile",this.state.file)
                                this.setState({upload:true})

                                fetch('/api/upload', {
                                headers:{
                                    'Accept': 'application/json, text/plain, */*'
                                },
                                method: 'POST',
                                body: formData
                                })
                                .then(rs=>rs.text())
                                .then(data=>{
                                    let js_data = JSON.parse(data)
                                    this.props.set_audiotxt(js_data)
                                });
                            }} disabled={this.state.bad || (this.state.actual_msg === this.state.default_msg)?'disabled':''} style={{backgroundColor:'#2f4baf',border:'unset',color:'white',borderRadius:'0px 10px 10px 0px'}}  className="input-group-text" id="inputGroupFileAddon01"  value={this.state.lg.btnupload} />
                        </div>
                    </div>
                    <br />
                    <p>
                        {(this.state.upload)?"uploading ...":""}
                    </p>
                </div>
               
            </>
        )
    }
}
export default UploadFile;