import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider , Outlet} from 'react-router-dom'

import Navbar from './components/Navbar.jsx';
import Maps from './views/Maps.jsx';
import ScatterPlot from './views/ScatterPlot.jsx';
import BarChart from './views/BarChart.jsx';
import PieChart from './views/PieChart.jsx';

import 'bootstrap/dist/css/bootstrap.css';
import Histograms from './views/Histograms.jsx';
import DensityPlots from './views/DensityPlots.jsx';
import HeatMaps from './views/HeatMaps.jsx';
import RadarChart from './views/Radar.jsx';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const Layout = () => {
  return(
    <div className="container-fluid">
      <div className="row">
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <App/>
      },
      {
        path: "maps",
        element: <Maps/>
      },
      {
        path: "basic-charts",
        children: [
          {
            path: "scatter-plot",
            element: <ScatterPlot/>
          },
          {
            path: "bar-chart",
            element: <BarChart/>
          },
          {
            path: "pie-chart",
            element: <PieChart/>
          }
        ]
      },
      {
        path: "statistical-charts",
        children: [
          {
            path: "histograms",
            element: <Histograms/>
          },
          {
            path: "2d-density-plots",
            element: <DensityPlots/>
          }
        ]
      },
      {
        path: "scientific-charts",
        children: [
          {
            path: "heat-maps",
            element: <HeatMaps/>
          },
          {
            path: "radar-charts",
            element: <RadarChart/>
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/> 
)
