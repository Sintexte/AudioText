import React from 'react'

import Settings from './Settings'
import Historique from './Historique'

class UserSpace extends React.Component{
    //[NOT FINISHED]
    //this is the main UserSpace Main where changing the props.page give a differant page
    render(){
        if(this.props.page===0){
            return(
                <>
                    <Settings />
                </>
            )
        }if(this.props.page===1){
            return(
                <>
                    <Historique />
                </>
            )
        }else if(this.props.page===2){
            return(
                <>
                    Infomation
                </>
            )
        }
    }
}
export default UserSpace