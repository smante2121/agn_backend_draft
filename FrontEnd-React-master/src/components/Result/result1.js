import React from 'react'
import {Image} from "react-bootstrap"
import SedGraph from "./sedGraph"
import "../style/result.css"
import "../style/resultable.css"
// import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
import {Col,Row} from "react-bootstrap"
// for React 16.4.x use: import { ReactTabulator }
import { ReactTabulator } from "react-tabulator"; // for React 15.x
import PropTypes from "prop-types"
import {withRouter} from "react-router-dom"

import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import filter_wavelength from './filter_wavelength'

import { Chart, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

import ColumnDescription from "../columnDescription/columnDescription.js"
import makeModalCallback from "../Search/modal.js"

// Editable Example:
var redshift_table = [
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
var photometric_table = [
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
var morphology_table = [
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


function Result1() {
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired,
  // }
  // state = {
  //   data: [],
  //   // rawData data comes from the url of the page when the user is presented multiple multiple HiPS, and then the user chooses one
  //   rawData:window.location.search.split("=")[1]
  // };
  // const [data, setData] = useState([])
  const [rawData, setrawData] = useState(window.location.search.split("=")[1])
  // console.log("This is raw data: " + rawData)

  const newData = rawData.replace(/\%22/g,'"')
  // console.log("This is new data: " + newData)

  const parsed_newData = JSON.parse(newData)

  // console.log("Key Value: " + parsed_newData.RA)
  const dict = {}

  for(let key in parsed_newData){
    let substring = "_mag"
    let unwanted_e = "e"
    let unwanted_QQlower = "QQlower"
    
    if (key.includes(substring) && !key.includes(unwanted_QQlower) && !key.includes(unwanted_e)){
      dict[key] = parsed_newData[key]
    }
  }
  // console.log(dict)
  // console.log(filter_wavelength)
  
  const filtered_filter_wavelength = {}
  //gets filtered filter_wavelength with respect to what is in dict
  for(let i = 0; i < Object.keys(dict).length;i++){
    for(let j = 0; j < Object.keys(filter_wavelength).length;j++){
      if(Object.keys(dict)[i].includes(Object.keys(filter_wavelength)[j])){
        filtered_filter_wavelength[Object.keys(filter_wavelength)[j]] = filter_wavelength[Object.keys(filter_wavelength)[j]]
      }
    }
  }
  // console.log(filtered_filter_wavelength)
  // console.log(filtered_filter_wavelength.H["Effective wavelength (A)"])
  const x_values = []
  for(let key in filtered_filter_wavelength){
    x_values.push(filtered_filter_wavelength[key]["Effective wavelength (A)"])
  }
  // console.log(x_values)

  const y_values = []
  for(let key in dict){
    y_values.push(dict[key])
  }
  // console.log(y_values)

  let combine = x_values.map((e, i) => [e, y_values[i]])
  // console.log(combine)

  let objs = combine.map(element => ({ 
    x: element[0], 
    y: element[1] 
  }));
  // console.log(objs)

  // CHART
  Chart.register(...registerables);
// y axis ab_mag
  const data = {
    datasets: [
      {
        label: 'Magnitudes at their Effective Wavelengths (A)',
        data: objs,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  
    // const {match, location, history} = this.props
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'ab_mag'
        }
      },
     x: {
        title: {
          display: true,
          text: 'A'
        }
      }
    },
    height: 100,
    movableColumns:true,      //allow column order to be changed
    layout:"fitColumn",
 
  };

    // 1.
    // var rowData = this.props.location.state.data
    // console.log(rowData)
    
    //2. get data from url param
    // let rawData = window.location.search.split("=")[1]

    //raw data is converted to json, so that it can be accessed later

    //aladin applet
    const Aladin = () => {

      useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:0.1 })
          aladin.setFov(0.1)
          aladin.gotoRaDec(parsed_newData.RA,parsed_newData.DEC)
      }, [])
  
      return (
        
          <div id='aladin-lite-div' style={{ width: '400px', height: '400px' }} />
      )
  }



  var rowData = JSON.parse(decodeURIComponent(rawData))
  function myImage(hipsSurvey, width, height, fov, coordsys){
    return <Image id="aside-image" src={`http://alasky.u-strasbg.fr/hips-image-services/hips2fits?hips=${hipsSurvey}&width=${width}&height=${height}&fov=${fov}&projection=TAN&coordsys=${coordsys}&rotation_angle=0.0&ra=${rowData['RA']}&dec=${rowData['DEC']}&format=jpg`} alt="Unable to retrieve image for Skyarea. Check width, height, and FOV boundaries." />
  }
  // var imageLink = `http://alasky.u-strasbg.fr/hips-image-services/hips2fits?hips=CDS%2FP%2FDSS2%2Fred&width=700&height=1000&fov=0.6&projection=TAN&coordsys=icrs&rotation_angle=0.0&ra=${rowData['RA']}&dec=${rowData['DEC']}&format=jpg`
  const validationSchema = Yup.object().shape({
    HiPS_Survey:Yup.string(),
    width: Yup.string()
        .required('width is required'),
    height: Yup.string()
        .required('height is required'),
    fov: Yup.string()
        .required('fov is required'),
    coordsys: Yup.string()
        .required('coordsys is required')
});
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const [image, setImage] = useState(myImage("CDS%2FP%2FSDSS9%2Fcolor",1200,900,0.016,"icrs"))
    const [isSubmitted, setisSubmitted] = useState(false)
    const [switchedToAladin, setSwitchedToAladin] = useState(false)

    const toggleToAladin = () => {
      setSwitchedToAladin(true)
    }

    const toggleToHips2fits = () => {
      setSwitchedToAladin(false)
    }

    function onSubmit(data) {
      
      setisSubmitted(true)
      let newHipsSurveyData = data.HiPS_Survey.replaceAll('/','%2F')
      let updatedImage = myImage(newHipsSurveyData, parseInt(data.width),parseInt(data.height),parseFloat(data.fov),data.coordsys)
      setImage( image => ({
        ...image,
        ...updatedImage
      }))
      return false;
  }


  morphology_table = morphology_table.filter(entry =>{
    if (rowData[entry['title']] !== null & rowData[entry['title']] !==undefined ){
      return true
    }
  })
  redshift_table = redshift_table.filter(entry =>{
    if (rowData[entry['title']] !== null &rowData[entry['title']] !==undefined ){
      return true
    }
  })
  photometric_table = photometric_table.filter(entry =>{
    if (rowData[entry['title']] !== null & rowData[entry['title']] !==undefined ){
      return true
    }
  })

  const Hips2fitsImage = () => {
    return (<div>
{isSubmitted ? image : image}
    <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                  <div className="form-group col">
                    <h6>(Default width is 1200 pixels, height is 900 pixels, FOV is 0.016 deg2, coordsys is ICRS)</h6>
                    {/* <br></br> */}
                      <label id="label-font">HiPS Survey</label>
                      <select name="survey" {...register('HiPS_Survey')} className={`form-control ${errors.HiPS_Survey ? 'is-invalid' : ''}`}>
                          <option value="CDS/P/SDSS9/color">CDS/P/SDSS9/color (Best Selection)</option>
                          <option value="CDS/P/PanSTARRS/DR1/color-i-r-g">CDS/P/PanSTARRS/DR1/color-i-r-g (Best Selection)</option>
                          <option value="CDS/P/DSS2/color">CDS/P/DSS2/color</option>
                          <option value="CDS/P/DSS2/red">CDS/P/DSS2/red</option>
                          <option value="CDS/P/PanSTARRS/DR1/g">CDS/P/PanSTARRS/DR1/g</option>
                          <option value="CDS/P/PanSTARRS/DR1/z">CDS/P/PanSTARRS/DR1/z</option>
                          <option value="CDS/P/PanSTARRS/DR1/color-z-zg-g">CDS/P/PanSTARRS/DR1/color-z-zg-g</option>
                          <option value="CDS/P/2MASS/color">CDS/P/2MASS/color</option>
                          <option value="CDS/P/AKARI/FIS/Color">CDS/P/AKARI/FIS/Color</option>
                          <option value="ESAVO/P/HERSCHEL/PACS-color">ESAVO/P/HERSCHEL/PACS-color</option>
                          <option value="ESAVO/P/HERSCHEL/PACS100norm">ESAVO/P/HERSCHEL/PACS100norm</option>
                          <option value="CDS/P/AKARI/FIS/Color">CDS/P/AKARI/FIS/Color</option>

                      </select>
                      <div className="invalid-feedback">{errors.HiPS_Survey?.message}</div>
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-3">
                      <label id="label-font">Width</label>
                      <input name="width" type="text" {...register('width')} className={`form-control ${errors.width ? 'is-invalid' : ''}`} placeholder="pixels"/>
                      <div className="invalid-feedback">{errors.width?.message}</div>
                  </div>
                  <div className="form-group col-3">
                      <label id="label-font">Height</label>
                      <input name="height" type="text" {...register('height')} className={`form-control ${errors.height ? 'is-invalid' : ''}`} placeholder="pixels"/>
                      <div className="invalid-feedback">{errors.height?.message}</div>
                  </div>
                  <div className="form-group col">
                      <label id="label-font">FOV</label>
                      <input name="fov" type="text" {...register('fov')} className={`form-control ${errors.fov ? 'is-invalid' : ''}`} placeholder="decimal degree (DD)"/>
                      <div className="invalid-feedback">{errors.fov?.message}</div>
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col">
                      <label id="label-font">COORDSYS</label>
                      <select name="coordsys" {...register('coordsys')} className={`form-control ${errors.coordsys ? 'is-invalid' : ''}`}>
                          <option value="icrs">ICRS</option>
                          <option value="galactic">Galactic</option>
                      </select>
                      <div className="invalid-feedback">{errors.coordsys?.message}</div>
                  </div>
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-1">Register</button>
                  <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                  <button type="button" onClick={toggleToAladin} className="btn btn-danger">Launch Aladin Lite</button>
              </div>
            </form>
    </div>)
    
  }

  const AladinLite = () => {
   return (<div>
     <Aladin/>
     <button type="button" onClick={toggleToHips2fits} className="btn btn-danger">Launch HiPs2fits image</button>
     </div>)
  }

  const Toggle = () => {
    if(switchedToAladin){
      return <AladinLite/>
    }
    else{
      return <Hips2fitsImage/>
    }
  }
  
  return (
    <div>
      <Row md = {{span:8,offset:2}}>
      <Col xs = {{span:4,offset:2}} style={{display: 'inline', paddingTop:"2%"}} id="content">
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
                <td>{rowData['RA'].toString().substring(0,5)}</td>
                <td>{rowData['DEC'].toString().substring(0,5)}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend style={{width: '45%'}}>Redshift properties</legend>
          <ReactTabulator columns={redshift_table} data={[rowData]} options = {options}/>
        </fieldset>

        <fieldset>
          <legend style={{width: '56%'}}>Photometric properties</legend>
          <ReactTabulator columns={photometric_table} data={[rowData]} options = {options}/>
        </fieldset>

        <fieldset>
          <legend style={{width: '54%'}}>Morphology properties</legend>
          <ReactTabulator columns = {morphology_table} data={[rowData]} options = {options}/>
        </fieldset>
        
      </Col>
      
      <Col xs = {{span:4 }} style = {{ paddingTop:"2%"}}>
        <Toggle/>
      
        <Scatter 
          height={30} 
          width = {40} 
          options={options} 
          data={data} />
          
      </Col>
      
    </Row>

    <Row md = {{span:8,offset:2}}>
      <Col></Col>
      <Col>
        <SedGraph data = {rawData} />
      </Col>
      <Col></Col>

    </Row>
    {/* <SedGraph data = {rawData} /> */}
    
    </div>
  );
}


const ResultWithRouter = withRouter(Result1)
export default ResultWithRouter;
