import React from 'react'

class Transcript extends React.Component{
    render(){
        return(
            
            <div style={{width:'70%', paddingTop:'20%',paddingLeft:'29%', }} >
                <h1>Transcript of your Audio File 🎵</h1>
                <div className="form-group green-border-focus">
                    <label for="exampleFormControlTextarea5">English</label>
                    <textarea className="form-control" id="exampleFormControlTextarea5" rows="3" defaultValue={this.props.msg} ></textarea>
                </div>
            </div>
        );
    }
}
export default Transcript;