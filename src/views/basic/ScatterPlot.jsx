import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Loader from "../../components/states/Loader";
import Error from "../../components/states/Error";
import Success from "../../components/states/Success";

import {instance} from "../../config/axios.instance."
import MagnitudeScatter from "../../components/basic/scattercharts/MagnitudeScatter";

const ScatterPlot = () => {

    const [scatterData, setScatterData] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [error,setError] = useState(false);
    const [confirmLoad, setConfirmLoad] = useState(false);
    const [loader, setLoader] = useState(false)

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

                const mags = [];
                const sigs = [];

                res.features.forEach(item => {
                    let itemMag = item.properties.mag;
                    let itemSig = item.properties.sig;
                    mags.push(itemMag);
                    sigs.push(itemSig)
                })

               const removeDuplicate = (data) => {
                let uniqueArr = [];
                data.forEach(item => {
                    if(!uniqueArr.includes(item)){
                        uniqueArr.push(item)
                    }
                })
                return uniqueArr;
               }

               const uniqueMags = removeDuplicate(mags)
               const uniqueSigs = removeDuplicate(sigs)

               setScatterData([uniqueSigs,uniqueMags])

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
        <div className="col-9">
            <h2 className="mt-4 text-secondary">Scatter plot</h2>
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
                {scatterData.length > 0 && <MagnitudeScatter scatterData={scatterData}/>}
            </div>
        </div>
     );
}
 
export default ScatterPlot;