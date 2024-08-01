import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {instance} from "../../config/axios.instance."

import MagnitudePie from "../../components/basic/piecharts/MagnitudePie";
import TypePie from "../../components/basic/piecharts/TypePie";

const PieChart = () => {

    const [pieData, setPieData] = useState([]);
    const [typeData, setTypeData] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const getData = async () => {
        try{
            const isoStartDate = startDate.toISOString();
            const isoEndDate = endDate.toISOString();
            const queryStartDate = isoStartDate.slice(0,10)
            const queryEndDate = isoEndDate.slice(0,10)
            console.log("ISO start date: " + queryStartDate);
            console.log("ISO end date: " + queryEndDate);
            const req = await instance.get(`query?format=geojson&starttime=${queryStartDate}&endtime=${queryEndDate}`);
            const res = req.data;

            // for eartquake ranges
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

           let magSum = 0

           magnitude.forEach(item => magSum += item)

           const purcentages = []

           magnitude.forEach(item => {
            let newValue = (item / magSum) * 100;
            purcentages.push(newValue)
           })

           setPieData(purcentages)

           // for eartquake types
           const earthquakeType = [0,0,0]
           res.features.forEach(item => {
            if(item.properties.type === "earthquake") earthquakeType[0]++;
            if(item.properties.type === "explosion") earthquakeType[1]++;
            if(item.properties.type === "other event") earthquakeType[2]++;
           })

           let count2 = 0;
           earthquakeType.forEach(item => count2 += item)

           const typePurcentage = []
           earthquakeType.forEach(item => {
            const typePurcentageVal = (item / count2) * 100;
            typePurcentage.push(typePurcentageVal)
           })

           setTypeData(typePurcentage)

        }catch(err){
            console.error(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getData()
    }



    return ( 
        <div className="col-9">
            <h2 className="mt-4 text-secondary">Pie chart</h2>
            <hr />
            <div className="row mb-5 mx-2">
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
            </div>
            <div className="d-flex flex-row justify-content-between">
                {pieData && <MagnitudePie pieData={pieData}/>}
                {typeData && <TypePie typeData={typeData}/>}
            </div>
        </div>
     );
}
 
export default PieChart;