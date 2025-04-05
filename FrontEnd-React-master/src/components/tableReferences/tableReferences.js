import React from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class TableReferences extends React.Component{
    constructor(props){
        super(props)
        this.state = {

            //An array of all information sources shown in the search.
            //The catalog is the catalog for that row
            //The ref is the references for that row
            //The refLink is the hyperlink you go to when clicking the ref text
            References: [
                // {name: "name1", catalog: "catalog1", ref: "link", refLink: "https://www.google.com"},
                {catalog: "2MRS", name: "2MRS_AGN.fit", ref: "Zaw+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019ApJ...872..134Z/abstract"},
                {catalog: "2QZ", name: "2QZ.fit", ref: "Croom+04", refLink: "https://ui.adsabs.harvard.edu/abs/2004ApJ...606..126C/abstract"},
                {catalog: "2SLAQ", name: "2slaqqso.fit", ref: "Croom+04", refLink: "https://ui.adsabs.harvard.edu/abs/2004MNRAS.349.1397C/abstract"},
                {catalog: "3FGL Fermi cleanups", name: "3FGL2.fits", ref: "Paiano+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019ApJ...871..162P/abstract"},
                {catalog: "3LAC", name: "3LAC_highlat.fit, 3LAC_lowlat.fit, 3LAC_table7.fit", ref: "Acero+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015ApJS..218...23A/abstract"},
                {catalog: "4XMM_DR10", name: "4XMM_DR10cat_v1.0.fits", ref: "Webb+20", refLink: "https://ui.adsabs.harvard.edu/abs/2020A%26A...641A.136W/abstract"},
                {catalog: "AGNELA", name: "AGNELA.tbl", ref: "Agnello+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018MNRAS.475.2086A/abstract"},
                {catalog: "AKARI_J1757+5907", name: "AKARI_NED.tbl", ref: "Aoki+11", refLink: "https://ui.adsabs.harvard.edu/abs/2011PASJ...63S.457A/abstract"},
                {catalog: "ALMA_decarli", name: "alma_decarli.fits", ref: "Decarli+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018ApJ...854...97D/abstract"},
                {catalog: "ATLAS", name: "ATLAS.fits", ref: "Mao+12", refLink: "https://ui.adsabs.harvard.edu/abs/2012MNRAS.426.3334M/abstract"},
                {catalog: "BAHM", name: "BAHM_NED.fits", ref: "Banerji+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015MNRAS.447.3368B/abstract"},
                {catalog: "BASS", name: "BASS_agns.fit", ref: "Koss+17", refLink: "https://ui.adsabs.harvard.edu/abs/2017ApJ...850...74K/abstract"},
                {catalog: "BAT-105M", name: "BAT-105M.fits", ref: "Oh+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018ApJS..235....4O/abstract"},
                {catalog: "BGGFC", name: "BGGFC_tb1.xlsx, BGGFC_tb2.xlsx", ref: "Boutsia+15", refLink: "https://ui.adsabs.harvard.edu/abs/2018ApJ...869...20B/abstract"},
                {catalog: "BQLS", name: "BQLS.tbl", ref: "More+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016MNRAS.456.1595M/abstract"},
                {catalog: "BZCAT", name: "BZCAT.fit", ref: "Massaro+09", refLink: "https://ui.adsabs.harvard.edu/abs/2009A%26A...495..691M/abstract"},
                {catalog: "C-COSM", name: "C-COSM_catalog.fit", ref: "Marchesi+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016ApJ...817...34M/abstract"},
                {catalog: "CDFS7", name: "CDFS7.fit", ref: "Luo+17", refLink: "https://ui.adsabs.harvard.edu/abs/2017ApJS..228....2L/abstract"},
                {catalog: "CSC2.0", name: "csc2master.fits", ref: "CSC2.0", refLink: "https://cxc.cfa.harvard.edu/csc/"},
                {catalog: "ChaMP", name: "ChaMP.tbl", ref: "Trichas+12", refLink: "https://ui.adsabs.harvard.edu/abs/2012ApJS..200...17T/abstract"},
                {catalog: "DEEP", name: "zcat.deep2.dr4_agn.fits", ref: "Newman+12", refLink: "https://ui.adsabs.harvard.edu/abs/2013ApJS..208....5N/abstract"},
                {catalog: "DR14Q", name: "DR14Q_v4_4.fits", ref: "Paris+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018A%26A...613A..51P/abstract"},
                {catalog: "DR16Q", name: "DR16Q_Superset_v3.fits", ref: "Like+20", refLink: "https://ui.adsabs.harvard.edu/abs/2020ApJS..250....8L/abstract"},
                {catalog: "DUHIZ", name: "DUHIZ_tb2.fits, DUHIZ_tb3.fits", ref: "Wang+17", refLink: "https://ui.adsabs.harvard.edu/abs/2017ApJ...839...27W/abstract"},
                {catalog: "DUz6", name: "DUz6table3.fits, DUz6table6.fits", ref: "Wang+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019ApJ...884...30W/abstract"},
                {catalog: "ELQS-N", name: "ELQS-S.txt", ref: "Schindler+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019ApJ...871..258S/abstract"},
                {catalog: "ELQS-S", name: "ELQS-N.txt", ref: "Schindler+17", refLink: "https://ui.adsabs.harvard.edu/abs/2017ApJ...851...13S/abstract"},
                {catalog: "F2M_REDQSO", name: "F2M_REDQSO.fits", ref: "Urrutia+09", refLink: "https://ui.adsabs.harvard.edu/abs/2009ApJ...698.1095U/abstract"},
                {catalog: "FISCBA", name: "FISCBA.tbl", ref: "Fischer+98", refLink: "https://ui.adsabs.harvard.edu/abs/1998ApJ...503L.127F/abstract"},
                {catalog: "GL-DB", name: "GLDB_tbl2.fits", ref: "Ostrovski+17", refLink: "https://ui.adsabs.harvard.edu/abs/2017MNRAS.465.4325O/abstract"},
                {catalog: "GLIKMAN", name: "glikmanAGN.fits", ref: "Glikman+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018ApJ...861...37G/abstract"},
                {catalog: "GaiaUnwise", name: "Gaia_unWISE_AGNs.fits", ref: "Shu+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019MNRAS.489.4741S/abstract"},
                {catalog: "HAQC", name: "HAQC.fits", ref: "Heintz+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016A%26A...595A..13H/abstract"},
                {catalog: "HEINTZ", name: "HEINTZ.tbl", ref: "Heintz+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018A%26A...615A..43H/abstract"},
                {catalog: "HELLAS2XMM", name: "HELLAS2XMM.fit, HELLAS2XMMe.fit", ref: "Cocchia+07", refLink: "https://ui.adsabs.harvard.edu/abs/2007A%26A...466...31C/abstract"},
                {catalog: "IANTEG", name: "IANTEG_AGN.vot, simbad_agn.vot", ref: "Masetti+13", refLink: "https://ui.adsabs.harvard.edu/abs/2013A%26A...556A.120M/abstract"},
                {catalog: "IBIS", name: "IBIS.fit", ref: "Malizia+12", refLink: "https://ui.adsabs.harvard.edu/abs/2012MNRAS.426.1750M/abstract"},
                {catalog: "IKEDA", name: "IKEDA.tbl, IKEDA_tb1.xlsx, IKEDA_tb2.xlsx", ref: "Ikeda+17", refLink: "https://ui.adsabs.harvard.edu/abs/2017ApJ...846...57I/abstract"},
                {catalog: "KQCG", name: "kqcg.fit", ref: "Liao+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019RAA....19...29L/abstract"},
                {catalog: "LAMDR4", name: "LAMQ4.fits", ref: "LAMOST", refLink: "http://dr4.lamost.org/doc/data-production-description"},
                {catalog: "LAMQ3", name: "LAMQ3_tb12.fit, LAMQ3_tb13.fit", ref: "Dong+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018AJ....155..189D/abstract"},
                {catalog: "LIRAS", name: "LIRAS_hdet1.fit, LIRAS_hdet2.fit, LIRAS_nondet.fit", ref: "Xu+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015ApJS..219...18X/abstract"},
                {catalog: "LSSA", name: "LSSA.tbl", ref: "Lucey+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018MNRAS.476..927L/abstract"},
                {catalog: "LUMIz5", name: "LUMItb3.fits, LUMItb4.fits", ref: "Yang+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018AJ....155..110Y/abstract"},
                {catalog: "MALS-N", name: "MALS-N.fits", ref: "Krogager+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018ApJS..235...10K/abstract"},
                {catalog: "MFJC", name: "MFJC_Sample.fit, MFJC_table5.fit", ref: "McGreer+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018AJ....155..131M/abstract"},
                {catalog: "MHH", name: "MHH.fit", ref: "Meusinger+11", refLink: "https://ui.adsabs.harvard.edu/abs/2011A%26A...525A..37M/abstract"},
                {catalog: "MZZ", name: "MZZ.tbl", ref: "Marano+88", refLink: "https://ui.adsabs.harvard.edu/abs/1988MNRAS.232..111M/abstract"},
                {catalog: "NBCKDE", name: "NBCKDE.fit", ref: "Richards+09", refLink: "https://ui.adsabs.harvard.edu/abs/2009ApJS..180...67R/abstract"},
                {catalog: "NBCKv3", name: "NBCKv3_cand.fit, NBCKv3_master.fit", ref: "Richards+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015ApJS..219...39R/abstract"},
                {catalog: "OVRLAP", name: "OVRLAP.tbl", ref: "Jiang+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015AJ....149..188J/abstract"},
                {catalog: "OzDES", name: "OzDES.fit", ref: "Tie+17", refLink: "https://ui.adsabs.harvard.edu/abs/2017AJ....153..107T/abstract"},
                {catalog: "PHILLI", name: "PHILLI.tbl", ref: "Phillips+00", refLink: "https://ui.adsabs.harvard.edu/abs/2000MNRAS.319L...7P/abstract"},
                {catalog: "PS1", name: "highzqso.fit, table9.fit", ref: "Banados+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016ApJS..227...11B/abstract"},
                {catalog: "PS1MAZ", name: "PS1MAZ.tbl", ref: "Mazzucchelli+17", refLink: "https://ui.adsabs.harvard.edu/abs/2017ApJ...849...91M/abstract"},
                {catalog: "PSO", name: "PSO.tbl", ref: "Venemans+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015ApJ...801L..11V/abstract"},
                {catalog: "QPQ10", name: "QPQ10.tbl", ref: "Findlay+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018ApJS..236...44F/abstract"},
                {catalog: "REQ4", name: "tb2_REQ4.txt, tb3_REQ4.txt", ref: "Yang+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019AJ....157..236Y/abstract"},
                {catalog: "RLQ", name: "RLQ_tb4.fit", ref: "Tuccillo+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015MNRAS.449.2818T/abstract"},
                {catalog: "S82X", name: "S82X_catalog_with_photozs_unique_Xraysrcs_likely_cps_2021.fits", ref: "LaMassa+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016ApJ...817..172L/abstract"},
                {catalog: "SDLENS", name: "SDLENS.tbl", ref: "Williams+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018MNRAS.477L..70W/abstract"},
                {catalog: "SDSSHI", name: "SDSSHI.tbl", ref: "Jiang+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016ApJ...833..222J/abstract"},
                {catalog: "SHELQS", name: "SHELQS.tbl, SHELQStbls.fits", ref: "Matsuoka+19", refLink: "https://ui.adsabs.harvard.edu/abs/2018ApJ...869..150M/abstract"},
                {catalog: "SIX", name: "SIX.fit", ref: "Bottacini+12", refLink: "https://ui.adsabs.harvard.edu/abs/2012ApJS..201...34B/abstract"},
                {catalog: "SPIDERS DR14", name: "VAC_spiders_2RXS_DR14.fits, VAC_spiders_XMMSL_DR14.fits, spiders_quasar_bhmass-DR14.fits", ref: "Coffey+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019A%26A...625A.123C/abstract"},
                {catalog: "SPIN18", name: "SPIN18.tbl", ref: "Spiniello+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018MNRAS.480.1163S/abstract"},
                {catalog: "SPIN19", name: "spin19_tbls.fits", ref: "Spiniello+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019MNRAS.485.5086S/abstract"},
                {catalog: "SQLS", name: "SQLS_tb1.fit, SQLS_tb3.fit, SQLS_tb4.fit, SQLS_tb5.fit, SQLS_tb6.fit", ref: "Inada+12", refLink: "https://ui.adsabs.harvard.edu/abs/2012AJ....143..119I/abstract"},
                {catalog: "SQUAD", name: "DR1_quasars_master.csv", ref: "Murphy+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019MNRAS.482.3458M/abstract"},
                {catalog: "SUV", name: "SUV.tbl, SUV_tbs.fits", ref: "Yang+17", refLink: "https://ui.adsabs.harvard.edu/abs/2017AJ....154..269Y/abstract"},
                {catalog: "SXDF", name: "SXDF.fits", ref: "Simpson+12", refLink: "https://ui.adsabs.harvard.edu/abs/2012MNRAS.421.3060S/abstract"},
                {catalog: "SXDS", name: "SXDS.tbl, SXDS_abc.fits", ref: "Akiyama+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015PASJ...67...82A/abstract"},
                {catalog: "UFS", name: "UFS_tb1.fit, UFS_tb2.fit", ref: "Glikman+13", refLink: "https://ui.adsabs.harvard.edu/abs/2013ApJ...778..127G/abstract"},
                {catalog: "ULTRA", name: "ULTRA.tbl", ref: "Wu+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015IAUGA..2251223W/abstract"},
                {catalog: "UVQS", name: "UVQS_tb4.fit", ref: "Monroe+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016AJ....152...25M/abstract"},
                {catalog: "VAQL", name: "VAQL.tbl", ref: "Chehade+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018MNRAS.478.1649C/abstract"},
                {catalog: "VDES2", name: "VDES2.fits", ref: "Reed+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019MNRAS.487.1874R/abstract"},
                {catalog: "VIKING", name: "VIKING.tbl", ref: "Venemans+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015MNRAS.453.2259V/abstract"},
                {catalog: "VIPERS", name: "VIPERS_W1_SPECTRO_PDR2.fits, VIPERS_W4_SPECTRO_PDR2.fits", ref: "Scodeggio+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018A%26A...609A..84S/abstract"},
                {catalog: "VMC", name: "VMC.tbl", ref: "Ivanov+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016A%26A...588A..93I/abstract"},
                {catalog: "WARSAW", name: "WARSAW.tbl", ref: "Kostrzewa-Rutkowska+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018MNRAS.476..663K/abstract"},
                {catalog: "WGD", name: "WGD.fits", ref: "Agnello+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018MNRAS.479.4345A/abstract"},
                {catalog: "WISEA", name: "WISEA.fit", ref: "Secrest+15", refLink: "https://ui.adsabs.harvard.edu/abs/2015ApJS..221...12S/abstract"},
                {catalog: "WISEHI", name: "WISEHI_highzqso.fit, WISEHI_tb1.fit", ref: "Wang+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016ApJ...819...24W/abstract"},
                {catalog: "WOLF1", name: "WOLF1.fits", ref: "Wolf+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018PASA...35...24W/abstract"},
                {catalog: "XLSS", name: "XLSS.fit", ref: "Stalin+10", refLink: "https://ui.adsabs.harvard.edu/abs/2010MNRAS.401..294S/abstract"},
                {catalog: "XMM-XXL", name: "XXL_tb2master.fit", ref: "Liu+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016MNRAS.459.1602L/abstract"},
                {catalog: "XMMSMC", name: "XMMSMCtb4.fit", ref: "Maitra+19", refLink: "https://ui.adsabs.harvard.edu/abs/2016MNRAS.459.1602L/abstract"},
                {catalog: "XMSS", name: "XMSS.fit", ref: "Barcons+07", refLink: "https://ui.adsabs.harvard.edu/abs/2007A%26A...476.1191B/abstract"},
                {catalog: "XSERVS-WCDFS_ES1", name: "es1_xmm_cat.fits, wcdfs_xmm_cat.fits", ref: "Ni+21", refLink: "https://ui.adsabs.harvard.edu/abs/2021ApJS..256...21N/abstract"},
                {catalog: "XSERVS_XMMLSS", name: "XSERVS_XMMLSS.fits", ref: "Chen+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018MNRAS.478.2132C/abstract"},
                {catalog: "XWAS", name: "XWAS.fit", ref: "Esquej+13", refLink: "https://ui.adsabs.harvard.edu/abs/2013A%26A...557A.123E/abstract"},
                {catalog: "YQLF", name: "YQLF.fit", ref: "Yang+18", refLink: "https://ui.adsabs.harvard.edu/abs/2018AJ....155..110Y/abstract"},
                {catalog: "eHAQ", name: "eHAQ.tbl, eHAQ_tb3.fits", ref: "Krogager+16", refLink: "https://ui.adsabs.harvard.edu/abs/2016MNRAS.455.2698K/abstract"},
                {catalog: "z6.51", name: "z6.51result.tbl", ref: "Fan+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019ApJ...870L..11F/abstract"},
                {catalog: "COMP2CAT", name: "COMP2CAT.fit", ref: "Jimenez-Gallardo+19", refLink: "https://ui.adsabs.harvard.edu/abs/2019A%26A...627A.108J/abstract"},
                {catalog: "eFEDS", name: "eFEDS_AGNv17.6.fits, eROSITA_ctps.fit", ref: "eFEDS/eROSITA", refLink: "https://erosita.mpe.mpg.de/edr/eROSITAObservations/Catalogues/"},
            ]
        }
    }

    makeTable = () => {
        let TableBody = []
        for (let i = 0; i < this.state.References.length; i++) {
            let variable = this.state.References[i]
            
            let refColor = "black"
            if (variable.refLink != null) {
                refColor = "blue"
            }

            let row = []
            row.push(
                <td>{variable.name}</td>,
                <td>{variable.catalog}</td>,
                <td><a target="_blank" rel="noreferrer" style={{color: refColor}} href={variable.refLink}>{variable.ref}</a></td>
            )
            TableBody.push(<tr>{row}</tr>)
        }
        return TableBody;
    }

    render(){
        // add scrollY maxHeight="200px" for smaller, scrollable section
        var Table = <MDBTable striped small>
                <MDBTableHead color="info-color" textWhite>
                    <tr>
                    <th width= "33%">Name of the Table</th>
                    <th width="33%">Catalog</th>
                    <th width="33%">Reference</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {this.makeTable()}
                </MDBTableBody>
            </MDBTable>

        return(
            <div>
                <br/>
                {Table}
            </div>
        )
    }
}

export default TableReferences