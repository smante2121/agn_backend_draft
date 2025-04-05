import React from 'react'
import "../style/searchline.css"
import {Button} from 'react-bootstrap'
import SearchLine from "./searchline"

/**
 * SearchBlock component for managing dynamic search lines within a block.
 * This component allows users to add, remove, and manage search lines within a block.
 */
class SearchBlock extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            LineId: 0, // Tracks the number of search lines in the block
            RemoveId: [false] // Tracks whether each search line should be removed
        }
        this.click_add = this.click_add.bind(this)
        this.click_remove = this.click_remove.bind(this)
    }

    /**
     * Adds a new search line to the block.
     */
    click_add() {
        this.setState(prevState => {
            let new_RemoveId = prevState.RemoveId.concat([false])
            return {
                LineId: prevState.LineId + 1, RemoveId: new_RemoveId,
            }
        })
    }

    /**
     * Removes a search line at the specified index.
     * @param {number} IndexOfRemove - The index of the line to remove.
     */
    click_remove = (IndexOfRemove) => {
        this.setState((prevState) => {
            prevState.RemoveId[IndexOfRemove] = true
        })
        this.update_by_remove(this.state.RemoveId)
        this.forceUpdate()
    }

    /**
     * Sends a request to remove the entire block if no lines are left in it.
     */
    sendData = () => {
        return this.props.RemoveBlock(this.props.BlockId)
    }

    /**
     * Checks if all lines in the block are removed, and triggers block removal if so.
     * @param {Array} array - The array containing removal statuses of lines in the block.
     */
    update_by_remove(array) {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === true) {
                count++;
            }
        }
        if (count === (array.length - 1)) {
            this.sendData()
        }
    }

    render() {
        let Lines = []
        for (let i = 0; i <= this.state.LineId; i++) {
            if (this.state.RemoveId[i] !== true) {
                Lines[i] = <SearchLine LineAdd={this.click_add} Remove={this.click_remove} LineId={i}
                                       CountLines={this.state.LineId} RemoveId={this.state.RemoveId} key={i}/>
            }
        }

        let Add_button = <Button variant="secondary" onClick={this.props.BlockAdd}>Add</Button>
        let Remove_button = <Button variant="secondary" onClick={this.sendData}>Remove</Button>
        let Break
        let count = 0

        for (let i = this.props.BlockId + 1; i < this.props.BlockRemoveId.length; i++) {
            if (this.props.BlockRemoveId[i] === true) {
                count++
            }

            if (i > this.props.BlockId && this.props.BlockRemoveId[i] === false) {
                Add_button = null;
                Break = <div>
                    <label className="checkbox-inline-blocks"><input type="checkbox" defaultChecked/>And</label>
                </div>;
            }
        }

        if (count === this.props.BlockRemoveId.length - 1) {
            Remove_button = null
        }

        return (<div>
            <div className="query_block">
                {Lines}
                <div style={{textAlign: "center"}}>
                    {Add_button}
                    {Remove_button}
                </div>
            </div>
            {Break}
        </div>)
    }
}

export default SearchBlock
