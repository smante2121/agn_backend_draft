import React from 'react'
import "./style/header-footer.css"
import{Nav,NavDropdown,Navbar} from 'react-bootstrap'
import {NavLink, withRouter, Link} from "react-router-dom"

class Header extends React.Component{
    constructor(){
        super()
        this.state = {
            style : {fontSize: "20px",
                     color : "black ",
                     fontWeight: "bold"
                    },
            activeStyle: {
                    color : "black",
                    textDecoration: "underline",
                    }
        }
        
    }

    render(){      

        

        return (
            <Navbar bg="light" expand="lg" className = "transparent">
                <Navbar.Brand href="#home">AGN-DB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <NavLink style = {this.state.style} exact to ="/" className = {"navbar"} activeStyle = {this.state.activeStyle}>Home</NavLink>
                    <NavLink style = {this.state.style} exact to ="/Search" className = {"navbar"} activeStyle = {this.state.activeStyle}>Search</NavLink>
                    {/* <NavLink style = {this.state.style} exact to ="/ConeSearch" className = {"navbar"} activeStyle = {this.state.activeStyle}>ConeSearch</NavLink> */}
                    {/* <NavLink style = {this.state.style} exact to ="/Result" className = {"navbar"} activeStyle = {this.state.activeStyle}>Result</NavLink> */}
                    <NavLink style = {this.state.style} exact to = "/People" className = {"navbar"} activeStyle = {this.state.activeStyle}>People</NavLink>
                    <NavDropdown style = {this.state.style} title="Information" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Reference</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Contact us</NavDropdown.Item>
                        <NavDropdown.Item href="/Column" target="_blank">Column Description</NavDropdown.Item>
                        <NavDropdown.Item href="/References" target="_blank">Table References</NavDropdown.Item>

                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
   
        )
    }
}

export default Header