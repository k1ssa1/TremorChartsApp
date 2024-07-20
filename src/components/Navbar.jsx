import { NavLink } from "react-router-dom";

import { useState } from "react";

const Navbar = () => {

const [basiccharts, setBasiccharts] = useState(false)
const [statcharts, setStatcharts] = useState(false)
const [scicharts, setSciCharts] = useState(false)

const BasicChartList = () => (
    <>
            <dd>
                <NavLink to="/basic-charts/scatter-plot" className="text-decoration-none ms-3 text-white" >Scatter Plot</NavLink>
            </dd>
            <dd>
                <NavLink to="/basic-charts/bar-chart" className="text-decoration-none ms-3 text-white" >Bar Chart</NavLink>
            </dd>
            <dd>
                <NavLink to="/basic-charts/pie-chart" className="text-decoration-none ms-3 text-white" >Pie Chart</NavLink>
            </dd>
    </>
)

const displayBasicCharts = () => {
    if(!basiccharts) setBasiccharts(true)
    if(basiccharts) setBasiccharts(false)
}

const StatChartsList = () => (
    <>
         <dd>
                <NavLink to="/statistical-charts/histograms" className="text-decoration-none ms-3 text-white" >Histograms</NavLink>
            </dd>
            <dd>
                <NavLink to="/statistical-charts/2d-density-plots" className="text-decoration-none ms-3 text-white" >2d density plots</NavLink>
            </dd>
    </>
)


const displayStatCharts = () => {
    if(!statcharts) setStatcharts(true)
    if(statcharts) setStatcharts(false)
}

const SciChartsList = () => (
    <>
         <dd>
                <NavLink to="/scientific-charts/heat-maps" className="text-decoration-none ms-3 text-white" >Heat maps</NavLink>
            </dd>
            <dd>
                <NavLink to="/scientific-charts/radar-charts" className="text-decoration-none ms-3 text-white" >Radar charts</NavLink>
            </dd>
    </>
)

const displaySciCharts = () => {
    if(!scicharts) setSciCharts(true)
    if(scicharts) setSciCharts(false)
}

    return ( 
        <div className="col-2 bg-black py-4 px-3">
            <div className="mt-3 mb-4">
                <h5 className="text-white ">TermorChartsApp</h5>
            </div>
           <dl className="my-3">
            <dt>
                <NavLink to="/maps" className="text-decoration-none text-white">Map box</NavLink>
            </dt>
            <dt>
                <NavLink to="/basic-charts/scatter-plot" className="text-decoration-none text-white" onClick={displayBasicCharts}>Basic charts</NavLink>
            </dt>
            {basiccharts && <BasicChartList/>}
            <dt className="">
                <NavLink to="/statistical-charts/histograms" className="text-decoration-none text-white" onClick={displayStatCharts}>Statistical charts</NavLink>
            </dt>
           {statcharts && <StatChartsList/>}
            <dt className="">
                <NavLink to="/scientific-charts/heat-maps" className="text-decoration-none text-white" onClick={displaySciCharts}>Scientifc charts</NavLink>
            </dt>
            {scicharts && <SciChartsList/>}
           </dl>
        </div>
     );
}
 
export default Navbar;