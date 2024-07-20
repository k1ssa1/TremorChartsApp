import { NavLink } from "react-router-dom";

import { useState } from "react";

const Navbar = () => {

const [basiccharts, setBasiccharts] = useState(false)
const [statcharts, setStatcharts] = useState(false)
const [scicharts, setSciCharts] = useState(false)

const BasicChartList = () => (
    <>
            <dd>
                <NavLink to="/basic-charts/scatter-plot">Scatter Plot</NavLink>
            </dd>
            <dd>
                <NavLink to="/basic-charts/bar-chart">Bar Chart</NavLink>
            </dd>
            <dd>
                <NavLink to="/basic-charts/pie-chart">Pie Chart</NavLink>
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
                <NavLink to="/statistical-charts/histograms">Histograms</NavLink>
            </dd>
            <dd>
                <NavLink to="/statistical-charts/2d-density-plots">2d density plots</NavLink>
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
                <NavLink to="/scientific-charts/heat-maps">Heat maps</NavLink>
            </dd>
            <dd>
                <NavLink to="/scientific-charts/radar-charts">Radar charts</NavLink>
            </dd>
    </>
)

const displaySciCharts = () => {
    if(!scicharts) setSciCharts(true)
    if(scicharts) setSciCharts(false)
}

    return ( 
        <div className="col-4">
           <dl>
            <dt>
                <NavLink to="/maps">Map box</NavLink>
            </dt>
            <dt>
                <NavLink onClick={displayBasicCharts}>Basic charts</NavLink>
            </dt>
            {basiccharts && <BasicChartList/>}
            <dt>
                <NavLink onClick={displayStatCharts}>Statistical charts</NavLink>
            </dt>
           {statcharts && <StatChartsList/>}
            <dt>
                <NavLink onClick={displaySciCharts}>Scientifc charts</NavLink>
            </dt>
            {scicharts && <SciChartsList/>}
           </dl>
        </div>
     );
}
 
export default Navbar;