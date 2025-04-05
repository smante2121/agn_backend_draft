import React from 'react'
import {Image, Tooltip,Button,OverlayTrigger } from "react-bootstrap"
import {MDBCol,  MDBIcon, MDBContainer } from "mdbreact";
import "../../style/people.css"
import { Container } from 'react-bootstrap';

class Individual extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            description: this.props.person.description.slice(0,1000),
            restText: this.props.person.description.slice(1000,this.props.person.description.length ),
            height:0
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         height: document.getElementById(this.props.person.name).clientHeight + "px"
    //     })
    // }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.height !== nextState.height
    }

    render(){

        var pic_style = {
            float: "left",
            width: "75%",
            display:"block",
            margin:"0 auto",
        }

     

        
        // var res =   <OverlayTrigger
        //                 placement="bottom"
        //                 overlay={<Tooltip id="button-tooltip-2">{this.state.restText}</Tooltip>}
        //             >
        //                 <span style = {{color: "blue"}}>...</span>
        //             </OverlayTrigger>
        // if (this.state.restText.length == 0){
        //     res = ""
        // }



        var description = <p className=" grey-text">
                                {this.state.description}
                                {/* {res} */}
                            </p>
        console.log(this.state.height)
        if (this.state.restText.length > 0){
            description = <div className="scrollbar scrollbar-primary grey-text"  style = {{maxHeight:this.state.height}}>
                            {this.state.description + this.state.restText}
                            {/* {res} */}
                         </div>
        }

        return(
        
            <MDBCol lg="12" md="12" className="mb-5"
                 >
                <MDBCol md="4" lg="6" className="float-left" id = {this.props.person.name} >

                    <Image src = {this.props.person.link} style = {pic_style} ref = {el =>{
                        if (!el) return
                            this.setState({height: 0.75*el.getBoundingClientRect().width + "px"
                    })}}/>

                </MDBCol>

                <MDBCol md="8" lg="6" className="float-right">
                    <div>
                        <h4 className="font-weight-bold mb-3">{this.props.person.name}</h4>
                        <h6 className="font-weight-bold grey-text mb-3">
                            {this.props.person.title}
                        </h6>
                        {description}
                        {/* <a href="#!" className="p-2 fa-lg fb-ic">
                            <MDBIcon fab icon="facebook-f" />
                        </a>
                        <a href="#!" className="p-2 fa-lg tw-ic">
                            <MDBIcon fab icon="twitter" />
                        </a>
                        <a href="#!" className="p-2 fa-lg dribbble-ic">
                            <MDBIcon fab icon="dribbble" />
                        </a> */}
                    </div>
                </MDBCol>
            </MDBCol>
     
        )
    }
}

export default Individual