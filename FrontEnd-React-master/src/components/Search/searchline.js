import React from "react"
import {Button} from "react-bootstrap"
import "../style/searchline.css"
import SearchUI from "./searchui"
import SearchTextarea from "./searchTextarea"

/**
 * Component for managing a search line, which includes UI for adding, removing, and toggling between different search
 * input modes.
 */
class SearchLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            UIorCode: 1, // Determines whether to render SearchUI (1) or SearchTextarea (0)
        }
        this.sendData = this.sendData.bind(this)
    }

    /**
     * Sends the ID of the current line to be removed.
     */
    sendData() {
        this.props.Remove(this.props.LineId);
    }

    /**
     * Toggles between SearchUI and SearchTextarea modes.
     */
    click_toggle() {
        this.setState(prevState => {
            return {
                UIorCode: prevState.UIorCode ^ 1 // Toggle UIorCode between 0 and 1
            }
        })
    }

    render() {
        // Determine whether to render SearchUI or SearchTextarea based on UIorCode state
        let concat = [")", "AND", "("]
        let content = this.state.UIorCode === 1 ? <SearchUI Concat={concat}/> : <SearchTextarea Concat={concat}/>

        // Render buttons for removing, toggling, and adding search lines
        let button = <Button variant={"light"}
                             style={{margin: "1.5px"}}
                             size="sm"
                             onClick={this.props.LineAdd}>
            Add </Button>;
        let Break
        for (let i = this.props.LineId + 1; i < this.props.RemoveId.length; i++) {
            if (this.props.RemoveId[i] === false) {
                button = null;
                Break = <div>
                    <label className="checkbox-inline-lines"><input type="checkbox" defaultChecked/>Or</label>
                </div>;
                concat = ["OR"]
            }
        }

        // Render buttons for removing, toggling, and adding search lines
        return (<span>
            {content}
            <span className="d_inline">
                <Button variant={"light"} style={{margin: "1.5px"}} size="sm" onClick={this.sendData}
                        className="remove">Remove</Button>
                <Button variant={"light"} style={{margin: "1.5px"}} size="sm"
                        onClick={() => this.click_toggle()}>Toggle</Button>
                {button}
            </span>
            {Break}
        </span>)
    }
}

export default SearchLine
