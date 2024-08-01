import { useState } from "react";

import { instance } from "../../config/axios.instance.";

import MagnitudeChart from "../../components/basic/barcharts/MagnitudeChart";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Error from "../../components/states/Error";
import Success from "../../components/states/Success";
import Loader from "../../components/states/Loader";

const BarChart = () => {

    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [error,setError] = useState(false);
    const [confirmLoad, setConfirmLoad] = useState(false);
    const [loader, setLoader] = useState(false)

    async function getData(){
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
                console.log("ISO start date: " + queryStartDate);
                console.log("ISO end date: " + queryEndDate);
                const req = await instance.get(`query?format=geojson&starttime=${queryStartDate}&endtime=${queryEndDate}`);
                const res = req.data;
                const magnitueArray = []
                res.features.forEach(item => {
                    const mag = item.properties.mag;
                    magnitueArray.push(mag)
                })
                const sortedArray = magnitueArray.sort((a, b) => a - b)
    
                const magnitude = [0,0,0,0,0,0]
    
               sortedArray.forEach(item => {
                if(item <= 1) magnitude[0]++;
                else if(1 < item && item <= 2 ) magnitude[1]++;
                else if(2 < item && item <= 3 ) magnitude[2]++;
                else if(3 < item && item<= 4 ) magnitude[3]++;
                else if(4 < item && item <= 5) magnitude[4]++;
                else if(5 < item ) magnitude[5]++
               })
    
               setData(magnitude)
               setConfirmLoad(true);
    
            }catch(err){
                console.error(err)
            }finally{
                setLoader(false)
            }
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        getData();
    }


    return ( 
        <div className="col-9">
            <h2 className="mt-4 text-secondary">Bar chart</h2>
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
            <div className="row">
            {data && <MagnitudeChart data={data}/>}
            </div>
        </div>
     );
}
 
export default BarChart;