import React from 'react'

import SignupForm from './mini/signup-form'
import VerifyToken from './mini/VerifyToken';

import '../static/login.css'
import watsonimg from '../static/watsonblack.png'

class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:'Main'
        }
    }

    render(){
        return(
            <>
                <VerifyToken validepage='/Main'/>
                <div className="container-fluid body-log">
                    <div className="row row-cols-2">
                        <div className="col-4 first-body full">
                            <div className="logform">
                                <SignupForm />
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
    }
}
export default Signup;