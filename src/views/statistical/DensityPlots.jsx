import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {instance} from "../../config/axios.instance"

import Loader from "../../components/states/Loader";
import Error from "../../components/states/Error";
import Success from "../../components/states/Success";

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import GeographicDistribution from "../../components/statistical/density/GeographicDistribution";
import MagsDepth from "../../components/statistical/density/MagsDepth";

const DensityPlots = () => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [error, setError] = useState(false);
    const [confirmLoad, setConfirmLoad] = useState(false);
    const [loader, setLoader] = useState(false)

    const [longitude, setLongitude] = useState([])
    const [latitude, setLatitude] = useState([])
    const [coordinates, setCoordinates] = useState([])

    const [mags, setMags] = useState([])
    const [depths, setDepths] = useState([])
    const [data, setData] = useState([])

    const getData = async () => {
        const dateDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        if( dateDifference > 31){
            setError(true);
            setConfirmLoad(false)
            setLoader(false)
        }else{
            setConfirmLoad(false)
            setError(false)
            setLoader(true)
            try{
                const isoStartDate = startDate.toISOString();
                const isoEndDate = endDate.toISOString();
                const queryStartDate = isoStartDate.slice(0,10)
                const queryEndDate = isoEndDate.slice(0,10)
                const req = await instance.get(`query?format=geojson&starttime=${queryStartDate}&endtime=${queryEndDate}`);
                const res = req.data;

                // geographic distribution data
                let longs = []
                let lats = []

                res.features.map(item => {
                    longs.push(item.geometry.coordinates[0])
                    lats.push(item.geometry.coordinates[1])
                })

                setLongitude(longs)
                setLatitude(lats)

                const point = [longs, lats]
                setCoordinates(point)

                // magnitude vs depth data
                let mags = [];
                let depths = [];

                res.features.map(item => {
                    mags.push(item.properties.mag)
                    depths.push(item.geometry.coordinates[2])
                })
                
                setMags(mags)
                setDepths(depths)
                let collector = [mags, depths]
                setData(collector)

                // loader
                setConfirmLoad(true);

            }catch(err){
                console.error(err)
            }finally{
                setLoader(false)
            }
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getData()
    }

    return (
      <>
        <head>
          <title>Tremorcharts - density charts</title>
        </head>
        <div className="col-9">
          <Breadcrumb className="mt-3">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="histograms">
              Statistical charts
            </Breadcrumb.Item>
            <Breadcrumb.Item href="2d-density-plots" active>
              2D density plots
            </Breadcrumb.Item>
          </Breadcrumb>
          <hr />
          {error && <Error />}
          {confirmLoad && <Success startDate={startDate} endDate={endDate} />}
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-row justify-content-around"
          >
            <label>Select start date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              isClearable
              placeholderText="Select start date"
            />
            <label>Select end date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              isClearable
              placeholderText="Select end date"
            />
            <button
              type="submit"
              className="bg-success text-bg-primary border border-success"
            >
              display data
            </button>
          </form>
          {loader && <Loader />}
          <div className="mt-4 d-flex flex-row justify-content-evenly">
            {coordinates && (
              <GeographicDistribution
                longitude={longitude}
                latitude={latitude}
                title="Geographic distribution density"
              />
            )}
            {data && (
              <MagsDepth
                mags={mags}
                depths={depths}
                title="Magnitude vs Depth density"
              />
            )}
          </div>
        </div>
      </>
    );
}
 
export default DensityPlots;