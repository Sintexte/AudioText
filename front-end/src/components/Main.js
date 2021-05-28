import React from 'react'
import Header from './mini/header'
import Logoff from './mini/Logoff'
import Audiotext from './Audiotext'
import VerifyToken from './mini/VerifyToken' 

import '../static/main.css'
class Main extends React.Component{
    //MAIN APP

    //need a veriftoken to redirect to / if token invalide 
    constructor(props){
        super(props)
        this.state={
            logginoff:false,
            page:0
        }
    }

    logoff = () =>{
        this.setState({logginoff:true})
    }

    set_page = (page_) => {
        this.setState({page:page_})
        console.log(this.state.page);
    }

    render(){
        if(this.state.logginoff){
            return(
                <div className="Mainbody">
                    <Logoff />
                </div> 
            )
        }return (
            <div className='Mainbody min-vh-100'>
                <VerifyToken invalidepage='/'/>
                <Header logoff={this.logoff}  set_page={this.set_page} />
                <Audiotext page_={this.state.page}/>
            </div>
        )
    }
}
export default Main;