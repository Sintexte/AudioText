import React from 'react'
import Cookies from 'universal-cookie'
import {Spinner} from 'react-bootstrap'
import { Redirect } from 'react-router';

class Logoff extends React.Component{
    timer_ = () => {
        this.timeout = setInterval(() => {
            if(this.state.dots.length <4){
                this.setState({dots:this.state.dots+'.'})
            }else{
                this.setState({dots:' '})
            }
        }, 500  );  
    }
    constructor(props){
        super(props)
        this.dots = ''
        this.state = {
            message:'Removing token',
            dots:' ',
            redirect:false
        }
        this.timer_()
    }
    
    componentDidMount(){
        let cookies = new Cookies()
        cookies.remove("token")
        this.setState({message:'Redirecting',redirect:true})
    }

    render(){
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