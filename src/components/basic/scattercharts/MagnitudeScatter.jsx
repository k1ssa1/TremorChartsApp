import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const MagnitudeScatter = ({scatterData}) => {

    const [scatter, setScatter] = useState({x: [], y: []});

    useEffect(()=>{
        setScatter({
            x: scatterData[0],
            y: scatterData[1]
        })
    },[scatterData])

    return ( 
        <Plot
            data={[
                {
                type: 'scatter',
                x: scatter.x,
                y: scatter.y
                }
            ]}
            layout={{
                height: 450,
                width: 480,
                title: "Magnitude vs. Significance",
                xaxis: { title: "Significance" },
                yaxis: { title: "Magnitude" }
            }}
        />
     );
}
 
export default MagnitudeScatter;