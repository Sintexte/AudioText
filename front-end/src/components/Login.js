import React from 'react'

import Loginform from './mini/login-form'

import '../static/login.css'

class Login extends React.Component{
    render(){
        return(
            <div className="container-fluid body-log">
                <div className="row row-cols-2">
                    <div className="col-4 first-body full">
                        <div className="logform">
                            <Loginform />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;