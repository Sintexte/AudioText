import React from 'react'
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie'

class VerifyToken extends React.Component{
    //redirect component (used to redirect to /main if token is valide)

    state = {
        logedin:false
    }

    redirect = () =>{
        const token_ = new Cookies().get('token');
        if(token_ === undefined){
            this.setState({logedin:false})
            return
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token:token_ })
        };
        
        fetch('/api/verifytoken', requestOptions)
        .then(response=>{
            if(response.status ===200){
                this.setState({logedin:true})
            }else{
                console.log(response);
            }
        })

    }
    componentDidMount(){
        this.redirect();
    }

    render(){
        if( this.state.logedin ){
            console.log("redirecting to Main ...");
            return <Redirect to="/Main" />  //redirecting to /Main
        }else{
            return (
                <>
                </>
            )
        }
    }
}
export default VerifyToken;