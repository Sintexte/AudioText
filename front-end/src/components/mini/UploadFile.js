import React from 'react'

class UploadFile extends React.Component{
    state={
        default_msg:'Choose File',
        actual_msg:'Choose File',
        file: null,
        bad:false,
        upload:false
    }
    
    render(){
        
        return (
            <>  
                <div style={{width:'70%', paddingTop:'20%',paddingLeft:'29%'}} >
                    <h1 className='center'>Upload your 🎵.mp3 file</h1>
                    <br />
                    <div className="input-group">
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
                            aria-describedby="inputGroupFileAddon01" accept="audio/mp3"  />
                            <label className="custom-file-label" style={this.state.bad?{borderColor:'red'}:{border:''}} htmlFor="inputGroupFile01">
                                {this.state.actual_msg}
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
                            }}  disabled={this.state.bad || (this.state.actual_msg === this.state.default_msg)?'disabled':''} className="input-group-text" id="inputGroupFileAddon01"  value='upload'/>
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