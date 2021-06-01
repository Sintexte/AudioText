import React from 'react'
import {Navbar,Nav,Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {AiOutlineUser} from 'react-icons/ai'
import {SiAudioboom} from 'react-icons/si'
import {Language} from '../../language/Lang'

class Header extends React.Component{
    state = {
        lg:Language[localStorage.getItem('language')].Main.header 
    }

    render(){
        return (
            <>
                    <Navbar className="bgcoolblue softshadow navheader" variant="dark">

                        <Link to="/" >

                            <Navbar.Brand>
                                <SiAudioboom  title={this.state.lg.WebsiteName}/>
                            </Navbar.Brand>
                        </Link>
                        <span className='header_links' onClick={()=>{this.props.set_page(0)}}>
                            Download File
                        </span>
                        
                        <span className='header_links' onClick={()=>{this.props.set_page(1)}}>
                            Recording 
                        </span>

                        <Nav className="mr-auto">
                        {/*
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>*/
                        }
                        </Nav>
                        <Form inline>
                            <Button variant="outline-light" title={this.state.lg.btnuser} onClick={()=>{this.props.set_page(3)}}>
                                    <AiOutlineUser />
                            </Button>
                            <span style={{color:'white',paddingLeft:'10px',paddingRight:'10px'}}>
                                |
                            </span>
                            <Button variant="outline-light" title={this.state.lg.btnlogoff} onClick={(e)=>{
                                    e.preventDefault()
                                    this.props.logoff()
                                }}>
                                <FiLogOut />
                            </Button>
                        </Form>
                    </Navbar>
                </>
        )
    }
}
export default Header;