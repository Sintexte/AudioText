import React from 'react'
import Header from './mini/header'
import Logoff from './mini/Logoff'
import Audiotext from './Audiotext'

import '../static/main.css'
class Main extends React.Component{
    //MAIN APP

    //need a veriftoken to redirect to / if token invalide 
    constructor(props){
        super(props)
        this.state={
            logginoff:false
        }
    }

    logoff = () =>{
        this.setState({logginoff:true})
      }

    render(){
        if(this.state.logginoff){
            return(
                <div className="Mainbody">
                    <Logoff />
                </div> 
            )
        }
        return (
            <div className='Mainbody'>
                <Header logoff={this.logoff} />
                <Audiotext />
            </div>
        )
    }
}
export default Main;