import React from 'react'
import Header from './mini/header'
import Logoff from './mini/Logoff'
import Audiotext from './Audiotext'
import VerifyToken from './mini/VerifyToken' 

import '../static/main.css'
class Main extends React.Component{
    //MAIN APP

    constructor(props){
        super(props)
        this.state={
            logginoff:false,    //if loggin off set to true
            page:0              //pages {0:uploadaudiofile,1:RecordAudioFile,2:UserSpace}
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