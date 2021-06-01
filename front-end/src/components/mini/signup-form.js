import React from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import {MdKeyboardBackspace} from 'react-icons/md'
import Cookies from 'universal-cookie'

import {Language} from '../../language/Lang'

class SignupForm extends React.Component{
    //[ALMOST FINISHED]
    //SignUp Form
    //this area is used to signin and send verification to your mail

    state = {
        username:"",
        password:"",
        password_:"",
        email:"",
        status:-1,    //-1normal;0good;1badpassowrdorusername;2servererror
        logboxmessage:"",
        logboxcolor:"",
        redirect:false,
        lg:Language[localStorage.getItem("language")].SignupForm
    };

    //handling form
    handleSub = (event) =>{
        event.preventDefault();
        if(this.state.password === this.state.password_){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "username": this.state.username, "password":this.state.password,"email":this.state.email })
            };
            //sending username / password to auth
            fetch('/api/signup', requestOptions)
            .then(data=>{
                if(data.status === 200){
                    this.setState({status:0,logboxmessage:"Sending Verification to email",logboxcolor:"green"})
                    data.text().then(response=>{
                        //set state token in the parent compoenent
                        console.log("res: "+response);
                        this.props.set_token(response)
                        this.props.good_signup()
                    })
                }
                else if(data.status ===403){this.setState({status:1,logboxmessage:"Bad Verifcation",logboxcolor:"red"})}
                else if(data.status >=500){this.setState({status:2,logboxmessage:"Server Error",logboxcolor:"red"})}
                
            })
        }else{
            this.setState({status:1,logboxcolor:"red",logboxmessage:"Not Same Password"})
        }
        
    }

    render(){
        return(
            <>
                    <NavLink className="strip-link" to="/login">
                        <span>
                            <MdKeyboardBackspace />
                        </span>
                    </NavLink>
                    <h1 className="h1_logform">
                        {this.state.lg.signtitle}
                    </h1>

                    <hr className="hr_log hr_sign"/>
                    <form onSubmit={this.handleSub}>
                        <input name="username"  onChange={(event)=>{this.setState({username:event.target.value})}} className="input_login form-control input_signup" type="text"  placeholder={this.state.lg.userindefault} required />
                        <input name="email"  onChange={(event)=>{this.setState({email:event.target.value})}} className="input_login form-control input_signup" type="email"  placeholder={this.state.lg.mailindefaul} required />
                        <input name="password" onChange={(event)=>{this.setState({password:event.target.value})}} className="input_login form-control input_signup" type="password"  placeholder={this.state.lg.passwordindefault} required/>
                        <input name="password" onChange={(event)=>{this.setState({password_:event.target.value})}} className="input_login form-control input_signup" type="password"  placeholder={this.state.lg.passwordin_default} required/>
                        <div id="log-box" style={{color: this.state.logboxcolor,textAlign:'center'}}>
                            {this.state.logboxmessage}
                        </div><br />
                        <div className="center">
                            <input type="submit" className="btn cntform" value={this.state.lg.signbtn}/>
                        </div>
                    </form>
            </>
        )
    }
    
}
export default SignupForm;