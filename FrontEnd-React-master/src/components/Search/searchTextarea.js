import React from "react"
import "../style/searchline.css"
import {MyContext} from "./searchContext"

/**
 * Component for rendering a textarea input for entering code.
 * It updates the context with the entered code when the Table state in the context is set to 1.
 */
class SearchTextarea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
        }
    }

    /**
     * Updates the content state with the value of the textarea whenever it changes.
     * @param {Object} event - The event object triggered by the textarea change.
     */
    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    /**
     * Determines if the component should update based on changes in state or props.
     * @param {Object} nextProps - The next props object.
     * @param {Object} nextState - The next state object.
     * @param {Object} nextContext - The next context object.
     * @returns {boolean} - True if the component should update, false otherwise.
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.content !== nextState.content || this.props.Concat !== nextProps.Concat
    }

    render() {
        let command = [`${this.state.content}`]
        if (command.toString() === "") {
            command = []
        }
        command = command.concat(this.props.Concat)

        return (
            <MyContext.Consumer>
                {(context) => (
                    <span>
                        <span>{context.state.Table === 1 ? context.setMessage(command) : ""}</span>
                        <textarea className="textarea-for-input d_inline" onChange={this.handleChange} cols={55}
                                  rows={1} placeholder="Enter your Code here:"/>
                    </span>
                )}
            </MyContext.Consumer>
        )
    }
}

export default SearchTextarea
