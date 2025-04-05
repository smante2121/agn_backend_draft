import React from "react"
import "../style/searchline.css"
import {MyContext} from "./searchContext"
import AsyncSelect from 'react-select/async'

/**
 * SearchUI component for the database search functionality.
 * This component allows users to input search criteria and displays the search results.
 */
class SearchUI extends React.Component {
    /**
     * Constructor for SearchUI component.
     * Initializes the component state.
     * @param {object} props - The props passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            content1: null, // Stores the value of the first search criteria.
            content2: "",   // Stores the operator (e.g., "=", "<", ">") for the search criteria.
            content3: "",   // Stores the value of the second search criteria.
            update: 0,      // Used to trigger updates in the component.
            inputValue: ''  // Stores the current input value for the search field.
        };
    }

    /**
     * Event handler for updating the inputValue state when the input value changes.
     * @param {string} value - The new input value.
     */
    handleInputChange = (value) => {
        this.setState({inputValue: value})
        // console.log("InputValue: " + this.state.inputValue)    
    }

    handleChange1 = (value) => {
        this.setState({content1: value})
        // console.log("Content 1: " + this.state.content1)
    }
    handleChange2 = (event) => {
        this.setState({content2: event.target.value})
        // console.log(this.state.content2)
    }
    handleChange3 = (event) => {
        this.setState({content3: event.target.value})
        // console.log(this.state.content3)
    }


    fetchColumn = async () => {
        return fetch(`/api/db_router/columntable`) // TODO: Figure out which version of db_router this is referring to.
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status + response.json);
                    alert("file download failed, please try again")
                    return []
                }
                return response.text()
            }).then((result) => {

                let columnObj = JSON.parse(result)

                const keys = Object.keys(columnObj)
                const values = Object.values(columnObj)

                let merged = keys.map(function (x, i) {
                    return {index: x, value: values[i]}
                });

                if (this.state.inputValue === "") {
                    return merged
                } else {
                    return merged.filter(object => {
                        return object.value.includes(this.state.inputValue)
                    })
                }
            }).catch(function (err) {
                console.log('Fetch Error :-S', err);
            });

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.content1 !== nextState.content1
            || this.state.content2 !== nextState.content2
            || this.state.content3 !== nextState.content3
            || this.props.Concat !== nextProps.Concat
    }


    /**
     * Renders the SearchUI component.
     * @returns {JSX.Element} - The JSX for the component UI.
     */
    render() {
        let command = [`${JSON.stringify(this.state.content1).replace(
            /"/g, '`')}${this.state.content2}${this.state.content3}`
        ]

        if (command.toString() === "") {
            command = []
        }
        command = command.concat(this.props.Concat)

        console.log("Command " + command)
        return (

            <MyContext.Consumer>
                {(context) => (

                    <span>
                    <span>{context.state.Table === 1 ? context.setMessage(command) : ""}</span>

                    <div style={{display: 'flex', flexDirection: 'row', paddingTop: "20px", paddingBottom: "20px"}}>
                        <div style={{width: '35%'}}>
                            <AsyncSelect

                                cacheOptions
                                defaultOptions
                                value={this.state.content1}
                                getOptionLabel={e => e.value}
                                loadOptions={this.fetchColumn}
                                onInputChange={this.handleInputChange}
                                onChange={e => this.handleChange1(e)}

                            />
                        </div>
                    
                    
                        <select value={this.state.content2} onChange={this.handleChange2}>
                        <option></option>
                        <option>=</option>
                        <option>&lt;</option>
                        <option>&gt;</option>
                        <option>&lt;=</option>
                        <option>&gt;=</option>
                        </select>
                    
                        <input list="constraints" name="MyConstraints" value={this.state.content3}
                               onChange={this.handleChange3}/>
                        <datalist id="constraints">

                        </datalist>
                    
                    </div>
                </span>)}

            </MyContext.Consumer>

        )
    }
}

export default SearchUI