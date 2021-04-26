import React from 'react'
import Cookies from 'universal-cookie'
import {Spinner} from 'react-bootstrap'
import { Redirect } from 'react-router';

class Logoff extends React.Component{

    constructor(props){
        super(props)
        this.dots = ''
        this.state = {
            message:'Removing token',
            dots:' ',
            redirect:false,
            redirect_msg:false
        }
    }
    
    componentDidMount(){
        setTimeout(()=>{
            let cookies = new Cookies()
            cookies.remove("token")
            this.setState({message:'Redirecting',redirect_msg:true})
        },150)
    }

    render(){
        if(this.state.redirect_msg){
            setTimeout(()=>{
                this.setState({redirect:true}) 
            },100)
        }
        if(this.state.redirect){
            return  <Redirect to="/" />
        }
        return (
        <>
            <div style={{width:'30%',position:'absolute',marginTop:'40vh',marginLeft:'35vw'}}>
                <div style={{textAlign:'center'}}>
                    <Spinner animation="grow" className='bgcoolblue' />
                </div>
                <div style={{marginTop:'10px'}}>
                    <h1 style={{fontSize:'20px',textAlign:'center'}}>{this.state.message}  
                    {this.state.dots}
                    </h1>
                    
                </div>
            </div>
        </>)
    }
}
export default Logoff;