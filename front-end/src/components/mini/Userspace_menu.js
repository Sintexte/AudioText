import React from 'react'

class UserSpaceMenu extends React.Component{
    //[NOT FINISHED]
    //UserSpaceMenu: this component is used to show the menu and control the content that gonna 
    //be shown in UserMain Component
    
    render(){
        return(
            <>
                <div className="usermenu_">

                <div className="usermenu_selection" 
                        onClick={()=>{this.props.setpage(1)}}
                        style={(this.props.page===1)?{backgroundColor:'#213991'}:{}}>
                            Historique
                    </div>

                    <div className="usermenu_devision"></div>
                    <div    className="usermenu_selection" 
                            onClick={()=>{this.props.setpage(0)}}
                            style={(this.props.page===0)?{backgroundColor:'#213991'}:{}}>
                            
                    </div>
                    <div className="usermenu_devision"></div>
                    <div className="usermenu_selection" 
                        onClick={()=>{this.props.setpage(2)}}
                        style={(this.props.page===2)?{backgroundColor:'#213991'}:{}}>
                            
                    </div>
                    <div className="usermenu_devision"></div>
                </div>
            </>
        );
    }
}
export default UserSpaceMenu;