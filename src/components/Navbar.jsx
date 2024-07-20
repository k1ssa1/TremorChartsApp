import { NavLink } from "react-router-dom";

import { useState } from "react";

import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";

const Navbar = () => {

const [basiccharts, setBasiccharts] = useState(false)
const [statcharts, setStatcharts] = useState(false)
const [scicharts, setSciCharts] = useState(false)
const [fdownIcon, setFDownIcon] = useState(true)
const [fupIcon, setFUpIcon] = useState(false)
const [sdownIcon, setSDownIcon] = useState(true)
const [supIcon, setSUpIcon] = useState(false)
const [ldownIcon, setLDownIcon] = useState(true)
const [lupIcon, setLUpIcon] = useState(false)

const DownIcon = ({onClick}) => (
    <IoIosArrowDown color="#f2f2f2" onClick={onClick}/>
)

const UpIcon = ({onClick}) => (
    <IoIosArrowUp color="#f2f2f2" onClick={onClick}/>
)

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

const controlBasicsMenu = () => {
    if(!basiccharts){
        setBasiccharts(true);
        setFDownIcon(false)
        setFUpIcon(true)
    } 
    if(basiccharts){
        setBasiccharts(false);
        setFDownIcon(true);
        setFUpIcon(false)
    }
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


const controlStatsMenu = () => {
    if(!statcharts){
        setStatcharts(true);
        setSDownIcon(false)
        setSUpIcon(true)
    } 
    if(statcharts){
        setStatcharts(false);
        setSDownIcon(true);
        setSUpIcon(false)
    }
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

const controlSciMenu = () => {
    if(!scicharts){
        setSciCharts(true);
        setLDownIcon(false)
        setLUpIcon(true)
    } 
    if(scicharts){
        setSciCharts(false);
        setLDownIcon(true);
        setLUpIcon(false)
    }
}


    return ( 
        <div className="col-2 bg-black py-4 px-3">
            <div className="mt-3 mb-4">
                <NavLink to="/" className="text-decoration-none text-white fs-5">TermorChartsApp</NavLink>
            </div>
           <dl className="my-3">
            <dt>
                <NavLink to="/maps" className="text-decoration-none text-white">Map box</NavLink>
            </dt>
            <dt>
                <NavLink to="/basic-charts/scatter-plot" className="text-decoration-none text-white me-1">Basic charts</NavLink>
                {fdownIcon && <DownIcon onClick={controlBasicsMenu}/>}
                {fupIcon && <UpIcon onClick={controlBasicsMenu}/>}
            </dt>
            {basiccharts && <BasicChartList/>}
            <dt className="">
                <NavLink to="/statistical-charts/histograms" className="text-decoration-none text-white me-1">Statistical charts</NavLink>
                {sdownIcon && <DownIcon onClick={controlStatsMenu}/>}
                {supIcon && <UpIcon onClick={controlStatsMenu}/>}
            </dt>
           {statcharts && <StatChartsList/>}
            <dt className="">
                <NavLink to="/scientific-charts/heat-maps" className="text-decoration-none text-white me-1">Scientifc charts</NavLink>
                {ldownIcon && <DownIcon onClick={controlSciMenu}/>}
                {lupIcon && <UpIcon onClick={controlSciMenu}/>}
            </dt>
            {scicharts && <SciChartsList/>}
           </dl>
        </div>
     );
}
 
export default Navbar;