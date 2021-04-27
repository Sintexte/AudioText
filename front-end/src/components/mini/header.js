import React from 'react'
import {Navbar,Nav,Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

class Header extends React.Component{
    render(){
        return (
            <>
                    <Navbar className="bgcoolblue softshadow navheader" variant="dark">

                        <Link to="/" >
                            <Navbar.Brand>
                                AudioText
                            </Navbar.Brand>
                        </Link>
                        <Nav className="mr-auto">
                        {/*
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>*/
                        }
                        </Nav>
                        <Form inline>
                            <Button variant="outline-light" onClick={(e)=>{
                                e.preventDefault()
                                this.props.logoff()
                            }}>Log Off</Button>
                        </Form>
                    </Navbar>
                </>
        )
    }
}
export default Header;