import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Col} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


import Header from "./components/header"
import Footer from "./components/footer"
import SearchContext from "./components/Search/searchContext"
import ResultWithRouter from "./components/Result/result1"
import Home from "./components/Home/home"
import Teampage from "./components/Information/People/people"
import "./components/style/background.css"
import ColumnDescription from "./components/columnDescription/columnDescription.js"
// import ConeSearchContext from "./components/ConeSearch/coneSearchContext.js"
import TableReferences from "./components/tableReferences/tableReferences.js"


class App extends React.Component {


    render() {

        // var contentInside ={padding:"20px", paddingBottom: "40px"}

        return (
            <div id="classicformpage" className="d-flex flex-column">
                <div className="flex-fill" id="Noblur">
                    <Router>
                        <Col xs={{span: 8, offset: 2}}>
                            <Header/>
                        </Col>
                        {/*
                A <Switch> looks through all its children <Route>
                elements and renders the first one whose path
                matches the current URL. Use a <Switch> any time
                you have multiple routes, but you want only one
                of them to render at a time
              */}
                        <Switch>
                            {/* <Route path="/">
                    
                </Route> */}

                            <Route exact path="/">
                                <Home/>
                            </Route>

                            <Route path="/Search">
                                <Col xs={{span: 12, offset: 0}}>
                                    <SearchContext/>
                                </Col>
                            </Route>

                            <Route path="/People">
                                <Col xs={{span: 12, offset: 0}}>
                                    <Teampage/>
                                </Col>
                            </Route>

                            <Route path="/Result">
                                <Col xs={{span: 12, offset: 0}}>
                                    <ResultWithRouter/>
                                </Col>
                            </Route>

                            <Route path="/Column">
                                <Col xs={{span: 12, offset: 0}}>
                                    <ColumnDescription/>
                                </Col>
                            </Route>

                            <Route path="/References">
                                <Col xs={{span: 12, offset: 0}}>
                                    <TableReferences/>
                                </Col>
                            </Route>
                        </Switch>
                    </Router>

                </div>

                <Footer/>
            </div>
        )
    }
}

export default App;
