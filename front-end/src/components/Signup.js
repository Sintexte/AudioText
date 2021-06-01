import React from 'react'

import SignupForm from './mini/signup-form'
import VerifyToken from './mini/VerifyToken';
import SignupVerifcation from './mini/SignupVerication'

import '../static/login.css'
import watsonimg from '../static/watsonblack.png'

class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:'Main',
            signin:true,
            good:false,
            usertoken:''
        }
    }

    //used for SignupForm to setState good to true
    good_signup = () => {
        console.log("good signup");
        this.setState({signin:false,good:true})
    }

    set_token = (token) =>{
        console.log(token);
        this.setState({usertoken:token})
    }

    render(){
        if(this.state.signin){
            return(
                <>
                    <div className="container-fluid body-log">
                        <div className="row row-cols-2">
                            <div className="col-4 first-body full">
                                <div className="logform">
                                    <SignupForm set_token={this.set_token} good_signup={this.good_signup}/>
                                </div>
                            </div>
                            {/* Powered By */}
                            <div className='watsondiv'>
                                <img className='watsonimg' alt='Powered By' unselectable="on" src={watsonimg} width='unset' />
                            </div>
                        </div>
                    </div>
                </>
            )
        }else if(this.state.good && this.state.usertoken){
            return(
                <>
                <div className="container-fluid body-log">
                        <div className="row row-cols-2">
                            <div className="col-4 first-body full">
                                <div className="logform">
                                    <SignupVerifcation usertoken={this.state.usertoken}/>
                                </div>
                            </div>
                            {/* Powered By */}
                            <div className='watsondiv'>
                                <img className='watsonimg' alt='Powered By' unselectable="on" src={watsonimg} width='unset' />
                            </div>
                        </div>
                    </div>
                </>
            )
        }else{
            return(
                <>
                    Error ?
                </>
            )
        }
        
    }
}
export default Signup;