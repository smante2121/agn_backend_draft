import React from 'react'
import {Image} from "react-bootstrap"
import "../style/result.css"
import "../style/resultable.css"
import Logo from "./cutout-CDS_P_DSS2_red.jpg"
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

// for React 16.4.x use: import { ReactTabulator }
import { ReactTabulator } from "react-tabulator"; // for React 15.x

import {Col,Row} from "react-bootstrap"

const redshift_table = [
  {title:"ab_Z", field:"ab_Z"},
  {title:"c_phot_Z", field:"c_phot_Z"},
  {title:"e_phot_Z", field:"e_phot_Z"},
  {title:"e_SDSS_Z", field:"e_SDSS_Z"},
  {title:"e_Z", field:"e_Z"},
  {title:"f_full_Z", field:"f_full_Z"},
  {title:"f_high_Z", field:"f_high_Z"},
  {title:"f_low_Z", field:"f_low_Z"},
  {title:"f_mid_Z", field:"f_mid_Z"},
  {title:"f_source_Z", field:"f_source_Z"},
  {title:"f_unc_Z", field:"f_unc_Z"},
  {title:"f_Z", field:"f_Z"},
  {title:"FWHM_P_Z", field:"FWHM_P_Z"},
  {title:"hrf_Z", field:"hrf_Z"},
  {title:"l_phot_Z", field:"l_phot_Z"},
  {title:"max_phot_Z", field:"max_phot_Z"},
  {title:"min_phot_Z", field:"min_phot_Z"},
  {title:"Mgii_Z", field:"Mgii_Z"},
  {title:"Method_Z", field:"Method_Z"},
  {title:"OIII_Z", field:"OIII_Z"},
  {title:"phot_Z", field:"phot_Z"},
  {title:"p_phot_Z", field:"p_phot_Z"},
  {title:"p_P_Z", field:"p_P_Z"},
  {title:"P_full_Z", field:"P_full_Z"},
  {title:"PS_Z_pos", field:"PS_Z_pos"},
  {title:"q_Z", field:"q_Z"},
  {title:"SPEC_Z", field:"SPEC_Z"},
  {title:"SDSS_Z", field:"SDSS_Z"},
  {title:"u_phot_Z", field:"u_phot_Z"},
  {title:"vi_Z", field:"vi_Z"},
  {title:"Z", field:"Z"},
];
const photometric_table = [
  {title:"g_mag", field:"g_mag"},
  {title:"g_mag_error", field:"g_mag_error"},
  {title:"H_mag", field:"H_mag"},
  {title:"H_mag_error", field:"H_mag_error"},
  {title:"i_extinction ", field:"i_extinction "},
  {title:"i_mag", field:"i_mag"},
  {title:"i_mag_error", field:"i_mag_error"},
  {title:"I_mag", field:"I_mag"},
  {title:"I_mag_error", field:"I_mag_error"},
  {title:"J_mag", field:"J_mag"},
  {title:"K_mag", field:"K_mag"},
  {title:"K_mag_errpr", field:"K_mag_errpr"},
  {title:"lrl1", field:"lrl1"},
  {title:"lxl1", field:"lxl1"},
  {title:"Magnitude and filter_ned", field:"Magnitude and filter_ned"},
  {title:"NUV_mag", field:"NUV_mag"},
  {title:"NUV_mag_error", field:"NUV_mag_error"},
  {title:"n_FRad_3LAC_lowlat.fit", field:"n_FRad_3LAC_lowlat.fit"},
  {title:"r_extinction", field:"r_extinction"},
  {title:"r_mag", field:"r_mag"},
  {title:"r_mag_error", field:"r_mag_error"},
  {title:"rf1", field:"rf1"},
  {title:"rf2", field:"rf2"},
  {title:"rf3", field:"rf3"},
  {title:"rf4", field:"rf4"},
  {title:"rf5", field:"rf5"},
  {title:"rf6", field:"rf6"},
  {title:"rf7", field:"rf7"},
  {title:"rf8", field:"rf8"},
  {title:"rf9", field:"rf9"},
  {title:"rf10", field:"rf10"},
  {title:"erf10", field:"erf10"},
  {title:"rf11", field:"rf11"},
  {title:"rf12", field:"rf12"},
  {title:"erf12", field:"erf12"},
  {title:"rf13", field:"rf13"},
  {title:"rf14", field:"rf14"},
  {title:"R_mag", field:"R_mag"},
  {title:"R_mag_error", field:"R_mag_error"},
  {title:"sfirl", field:"sfirl"},
  {title:"snr_W1", field:"snr_W1"},
  {title:"snr_W2", field:"snr_W2"},
  {title:"snr_W3", field:"snr_W3"},
  {title:"1450Mag", field:"1450Mag"},
  {title:"1450mag", field:"1450mag"},
  {title:"AIR_L", field:"AIR_L"},
  {title:"AT_L", field:"AT_L"},
  {title:"B_luminosity", field:"B_luminosity"},
  {title:"B_mag", field:"B_mag"},
  {title:"B_mag_error", field:"B_mag_error"},
  {title:"E_B_V", field:"E_B_V"},
  {title:"FIRSTirf", field:"FIRSTirf"},
  {title:"FIRSTprf", field:"FIRSTprf"},
  {title:"FIRSTrf_rms", field:"FIRSTrf_rms"},
  {title:"FLUX_QUAL_U_simbad", field:"FLUX_QUAL_U_simbad"},
  {title:"FLUX_SYSTEM_B_simbad", field:"FLUX_SYSTEM_B_simbad"},
  {title:"FLUX_SYSTEM_H_simbad", field:"FLUX_SYSTEM_H_simbad"},
  {title:"FLUX_SYSTEM_I_simbad", field:"FLUX_SYSTEM_I_simbad"},
  {title:"FLUX_SYSTEM_J_simbad", field:"FLUX_SYSTEM_J_simbad"},
  {title:"FLUX_SYSTEM_K_simbad", field:"FLUX_SYSTEM_K_simbad"},
  {title:"FLUX_SYSTEM_R_simbad", field:"FLUX_SYSTEM_R_simbad"},{title:"rf1", field:"rf1"},
  {title:"FLUX_SYSTEM_U_simbad", field:"FLUX_SYSTEM_U_simbad"},
  {title:"FLUX_SYSTEM_V_simbad", field:"FLUX_SYSTEM_V_simbad"},
  {title:"FLUX_SYSTEM_g_simbad", field:"FLUX_SYSTEM_g_simbad"},
  {title:"FLUX_SYSTEM_i_simbad", field:"FLUX_SYSTEM_i_simbad"},
  {title:"FLUX_SYSTEM_r_simbad", field:"FLUX_SYSTEM_r_simbad"},
  {title:"FLUX_SYSTEM_u_simbad", field:"FLUX_SYSTEM_u_simbad"},
  {title:"FLUX_SYSTEM_z_simbad", field:"FLUX_SYSTEM_z_simbad"},
  {title:"FLUX_UNIT_B_simbad", field:"FLUX_UNIT_B_simbad"},
  {title:"FLUX_UNIT_H_simbad", field:"FLUX_UNIT_H_simbad"},
  {title:"FLUX_UNIT_I_simbad", field:"FLUX_UNIT_I_simbad"},
  {title:"FLUX_UNIT_K_simbad", field:"FLUX_UNIT_K_simbad"},
  {title:"FLUX_UNIT_R_simbad", field:"FLUX_UNIT_R_simbad"},
  {title:"FLUX_UNIT_U_simbad", field:"FLUX_UNIT_U_simbad"},
  {title:"FLUX_UNIT_V_simbad", field:"FLUX_UNIT_V_simbad"},
  {title:"FLUX_UNIT_g_simbad", field:"FLUX_UNIT_g_simbad"},
  {title:"FLUX_UNIT_i_simbad", field:"FLUX_UNIT_i_simbad"},
  {title:"FLUX_UNIT_r_simbad", field:"FLUX_UNIT_r_simbad"},
  {title:"FLUX_UNIT_u_simbad", field:"FLUX_UNIT_u_simbad"},
  {title:"FLUX_UNIT_z_simbad", field:"FLUX_UNIT_z_simbad"},
  {title:"FUV_mag", field:"FUV_mag"},
  {title:"FUV_mag_error", field:"FUV_mag_error"},
  {title:"g_extinction", field:"g_extinction"},
  {title:"snr_W4", field:"snr_W4"},
  {title:"snr_g", field:"snr_g"},
  {title:"snr_i", field:"snr_i"},
  {title:"snr_u", field:"snr_u"},
  {title:"tirl", field:"tirl"},
  {title:"U_mag", field:"U_mag"},
  {title:"U_mag_error", field:"U_mag_error"},
  {title:"u_extinction", field:"u_extinction"},
  {title:"u_mag", field:"u_mag"},
  {title:"u_mag_error", field:"u_mag_error"},
  {title:"V_mag", field:"V_mag"},
  {title:"V_mag_error", field:"V_mag_error"},
  {title:"W1_mag", field:"W1_mag"},
  {title:"W1_mag_error", field:"W1_mag_error"},
  {title:"W2_mag", field:"W2_mag"},
  {title:"W2_mag_error", field:"W2_mag_error"},
  {title:"W3_mag", field:"W3_mag"},
  {title:"W3_mag_error", field:"W3_mag_error"},
  {title:"W4_mag", field:"W4_mag"},
  {title:"W4_mag_error", field:"W4_mag_error"},
  {title:"xc1", field:"xc1"},
  {title:"exc1", field:"exc1"},
  {title:"xc2", field:"xc2"},
  {title:"exc2", field:"exc2"},
  {title:"xc3", field:"xc3"},
  {title:"exc3", field:"exc3"},
  {title:"xc4", field:"xc4"},
  {title:"exc4", field:"exc4"},
  {title:"xcr1", field:"xcr1"},
  {title:"xcr2", field:"xcr2"},
  {title:"excr2", field:"excr2"},
  {title:"xcr3", field:"xcr3"},
  {title:"excr3", field:"excr3"},
  {title:"xcr4", field:"xcr4"},
  {title:"rxcr4", field:"rxcr4"},
  {title:"xcr5", field:"xcr5"},
  {title:"excr5", field:"excr5"},
  {title:"xf1", field:"xf1"},
  {title:"exf1", field:"exf1"},
  {title:"xf2", field:"xf2"},
  {title:"exf2", field:"exf2"},
  {title:"exf3", field:"exf3"},
  {title:"xf4", field:"xf4"},
  {title:"xf5", field:"xf5"},
  {title:"exf5", field:"exf5"},
  {title:"xf6", field:"xf6"},
  {title:"exf6", field:"exf6"},
  {title:"xf7", field:"xf7"},
  {title:"xf8", field:"xf8"},
  {title:"xf9", field:"xf9"},
  {title:"exf9", field:"exf9"},
  {title:"xf10", field:"xf10"},
  {title:"exf10", field:"exf10"},
  {title:"xf11", field:"xf11"},
  {title:"xf12", field:"xf12"},
  {title:"xf12", field:"xf12"},
  {title:"xf13", field:"xf13"},
  {title:"exf13", field:"exf13"},
  {title:"xfd1", field:"xfd1"},
  {title:"exfd1", field:"exfd1"},
  {title:"xl1", field:"xl1"},
  {title:"xl2", field:"xl2"},
  {title:"xl3", field:"xl3"},
  {title:"xl4", field:"xl4"},
  {title:"xl5", field:"xl5"},
  {title:"Y_mag", field:"Y_mag"},
  {title:"Y_mag_error", field:"Y_mag_error"},
  {title:"z_extinction", field:"z_extinction"},
  {title:"z_mag", field:"z_mag"},
  {title:"z_mag_error", field:"rf6"},
  {title:"Photometry Points_ned", field:"Photometry Points_ned"},//
  {title:"uv_NBCKDE.fit", field:"uv_NBCKDE.fit"},//
  {title:"velocities:Value_simbad", field:"velocities:Value_simbad"},//
  {title:"velocities:me_simbad", field:"velocities:me_simbad"},//
  {title:"Velocity_ned", field:"Velocity_ned"},//
];
const morphology_table = [
  {title:"spec_class", field:"spec_class"},
  {title:"vi_class", field:"vi_class"},
  {title:"gen_class", field:"gen_class"},
  {title:"SED_class", field:"SED_class"},
  {title:"optical_class", field:"optical_class"},
  {title:"Mtypc", field:"Mtypc"},
  {title:"f_bal", field:"f_bal"},
  {title:"f_class", field:"f_class"},
  {title:"f_star", field:"f_star"},
  {title:"f_off", field:"f_off"},
  {title:"f_beam", field:"f_beam"},
  {title:"source_class", field:"source_class"},
  {title:"temp_class", field:"temp_class"},
  {title:"He2_N2", field:"He2_N2"},
  {title:"N2_O3", field:"N2_O3"},
  {title:"O1_O3", field:"O1_O3"},
  {title:"O3_O1", field:"O3_O1"},
  {title:"S2_O3", field:"S2_O3"},
  {title:"p_galaxy", field:"p_galaxy"},
  {title:"p_outlier", field:"p_outlier"},
  {title:"p_star", field:"p_star"},
  {title:"p_qso_Z", field:"p_qso_Z"},



];
class Result extends React.Component{
  render(){
    const options = {          
      height: 250,
      movableRows: true,
      addRowPos:"top",          //when adding a new row, add it to the top of the table
      history:true,             //allow undo and redo actions on the table
      pagination:"local",       //paginate the data
      paginationSize:7,         //allow 7 rows per page of data
      movableColumns:true,      //allow column order to be changed
      resizableRows:true,
      layout:"fitColumn"
    };
    return(
      <Row md = {{span:8,offset:2}}>
        <Col xs = {{span:4,offset:1}} style={{display: 'inline'}} id="content">
          <fieldset>
            <legend style={{width: '45%'}}> Skyarea properties </legend>
            <table className="table">
              <tbody> 
                <tr>
                  <th>System</th>
                  <th>RA Range</th>
                  <th>Dec Range</th>
                </tr>
                <tr>
                  <td>Equatorial</td>
                  <td>06:03:23</td>
                  <td>20:09:50</td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          <fieldset>
            <legend style={{width: '45%'}}>Redshift properties</legend>
            {console.log(redshift_table)}
            {/* <ReactTabulator columns={redshift_table} options = {options}/> */}
          </fieldset>

          <fieldset>
            <legend style={{width: '56%'}}>Photometric properties</legend>
            {/* <ReactTabulator columns={photometric_table}  options = {options}/> */}
          </fieldset>

          <fieldset>
            <legend style={{width: '54%'}}>Morphology properties</legend>
            {/* <ReactTabulator columns={morphology_table}  options = {options}/> */}
          </fieldset>
          
        </Col>
          
        

        <Col xs = {{span:4 , offset:1}}>
          <Image id="aside-image" src={Logo} alt="Image for Skyarea" />
          <img id="SED-image" src="https://www.researchgate.net/profile/Andreas_Lundgren/publication/42372595/figure/fig1/AS:281206311669805@1444056217768/Spectral-energy-distribution-of-the-lensed-galaxyTo-illustrate-how-the-spectral-energy.png" alt="Image for the SEDs" />
        </Col>
      </Row>
      
      
    )
  }
}

export default Result

