import { NavLink } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="col-4">
           <dl>
            <dt>
                <NavLink to="/maps">Map box</NavLink>
            </dt>
            <dt>
                <NavLink to="/basic-charts">Basic charts</NavLink>
            </dt>
            <dd>
                <NavLink to="/basic-charts/scatter-plot">Scatter Plot</NavLink>
            </dd>
            <dd>
                <NavLink to="/basic-charts/bar-chart">Bar Chart</NavLink>
            </dd>
            <dd>
                <NavLink to="/basic-charts/pie-chart">Pie Chart</NavLink>
            </dd>
            <dt>
                <NavLink to="/statistical-charts">Statistical charts</NavLink>
            </dt>
            <dd>
                <NavLink to="/statistical-charts/histograms">Histograms</NavLink>
            </dd>
            <dd>
                <NavLink to="/statistical-charts/2d-density-plots">2d density plots</NavLink>
            </dd>
            <dt>
                <NavLink to="/scientific-charts">Scientifc charts</NavLink>
            </dt>
            <dd>
                <NavLink to="/scientific-charts/heat-maps">Heat maps</NavLink>
            </dd>
            <dd>
                <NavLink to="/scientific-charts/radar-charts">Radar charts</NavLink>
            </dd>
           </dl>
        </div>
     );
}
 
export default Navbar;