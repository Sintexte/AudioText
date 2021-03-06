import React from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import {MdKeyboardBackspace} from 'react-icons/md'
import Cookies from 'universal-cookie'

import {Language} from '../../language/Lang'

class Loginform extends React.Component{
    
    state = {
        username:"",
        password:"",
        status:-1,    //-1normal;0good;1badpassowrdorusername;2servererror
        logboxmessage:"",
        logboxcolor:"",
        redirect:false,
        lg:Language[localStorage.getItem("language")].LoginForm
    };

    //handling form
    handleSub = (event) =>{
        event.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": this.state.username, "password":this.state.password })
        };
        //sending username / password to auth
        fetch('/api/login', requestOptions)
        .then(data=>{
            if(data.status === 200){this.setState({status:0,logboxmessage:"Account Found, Welcome ! (Redirecting ...)",logboxcolor:"green"})}
            else if(data.status ===403){this.setState({status:1,logboxmessage:"Bad Password or Username",logboxcolor:"red"})}
            else if(data.status >=500){this.setState({status:2,logboxmessage:"Server Error",logboxcolor:"red"})}
            data.json().then(response=>{
                //setting 'token' cookie (using _id from mongodb user collection as a token should be changed later for a real token generation)
                const cookies = new Cookies();
                cookies.set('token', response.token, { path: '/' });
                this.setState({redirect:true})
            })
        })
    }

    render(){
        if( this.state.redirect ){
            return <Redirect to="/Main" />  //redirecting to /Main if Login is good
        }
        return(
            <>
                    <NavLink className="strip-link" to="/home">
                        <span>
                            <MdKeyboardBackspace />
                        </span>
                    </NavLink>
                    <h1 className="h1_logform">
                        {this.state.lg.logtitle}
                    </h1>

                    <hr className="hr_log"/>
                    <form onSubmit={this.handleSub}>
                        <input name="username"  onChange={(event)=>{this.setState({username:event.target.value})}} className="input_login form-control" type="text"  placeholder={this.state.lg.userindefault} required />
                        <input name="password" onChange={(event)=>{this.setState({password:event.target.value})}} className="input_login form-control" type="password"  placeholder={this.state.lg.passwordindefault} required/>
                        <div id="log-box" style={{color: this.state.logboxcolor,textAlign:'center'}}>
                            {this.state.logboxmessage}
                        </div><br />
                        <div className="center">
                            <input type="submit" className="btn cntform" value={this.state.lg.logbtn}/>
                        </div>
                    </form>
                    <NavLink to="/signup"  >
                        <p></p><p></p>
                        <span  class="inscription-link" >Don't have an Account ?</span>
                    </NavLink>
            </>
        )
    }
    
}
export default Loginform;