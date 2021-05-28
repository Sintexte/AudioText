import React from 'react'
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie'

//COMMENTS [y]

class VerifyToken extends React.Component{
    //redirect component (this.props.validepage if token is valide)
    //and redirect to component (this.props.invalidepage if token is invalide or not existant)
    //you can use to either redirect on valide or invalide depend on how the props where filled

    state = {
        logedin:false, 
        invalide:false,
    }

    redirect = () =>{
        //main function of this script that send the token (cookie) to the api to validate it
        //depend if its valide or not
        //if valide its setState logedin to true and Redirect if wanter
        //if its not, delete the cookie and Redirect if wanted

        let token_ = new Cookies().get('token')
        if(token_ === undefined){
            this.setState({invalide:true,logedin:false})
            return
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token:token_ })
        };
        
        //fetch from api
        fetch('/api/verifytoken', requestOptions)
        .then(response=>{
            if(response.status ===200){
                console.log("Good Token");
                this.setState({logedin:true})
            }else if(response.status>=400 && response.status<= 500){
                //invalide token
                console.log("BAD Token");
                token_ = new Cookies().remove('token')
                this.setState({invalide:true})
            }
        })

    }
    
    componentDidMount(){
        this.redirect();
    }

    render(){
        if(this.state.logedin){
            //valide token
            if(this.props.validepage){
                console.log("redirecting to *VALIDETOKEN* "+this.props.validepage+" ...");
                return <Redirect to={this.props.validepage} />  //redirecting to /{validepage}
            }
            return (<></>) //safe use
        }else{
            //bad/no token
            if(this.props.invalidepage && this.state.invalide){
                //no token
                console.log("redirecting to *NOTOKEN* "+this.props.invalidepage+" ...");
                return <Redirect to={this.props.invalidepage} /> 
            }
            return (<></>) //safe use
        }
    }
}
export default VerifyToken;