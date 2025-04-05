import React from 'react'
import Search from './search'
import {Button} from 'react-bootstrap'
import "../style/searchline.css"
import ResultableWithRouter from "./resultable"

// Create a context for managing state across components
export const MyContext = React.createContext(undefined);

class SearchContext extends React.Component {
    constructor(props) {
        super(props)
        // Initialize state with default values
        this.state = {
            Command: [], // Array to store user commands
            Table: 0, // Flag to toggle table display
            Data: [], // Array to store fetched data
            buttonStyle: 0, // Flag to manage button style
            validate: 0, // Flag to manage user validation
            validator: "", // Variable to store user input for validation
            SimpleUserValidator: " ", // Default value for simple user validation
        }
    }

    // Utility function to translate an array of strings into a SQL command
    TranslateIntoSqlCommand = (array) => {
        let command = ""
        while (array.length > 0) {
            command = command + array.shift() + "SPACE"
        }
        return command
    }

    // Handler for submit button click
    submit = () => {
        this.setState(prevState => {
            return {
                Table: prevState.Table ^ 1, // Toggle Table state
                buttonStyle: prevState.buttonStyle ^ 1, // Toggle button style
                Command: [], // Clear user commands
            }
        })
    }

    // Function to fetch data based on user commands
    fetchByCommand() {
        if (this.state.Command.length >= 1) {
            // Process user command string
            let command = this.state.Command
            const baseString = command[0].substring(16, command[0].length)
            const stringBeforeBracket = baseString.substring(baseString.indexOf(':') + 1, baseString.indexOf("}"))
            const stringAfterBracket = baseString.substring(baseString.indexOf("}") + 1, baseString.length)
            const result = stringBeforeBracket.concat(stringAfterBracket)

            console.log("Processed string: " + result)
            command[0] = result
            command.unshift("(")
            command.pop()
            command.pop()
            console.log("Final command: " + command)

            // Fetch data from backend API using the translated command
            fetch(`/api/db_router/${this.TranslateIntoSqlCommand(command)}`)
                .then(function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status + response.json);
                        return []
                    }
                    return response.text()
                }).then((result) => {
                let data = JSON.parse(result)

                if (data[0].length > 0) {
                    this.setState({Data: data, buttonStyle: 0})
                } else {
                    alert("Query returns no data")
                }
            }).catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
        }
    }

    // Update component only if certain conditions are met
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.validate === 0) {
            return nextState.validate === 1
        }
        return (nextState.Command.length > 0 && !(JSON.stringify(this.state.Command)
            === JSON.stringify(nextState.Command)))
            || (nextState.Data.length > 0
                && !(JSON.stringify(this.state.Data)
                    === JSON.stringify(nextState.Data))) || nextState.Table === 1
    }

    // Handle change for simple user validation.
    handleChange = (event) => {
        this.setState({
            validator: event.target.value
        })
    }

    // Validate user input
    validate = (event) => {
        if (this.state.SimpleUserValidator === this.state.validator) {
            this.setState({
                validate: 1
            })
        }
    }

    render() {
        let submit = <Button className="submitbtn" onClick={this.submit} block>submit</Button>
        if (this.state.buttonStyle === 1) {
            submit = <Button className="submitbtn loading" onClick={this.submit} block>submit </Button>
        }

        let content = <div id="overlay">
            <div style={{margin: "20% 0% 0% 30%"}}>
                <textarea className="d_inline textarea-for-searchContext" onChange={this.handleChange} cols={40}
                          rows={1} placeholder="Enter password to access this page:"/>
                <Button variant={"danger"} size="sm" onClick={this.validate}>Validate</Button>
            </div>
        </div>

        if (this.state.validate === 1) {
            content = <div>
                <div style={{padding: "0% 20%", margin: "0% auto"}}>
                    <Search/>
                    {submit}
                </div>
                {this.fetchByCommand}
                {this.state.Data.length > 0 ? <ResultableWithRouter Data={this.state.Data[0]}/> : ""}
            </div>
        }

        return (
            // Provide state and setMessage function through context
            <MyContext.Provider value={{
                state: this.state, setMessage: (value) => this.setState(prevState => {
                    return {
                        Command: prevState.Command.concat(value), Table: 0
                    }
                }),
            }}>
                {content}
            </MyContext.Provider>
        )
    }
}

export default SearchContext
