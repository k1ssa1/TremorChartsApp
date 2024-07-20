import { FaReact, FaChartBar, FaRegLaughWink  } from "react-icons/fa";
import { BsFillBootstrapFill } from "react-icons/bs";
import { MdHttp } from "react-icons/md";

function App() {
  
  return (
    <div className="col-8">
        <h1 className="mt-5 mb-3">Index</h1>
        <p>Welcome to this React application, designed to explore and visualize data from the USGS Earthquake Event API. This API provides comprehensive data on seismic events around the world, including earthquake magnitudes, locations, and times. The app leverages this data to create interactive and informative visualizations, helping users understand the patterns and impacts of earthquakes globally.  <a href="https://earthquake.usgs.gov/fdsnws/event/1"> more here</a></p>
        <p>In this app, I use PlotlyJS to create various types of charts that display the earthquake data. From scatter plots to bar charts and more, PlotlyJS enables dynamic and detailed visual representations of the seismic information. Navigate through the navbar to access different chart types categorized for ease of exploration.</p>
        <dl className="mt-4 mb-4">
          <dt className="mb-2">The tech stack for this project includes:</dt>
          <dd><FaReact className="me-2"/> React: For building the user interface and managing state.</dd>
          <dd><FaChartBar className="me-2"/> React Plotly: For rendering interactive charts with PlotlyJS.</dd>
          <dd><BsFillBootstrapFill className="me-2"/>Bootstrap: For responsive and stylish design elements.</dd>
          <dd><MdHttp className="me-2"/>Axios: For handling API requests and managing data fetching.</dd>
          <dd> <FaRegLaughWink className="me-2"/>And more tools and libraries to come for functionality and performance.</dd>
        </dl>
        <p>Find this repo on <a href="https://github.com/k1ssa1/TremorChartsApp">github</a></p>
    </div>
  )
}

export default App
