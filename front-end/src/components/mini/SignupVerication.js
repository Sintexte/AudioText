import React from 'react'
import {Language} from '../../language/Lang'
import { Redirect } from 'react-router-dom';

class SignupVerifcation extends React.Component{
    state = {
        redirect:false,
        status:-1,    //-1normal;0good;1badpassowrdorusername;2servererror
        verifchar:"",
        lg:Language[localStorage.getItem("language")].SignupForm
    }


    handleSub = (event) =>{
        event.preventDefault();
        if(this.state.verifchar.length === 8){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"tmpuser":this.props.usertoken,"verif": this.state.verifchar })
            };
            fetch('/api/signupverif', requestOptions)
            .then(data=>{
                if(data.status === 200){
                    this.setState({status:0,redirect:true,logboxmessage:"Account Found, Welcome ! (Redirecting ...)",logboxcolor:"green"})
                }
                else if(data.status >=400 && data.status < 500){this.setState({status:1,logboxmessage:"Bad Verification",logboxcolor:"red"})}
                else if(data.status >=500){this.setState({status:2,logboxmessage:"Server Error",logboxcolor:"red"})}
            })
        }else{
            console.log("tessstt");
            this.setState({status:1,logboxmessage:"Verification is 8 character long",logboxcolor:"red"})
        }
    }

    render(){
        if( this.state.redirect ){
            return <Redirect to="/login" />  //redirecting to /Main if Login is good
        }
        return(
            <>
                <h1 className="h1_logform">
                    Verification
                </h1>
                <h6 style={{color:'white'}}>
                    Email Has Been Sent containing a verification string
                </h6>

                <hr className="hr_log hr_sign"/>
                <form onSubmit={this.handleSub}>
                    <div style={{color:'white',marginBottom:'10px'}}>
                        Enter Verification:
                    </div>
                    
                    <input name="verif"  onChange={(event)=>{this.setState({verifchar:event.target.value})}} className="input_login form-control input_signup" type="text"  placeholder={'XXXXXXXX'} required />
                    
                    <div id="log-box" style={{color: this.state.logboxcolor,textAlign:'center'}}>
                            {this.state.logboxmessage}
                    </div><br />
                    <div className="center">
                        <input type="submit" className="btn cntform" value="verify"/>
                    </div>
                </form>
            </>
        )
    }
    
}
export default SignupVerifcation;