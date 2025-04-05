import React from 'react'
import {Button} from 'react-bootstrap'
import {MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';

class ColumnDescription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            //An array of all variables shown in the search.
            //The description is the text shown in that variable's tooltip
            //and on the Column Description chart.
            //hasUncertainty is true if the variable has an uncertainty value.
            Variables: [
                {name: "RA", description: "RA in degrees", hasUncertainty: false},
                {name: "DEC", description: "DEC in degrees", hasUncertainty: false},

                //_ned block
                {name: "Magnitude and Filter_ned", description: "Magnitude and Filter from ned", hasUncertainty: false},
                {name: "Photometry Points_ned", description: "Photometry Points from ned", hasUncertainty: false},

                //_simbad block
                {name: "FLUX_QUAL_U_simbad", description: "FLUX_QUAL_U from simbad", hasUncertainty: false},
                {name: "FLUX_SYSTEM_B_simbad", description: "FLUX_SYSTEM_B from simbad", hasUncertainty: false},
                {name: "FLUX_UNIT_B_simbad", description: "FLUX_UNIT_B from simbad", hasUncertainty: false},
                {name: "FLUX_SYSTEM_V_simbad", description: "FLUX_SYSTEM_V from simbad", hasUncertainty: false},
                {name: "FLUX_UNIT_V_simbad", description: "FLUX_UNIT_V from simbad", hasUncertainty: false},
                {name: "FLUX_SYSTEM_J_simbad", description: "FLUX_SYSTEM_J from simbad", hasUncertainty: false},
                {name: "FLUX_UNIT_J_simbad", description: "FLUX_UNIT_J from simbad", hasUncertainty: false},
                {name: "FLUX_SYSTEM_H_simbad", description: "FLUX_SYSTEM_H from simbad", hasUncertainty: false},
                {name: "FLUX_UNIT_H_simbad", description: "FLUX_UNIT_H from simbad", hasUncertainty: false},
                {name: "FLUX_SYSTEM_K_simbad", description: "FLUX_SYSTEM_K from simbad", hasUncertainty: false},
                {name: "FLUX_UNIT_K_simbad", description: "FLUX_UNIT_K from simbad", hasUncertainty: false},
                {name: "FLUX_SYSTEM_g_simbad", description: "FLUX_SYSTEM_g from simbad", hasUncertainty: false},
                {name: "FLUX_UNIT_g_simbad", description: "FLUX_UNIT_g from simbad", hasUncertainty: false},
                {name: "FLUX_SYSTEM_z_simbad", description: "FLUX_SYSTEM_z from simbad", hasUncertainty: false},
                {name: "FLUX_UNIT_z_simbad", description: "FLUX_UNIT_z from simbad", hasUncertainty: false},
                {name: "velocities:Value_simbad", description: "velocities:Value from simbad", hasUncertainty: false},
                {name: "velocities:me_simbad", description: "velocities:me from simbad", hasUncertainty: false},

                //_mag and _extinction block
                {name: "B_mag", description: "AB magnitude B", hasUncertainty: true},
                {name: "V_mag", description: "AB magnitude V", hasUncertainty: true},
                {name: "J_mag", description: "AB magnitude J", hasUncertainty: true},
                {name: "H_mag", description: "AB magnitude H", hasUncertainty: true},
                {name: "K_mag", description: "AB magnitude K", hasUncertainty: true},
                {name: "u_extinction", description: "extinction in the u band", hasUncertainty: false},
                {name: "g_mag", description: "AB magnitude g", hasUncertainty: true},
                {name: "g_extinction", description: "extinction in the g band", hasUncertainty: false},
                {name: "r_extinction", description: "extinction in the r band", hasUncertainty: false},
                {name: "i_extinction", description: "extinction in the i band", hasUncertainty: false},
                {name: "z_mag", description: "AB magnitude z", hasUncertainty: true},
                {name: "z_extinction", description: "extinction in the z band", hasUncertainty: false},
                {name: "Y_mag", description: "AB magnitude Y", hasUncertainty: true},
                {name: "W1_mag", description: "AB magnitude W1", hasUncertainty: true},
                {name: "W2_mag", description: "AB magnitude W2", hasUncertainty: true},
                {name: "W3_mag", description: "AB magnitude W3", hasUncertainty: true},
                {name: "W4_mag", description: "AB magnitude W4", hasUncertainty: true},
                {name: "FUV_mag", description: "AB magnitude FUV", hasUncertainty: true},
                {name: "NUV_mag", description: "AB magnitude NUV", hasUncertainty: true},

                {name: "spec_Z", description: "spectroscopic redshift", hasUncertainty: true},
                {name: "phot_Z", description: "photometric redshift", hasUncertainty: true},
                {name: "Z", description: "generic redshift, it can be either phot or spec", hasUncertainty: true},
                {name: "q_Z", description: "redshift quality flag (not yet implemented)", hasUncertainty: false},
                {name: "min_phot_Z", description: "photometric redshift lower value", hasUncertainty: false},
                {name: "max_phot_Z", description: "photometric redshift upper value", hasUncertainty: false},
                {name: "p_phot_Z", description: "photo-z quality", hasUncertainty: false},
                {name: "best_Z", description: "best redshift the order spec_z>photo_z>Z", hasUncertainty: true},
                {name: "f_best_Z", description: "flag on best redshift (not yet implemented)", hasUncertainty: false},
                //{name: "*_simbad", description: "infos from simbad"},
                //{name: "*_ned", description: "infos from ned"},
                {name: "SP_TYPE_simbad", description: "SP_TYPE from simbad", hasUncertainty: false},
                {name: "spec_class", description: "spectroscopic classification", hasUncertainty: false},
                {name: "gen_class", description: "generic classification", hasUncertainty: false},
                {name: "SED_class", description: "SED classification", hasUncertainty: false},
                {name: "spec_class", description: "spectroscopic classification", hasUncertainty: false},
                {name: "xray_class", description: "classification from xrays, extended or point-like", hasUncertainty: false},
                {name: "image_class", description: "classification based on visual examination", hasUncertainty: false},
                {name: "best_class", description: "priority classification following the above order", hasUncertainty: false},
                //{name: "*_mag", description: "AB magnitudes"},
                //{name: "xf*", description: "xray fluxes in units of erg/s/cm2"},
                //{name: "xfd*", description: "xray flux density in erg/cm2/s/Hz at 2 keV"},
                //{name: "counts*", description: "xray counts"},
                //{name: "xcr*", description: "xray count rates in cts/sec"},
                //{name: "HR*", description: "xray hardness ratio"},
                //{name: "rf*", description: "IR/radio fluxes in mJy"},
                {name: "E_B-V", description: "extinction", hasUncertainty: false},
                //{name: "snr_*", description: "signal to noise ratio"},
                //{name: "e_*", description: "e_ before a quantity is its uncertainty"},

                //NOTES on Xray bands:
                {name: "xf1", description: "0.1-2.4 keV", hasUncertainty: true},
                {name: "xf2", description: "0.2-12 keV", hasUncertainty: true},
                {name: "xf3", description: "0.2-2 keV", hasUncertainty: true},
                {name: "xf4", description: "0.5-10 keV", hasUncertainty: true},
                {name: "xf5", description: "0.5-2 keV", hasUncertainty: true},
                {name: "xf6", description: "0.5-4.5 keV", hasUncertainty: true},
                {name: "xf7", description: "0.5-7 keV", hasUncertainty: true},
                {name: "xf8", description: "BAT flux 14–195 keV", hasUncertainty: true},
                {name: "xf9", description: "2-10 keV", hasUncertainty: true},
                {name: "xf10", description: "2-12 keV", hasUncertainty: true},
                {name: "xf11", description: "2-7 keV", hasUncertainty: true},
                {name: "xf12", description: "Fermi Flux 100 MeV - 100 GeV", hasUncertainty: true},
                {name: "xf13", description: "4.5-7.5 keV", hasUncertainty: true},
                {name: "xf14", description: "0.2-0.5 keV", hasUncertainty: true},
                {name: "xf15", description: "0.5-1 keV", hasUncertainty: true},
                {name: "xf16", description: "1-2 keV", hasUncertainty: true},
                {name: "xf17", description: "2-4.5 keV", hasUncertainty: true},
                {name: "xf18", description: "4.5-12 keV", hasUncertainty: true},
                {name: "xf19", description: "Fermi Flux 1 - 100 GeV", hasUncertainty: true},
                {name: "xf20", description: "CSC m band 1.2-2.0 keV", hasUncertainty: true},
                {name: "xf21", description: "CSC s band 0.5-1.2 keV", hasUncertainty: true},
                {name: "xf22", description: "CSC u band 0.2-0.5 keV", hasUncertainty: true},
                {name: "xf23", description: "CSC w band ∼0.1-10.0 keV", hasUncertainty: true},
                {name: "xf24", description: "18-55 keV", hasUncertainty: false},
                {name: "xf25", description: "2.3-5 keV (eROSITA)", hasUncertainty: false},
                {name: "xf26", description: "0.2-5 keV (eROSITA)", hasUncertainty: false},
                //{name: "e_xcr1", description: "uncertainty of xcr1"},//e here
                //{name: "e_xfd1", description: "uncertainty of xfd1"},//e here
                {name: "counts", description: "(cts/s) follows the above numbers for the bands", hasUncertainty: true},
                {name: "xcr", description: "(cts/s) follows the above numbers for the bands", hasUncertainty: false},
                {name: "HR1", description: "from 4XMM_DR10cat_v1.0.fits", hasUncertainty: true},
                {name: "HR2", description: "from 4XMM_DR10cat_v1.0.fits", hasUncertainty: true},
                {name: "HR3", description: "from 4XMM_DR10cat_v1.0.fits", hasUncertainty: true},
                {name: "HR4", description: "from 4XMM_DR10cat_v1.0.fits", hasUncertainty: true},
                {name: "HR5", description: "HRhm from csc2master.fits", hasUncertainty: true},
                {name: "HR6", description: "HRhs from csc2master.fits", hasUncertainty: true},
                {name: "HR7", description: "HRms from csc2master.fits", hasUncertainty: true},
                {name: "HR8", description: "between 0.5-2 and 2-4.5 keV", hasUncertainty: true},
                {name: "HR9", description: "between 0.5-2 and 2-7 keV", hasUncertainty: true},
                {name: "HR10", description: "between 0.5-2 and 2-10 keV", hasUncertainty: false},

                //NOTES on radio/IR bands:
                {name: "rf1", description: "[]", hasUncertainty: false},
                {name: "rf2", description: "100 um", hasUncertainty: true},
                {name: "rf3", description: "12 um, WISE Ch3", hasUncertainty: true},
                {name: "rf4", description: "160 um", hasUncertainty: true},
                {name: "rf5", description: "20 cm", hasUncertainty: true},
                {name: "rf6", description: "21 cm/1.4 GHz", hasUncertainty: true},
                {name: "rf7", description: "24 um", hasUncertainty: true},
                {name: "rf8", description: "250 um", hasUncertainty: true},
                {name: "rf9", description: "3.4 um, WISE Ch1", hasUncertainty: true},
                {name: "rf10", description: "3.6 um, IRAC Ch1", hasUncertainty: true},
                {name: "rf11", description: "350 um", hasUncertainty: true},
                {name: "rf12", description: "4.5 um, IRAC Ch2", hasUncertainty: true},
                {name: "rf13", description: "4.6 um, WISE Ch2", hasUncertainty: true},
                {name: "rf14", description: "500 um", hasUncertainty: true},
                {name: "rf15", description: "8.0 um, IRAC Ch4", hasUncertainty: true},
                {name: "rf16", description: "5.8 um, IRAC Ch3", hasUncertainty: true},
                {name: "rf17", description: "143 GHz", hasUncertainty: false},
                {name: "rf18", description: "20 GHz", hasUncertainty: false},
                {name: "rf19", description: "8 GHz", hasUncertainty: false},
                {name: "rf20", description: "5 Ghz", hasUncertainty: false},
                {name: "rf21", description: "0.15 GHz", hasUncertainty: false},
                //{name: "e_F143", description: "uncertainty of F143"},//e here

                //snr_ block
                {name: "snr_g", description: "g signal to noise ratio", hasUncertainty: false},
                {name: "snr_i", description: "i signal to noise ratio", hasUncertainty: false},
                {name: "snr_r", description: "r signal to noise ratio", hasUncertainty: false},
                {name: "snr_u", description: "u signal to noise ratio", hasUncertainty: false},
                {name: "snr_z", description: "z signal to noise ratio", hasUncertainty: false},
                {name: "snr_W1", description: "W1 signal to noise ratio", hasUncertainty: false},
                {name: "snr_W2", description: "W2 signal to noise ratio", hasUncertainty: false},
                {name: "snr_W3", description: "W3 signal to noise ratio", hasUncertainty: false},
                {name: "snr_W4", description: "W4 signal to noise ratio", hasUncertainty: false},
            ]
        }
    }

    collapseGuide = () => {
        let content = document.getElementById("columnDescription");
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    //Takes in a variable and returns its matching description.
    //If the variable is not found, it is returned and an error is printed to the console.
    describeVariable = (toFind) => {
        for (let i = 0; i < this.state.Variables.length; i++) {
            if (toFind.length > 2 && toFind.substring(0, 2) === "e_") {
                //console.log("\"" + toFind + "\" found, returning \"uncertainty of "+ toFind.slice(2) + "\"");
                return ("uncertainty of " + toFind.slice(2))
            }
            let variable = this.state.Variables[i]
            if (variable.name === toFind) {
                // console.log("\"" + toFind + "\" found, returning \""+ variable.description + "\"");
                return variable.description;
            }
        }
        console.log("Error: no description found for \"" + toFind + "\"");
        return toFind;
    }

    makeTable = () => {
        let TableBody = []
        for (let i = 0; i < this.state.Variables.length; i++) {
            let variable = this.state.Variables[i]
            let uncertainty = ""
            if (variable.hasUncertainty != null && variable.hasUncertainty === true) {
                uncertainty = "e_" + variable.name
            }
            let row = []
            row.push(
                <td>{variable.name}</td>,
                <td>{uncertainty}</td>,
                <td>{variable.description}</td>
            )
            TableBody.push(<tr>{row}</tr>)
        }
        return TableBody;
    }

    render() {
        // add scrollY maxHeight="200px" for smaller, scrollable section
        let Table = <MDBTable striped small>
            <MDBTableHead color="info-color" textWhite>
                <tr>
                    <th width="20%">Column</th>
                    <th width="20%">Corresponding Uncertainty</th>
                    <th>Description</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {this.makeTable()}
            </MDBTableBody>
        </MDBTable>

        let Guide = <div>
            {this.collapseGuide}
            <Button variant={"info"} onClick={this.collapseGuide}>Column Description</Button>
            <div id="columnDescription" style={{display: 'none'}}>
                {Table}
            </div>
        </div>

        return (
            <div>
                <br/>
                {Table} {/*call Guide instead of Table if you want it to be collapsible*/}
            </div>
        )
    }
}

export default ColumnDescription