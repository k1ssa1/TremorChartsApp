import { useEffect, useState } from "react";

import { instance } from "../../config/axios.instance.";

import MagnitudeChart from "../../components/basic/barcharts/MagnitudeChart";

const BarChart = () => {

    const [data, setData] = useState([])

    async function getData(){
        try{
            const req = await instance.get("query?format=geojson&starttime=2023-09-07&endtime=2023-09-15");
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

        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>getData(),[])


    return ( 
        <div className="col-9">
            <h2 className="mt-4 text-secondary">Bar chart</h2>
            <hr />
            {data && <MagnitudeChart data={data}/>}
        </div>
     );
}
 
export default BarChart;