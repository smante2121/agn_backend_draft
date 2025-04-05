import React from "react";

import {Button} from 'react-bootstrap'
import "../style/searchline.css"
class ResultDownload extends React.Component{
    constructor(){
        super()
        this.state={
            fileReady: "false",
            // keepgoing: 0,
            
        }
    }

    isFileReady = () => {
        fetch(`/api/db_router/ready/download`)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status+ response.json);
                    alert("file download failed, please try again")
                    return []
                }   
                return response.text()
            }
        ).then(
            (result) => {
                // console.log(result)
                this.setState({fileReady: result})
            }
        ).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

    }

    // Keepgoing = () =>{
    //     this.setState(prevState =>{
    //         return{
    //             keepgoing:prevState.keepgoing + 1 
    //         }
    //     })
    // }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.fileReady !== "true"

    }

    render(){
        var button = <Button onClick = {this.isFileReady}  className = "loading"> Download </Button> 
        
        if (this.state.fileReady === "true"){
            button = <Button  href="http://astro.physics.miami.edu/api/db_router/download/download">Download</Button>
        }
        else{
            // console.log(this.state.keepgoing)
            setTimeout(this.isFileReady, 5000);
            
        }
        
        

        return(
            <div>
                {/* <span>{this.state.fileReady !== "true" ? this.forceUpdate():""}</span> */}
        
                {button}
            </div>
        )
    }

}

export default ResultDownload