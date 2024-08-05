import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {instance} from "../../config/axios.instance"

import Loader from "../../components/states/Loader";
import Error from "../../components/states/Error";
import Success from "../../components/states/Success";

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import MagHistogram from "../../components/statistical/MagHistogram";
import DepthHistogram from "../../components/statistical/DepthHistogram";


const Histograms = () => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [error, setError] = useState(false);
    const [confirmLoad, setConfirmLoad] = useState(false);
    const [loader, setLoader] = useState(false)
    const [magData, setMagData] = useState([]);
    const [depthData, setDepthData] = useState([])

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

                // magnitude distrubtion histogral

                const magnitudes = []
                res.features.map(item => {
                    magnitudes.push(item.properties.mag)
                })

                setMagData(magnitudes)

                // depth distribution histogram
                const depths = []
                res.features.map(item => {
                    depths.push(item.geometry.coordinates[2])
                })

                setDepthData(depths)

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
        <div className="col-9">
             <Breadcrumb className="mt-3">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="histograms">Statistical charts</Breadcrumb.Item>
                <Breadcrumb.Item href="histograms" active>Histograms</Breadcrumb.Item>
            </Breadcrumb>
            <hr />
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
                <div className="mt-4 d-flex flex-row justify-content-evenly">
                    {magData && <MagHistogram magData={magData} title="Magnitude distribution histogram"/>}
                    {depthData && <DepthHistogram depthData={depthData} title="Depth distribution histogram"/>}
                </div>
        </div>
     );
}
 
export default Histograms;