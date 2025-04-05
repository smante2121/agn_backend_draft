import React from "react";
import "../style/resultable.css";
import ResultDownload from "./resultdownload"
import PropTypes from "prop-types"
import {withRouter} from "react-router-dom"
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import {ReactTabulator} from "react-tabulator"; // for React 15.x
import ColumnDescription from "../columnDescription/columnDescription.js"
import makeModalCallback from "./modal.js"

class Resultable extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired, location: PropTypes.object.isRequired, history: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            data: [], rowData: "",
        };
    }

    rowClick = (e, row) => {
        function removeNull(data) {
            for (let propName in data) {
                if (data[propName] === null ||
                    data[propName] === undefined ||
                    propName.slice(0, 7) === "Unnamed" ||
                    propName === "nan_column") {
                    delete data[propName];
                }
            }
            return data
        }

        let data = removeNull(row.getData())
        let url = `/Result?data=${JSON.stringify(data)}`
        // console.log(data)
        window.open(url, '_blank')

    }

    render() {
        const {match, location, history} = this.props

        const options = {
            height: 600,
            movableRows: true,
            pagination: "local", //paginate the data
            paginationSize: 15, //allow 14 rows per page of data
            resizableRows: true,
            layout: "fitColumn",
            columnMaxWidth: 250,
        };

        // Create Columns
        let Columns = Object.keys(this.props.Data[0]);

        function createColumns(entry) {
            entry = entry.split("QQupper")[0].split("QQlower")[0].split("RA")[0].split("DEC")[0].split('Unnamed')[0]
            if (entry.length > 0) {
                return {title: entry, field: entry}
            }
        }

        Columns = Columns.map(createColumns)
        Columns = Columns.filter(x => x !== undefined)

        let data = this.props.Data

        const decimalCount = num => {
            // Convert to String
            const numStr = String(num);
            // String Contains Decimal
            if (numStr.includes('.')) {
                return numStr.split('.')[1].length;
            }

            // String Does Not Contain Decimal
            return 0;
        }

        const roundToThousandth = (value) => {
            return Number(value.toFixed(3));
        };

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < Columns.length; j++) {
                if (typeof data[i][Columns[j]['title']] === "number" && decimalCount(data[i][Columns[j]['title']]) > 3) {
                    data[i][Columns[j]['title']] = roundToThousandth(data[i][Columns[j]['title']])
                }
            }
        }

        // console.log(JSON.stringify(data[1]))

        function priCol(data, Columns, pageNumber) {
            let usefulColumn = []

            for (let i = 0; i < Math.min(pageNumber, data.length); i++) {
                let column = Columns

                column = column.filter(entry => {
                    if (data[i][entry['title']] !== undefined && data[i][entry['title']] !== null) {
                        return true
                    }
                })
                usefulColumn.push(column)
            }

            for (let i = 1; i < Math.min(pageNumber, data.length); i++) {
                for (let j = 0; j < usefulColumn[0].length; j++) {
                    if (!usefulColumn[0].includes(usefulColumn[i][j])) {
                        usefulColumn[0].push(usefulColumn[i][j])
                    }
                }
            }

            return (usefulColumn[0])
        }

        Columns = priCol(data, Columns, Math.min(7, data.length))
        Columns = Columns.filter(x => x !== undefined)
        Columns.shift()
        let a = [{title: "RA", field: "RA"}, {title: "DEC", field: "DEC"}]
        Columns = a.concat(Columns)

        for (let i = 0; i < data.length; i++) {
            data[i][Columns[0]['title']] = Number(data[i][Columns[0]['title']].toFixed(7))
            data[i][Columns[1]['title']] = Number(data[i][Columns[1]['title']].toFixed(7))
        }
        // console.log(Columns)
        // console.log(data)

        //give each column header a modal description when double-clicked
        const columnDescription = new ColumnDescription();
        for (let i = 0; i < Columns.length; i++) {
            let title = Columns[i].title
            let description = columnDescription.describeVariable(title);
            // console.log("Title(" + title + ") Description(" + description + ")")
            Columns[i].headerDblClick = makeModalCallback(title, description)
        }

        return (<div>
                <ReactTabulator rowClick={this.rowClick} columns={Columns} data={data} options={options}/>
                {/* <h3>Infinite Scrolling with Ajax Requests</h3> */}
                {/* {this.renderAjaxScrollExample()} */}
                <p>
                    Double click on a column header for more information on that variable.<br/>
                    Click on a row for the detailed source page of that source.
                </p>
                <ResultDownload/>
            </div>);
    }
}

const ResultableWithRouter = withRouter(Resultable)
export default ResultableWithRouter;



