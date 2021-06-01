import React from 'react'
import UserSpaceMenu from './mini/Userspace_menu'
import UserMain from './mini/UserMain.js'

class UserSpace extends React.Component{
    state={
        page:1
    }

    setpage = (page) =>{
        this.setState({page:page})
    }

    render(){
        return(
            <>
                <div className="container" style={{marginLeft:'-15px'}}>
                    <div className="row justify-content-start" style={{margin:''}}>
                        <div className="col-3 usermenu" style={{paddingRight:'0px'}}>
                            <UserSpaceMenu setpage={this.setpage} page={this.state.page}/>
                        </div>
                        <div className="col">
                            <UserMain page={this.state.page}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default UserSpace;