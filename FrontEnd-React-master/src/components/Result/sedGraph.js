import React from "react";

import {Button} from 'react-bootstrap'
import "../style/searchline.css"
class SedGraph extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fileReady: "false",
            isLoading:"false",
            sedName:"",
            firstRender: "true"
            // keepgoing: 0,
            
        }
    }

    isFileReady = async () => {
        fetch(`/api/db_router/sedReady/${this.props.data}`)
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
                console.log(typeof + result)
                console.log(result)
                this.setState({sedName:result})
                this.setState({fileReady: "true"})

            }
        ).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.fileReady !== "true"

    }

    generateSED = () => {
        this.setState({isLoading: "true"})
    }

    render(){

        var button;
        button = <Button onClick={this.generateSED}> Generate SED? </Button>         

        // if(this.state.fileReady === "true"){
        //     console.log(this.state.sedName)
        //     button = <img width={630} height={480} src={"/api/db_router/sed/download/" + this.state.sedName}/>
        // }

        // var button = <Button  className = "loading"> SED Generating </Button> 
        if (this.state.isLoading === "true"){
            button = <Button  className = "loading"> SED Generating </Button> 
            if(this.state.fileReady === "true"){
            console.log(this.state.sedName)
            button = <img width={670} height={520} src={"/api/db_router/sed/download/" + this.state.sedName}/>
        }
        else if(this.state.firstRender === "true"){
            setTimeout(this.isFileReady,1000);
            this.setState({firstRender:"false"})
    
        }
        
            // console.log(this.state.keepgoing)
           
        
    }

        return(
            <div>
                {button}
            </div>
        )
    }

}

export default SedGraph