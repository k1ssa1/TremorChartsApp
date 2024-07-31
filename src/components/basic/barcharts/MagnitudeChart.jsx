import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const MgnitudeChart = ({data}) => {

    const [chartData, setChartData] = useState({labels: [], values: []})

    useEffect(() => {
        setChartData({
            labels: ['<= 1', ']1-2]', ']2-3]', ']3-4]', ']4-5]', '>5'],
            values: data
        })
    }, [data])

    return ( 
        <Plot
            data={[
                {
                    type: 'bar',
                    x: chartData.labels,
                    y: chartData.values,
                    marker: {color: 'black'}
                }
            ]}
            layout={{
                width: 700,
                height: 450,
                title: "Number of earthquakes by Magnitude range from 0 to 6+",
                xaxis:{
                    title: 'Magnitude range'
                },
                yaxis:{
                    title: 'Number of earthquakes'
                }
            }}
        />
    );
}
 
export default MgnitudeChart;