import React from 'react'
import "../style/searchline.css"
import SearchBlock from "./searchblock"

/**
 * Search component for managing dynamic search blocks.
 * This component allows users to add, remove, and submit search blocks.
 */
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            BlockId: 0, // Tracks the number of search blocks
            BlockRemoveId: [false], // Tracks whether each search block should be removed
            Table: 0, // Tracks the state of the table (e.g., whether to display search results)
            Data: null, // Placeholder for search data (not used in this code snippet)
            Command: [], // Placeholder for search commands (not used in this code snippet)
        }
        this.click_add = this.click_add.bind(this)
        this.click_remove = this.click_remove.bind(this)
    }

    /**
     * Adds a new search block.
     */
    click_add() {
        this.setState(prevState => {
            let new_BlockRemoveId = this.state.BlockRemoveId.concat([false])
            return {
                BlockId: prevState.BlockId + 1, BlockRemoveId: new_BlockRemoveId
            }
        })
    }

    /**
     * Removes a search block at the specified index.
     * @param {number} Index_of_Remove - The index of the block to remove.
     */
    click_remove = (Index_of_Remove) => {
        this.setState(prevState => prevState.BlockRemoveId[Index_of_Remove] = true)
        this.forceUpdate();
    }

    /**
     * Toggles the state of the table (e.g., shows/hides search results).
     */
    submit = () => {
        this.setState(prevState => {
            return {
                Table: prevState.Table ^ 1
            }
        })
    }

    render() {
        let Blocks = []
        for (let i = 0; i <= this.state.BlockId; i++) {
            if (this.state.BlockRemoveId[i] !== true) {
                Blocks[i] = <SearchBlock BlockAdd={this.click_add} RemoveBlock={this.click_remove}
                                         CountBlocks={this.state.BlockId} BlockRemoveId={this.state.BlockRemoveId}
                                         BlockId={i} key={i}/>
            }
        }
        return (<div>
            {Blocks}
        </div>)
    }
}

export default Search
