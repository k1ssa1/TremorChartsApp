import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { instance } from "../../config/axios.instance";

import Loader from "../../components/states/Loader";
import Error from "../../components/states/Error";
import Success from "../../components/states/Success";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import DetectionQuality from "../../components/scientific/radar/DetectionQuality";
import EarthquakeImpact from "../../components/scientific/radar/EarthquakeImpact";

const RadarChart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [error, setError] = useState(false);
  const [confirmLoad, setConfirmLoad] = useState(false);
  const [loader, setLoader] = useState(false);

  const [qualityData, setQualityData] = useState([])
  const [overviewData, setOverviewData] = useState([])

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

            let magnitudes = 0
            let nst = 0
            let gap = 0
            let rms = 0
            let dmin = 0
            let depth = 0
            let sig = 0

            res.features.map(item => {
                magnitudes += item.properties.mag;
                nst += item.properties.nst
                gap += item.properties.gap
                rms += item.properties.rms
                dmin += item.properties.dmin
                depth = item.geometry.coordinates[2]
                sig += item.properties.sig
            });

            let avgMag = magnitudes / res.features.length
            let avgNst = nst / res.features.length
            let avgGap = gap / res.features.length
            let avgRms = rms / res.features.length
            let avgDmin = dmin / res.features.length
            let avgDepth = depth / res.features.length
            let avgSig = sig / res.features.length

            setOverviewData([avgMag, avgDepth, avgSig, avgRms, avgGap])
            setQualityData([avgNst, avgGap, avgRms, avgDmin])

           // loading confirmation message
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
        <title>Tremorcharts - radar charts</title>
      </head>
      <div className="col-9">
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="heat-maps">
            Scientific charts
          </Breadcrumb.Item>
          <Breadcrumb.Item href="radar-charts" active>
            Radar charts
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr />
        <div className="row mb-5 mx-2">
            {error && <Error />}
            {confirmLoad && <Success startDate={startDate} endDate={endDate} />}
                <form onSubmit={handleSubmit} className="d-flex flex-row justify-content-around">
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
                    <button type="submit" className="bg-success text-bg-primary border border-success">display data</button>
                </form>
                {loader && <Loader/>}
            </div>
            <div className="d-flex flex-row justify-content-between">
                {overviewData && <EarthquakeImpact overviewData={overviewData}/>}
                {qualityData && <DetectionQuality qualityData={qualityData}/>}
            </div>
      </div>
    </>
  );
};

export default RadarChart;
