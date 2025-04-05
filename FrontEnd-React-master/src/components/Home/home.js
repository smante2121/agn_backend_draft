import React from "react"
import {Container, Image} from "react-bootstrap"
import blackhole from "./Blackhole/blackhole.jpg"
// import AwesomeButtonProgress from "react-awesome-button/src/components/AwesomeButtonProgress"
class Home extends React.Component{
    constructor(){
        super()
    }
    renderAjaxScrollExample = () => {
        const columns = [
          { title: 'First Name', field: 'first_name', width: 150 },
          { title: 'Last Name', field: 'last_name', width: 150 },
          { title: 'Email', field: 'email', width: 150 },
        ]
        const options = {
          height: 150,
          movableRows: true,
          ajaxProgressiveLoad: 'scroll',
          ajaxProgressiveLoadDelay: 200,
          ajaxProgressiveLoadScrollMargin: 100,
          ajaxURL: 'https://reqres.in/api/users',
          paginationDataSent: {
            page: 'page',
            size: 'per_page' // change 'size' param to 'per_page'
          },
          paginationDataReceived: {
            last_page: 'total_pages'
          },
          current_page: 1,
          paginationSize: 3,
          ajaxResponse: function(url, params, response) {
            console.log('ajaxResponse', url);
            return response; //return the response data to tabulator
          },
          ajaxError: function(error) {
            console.log('ajaxError', error);
          }
        }
    }

    render(){
        var pic_style = {
            padding: "20px",
            margin:"auto",
        }
        // var awesomeSubmit = <AwesomeButtonProgress 
        //                     type = "secondary" 
        //                     size = "large"
        //                     // action={(this.submit)}
        //                     > Primary
        //                     </AwesomeButtonProgress>
        return(
            <Container style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image src = {blackhole} style = {pic_style} />
                {/* {awesomeSubmit} */}
                {this.renderAjaxScrollExample()}
            </Container>
        )
    }
}

export default Home