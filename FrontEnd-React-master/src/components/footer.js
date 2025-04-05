import React from 'react'
import "./style/searchline.css"
import "./style/header-footer.css"
import {Col} from "react-bootstrap"

class Footer extends React.Component {


    render() {
        return (<Col xs={{span: 8, offset: 2}}>
                <span className="d_inline">
                    <p> AGN-DB is supported by the University of Miami</p>
                </span>
                <span>
                    <button> </button>
                </span>
                <div className="d_inline">
                    <p>Copyright © 2024, <a href="https://welcome.miami.edu/">University of Miami</a></p>
                </div>
            </Col>)
    }
}


export default Footer

