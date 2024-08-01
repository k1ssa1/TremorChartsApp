import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const TypePie = ({typeData}) => {
    const [typePie, setTypePie] = useState({labels: [], values: []})

    useEffect(() => {
        setTypePie({
            labels: ["Earthquake", "Explosion", "Other event"],
            values: typeData
        })
    },[typeData])

    return ( 
        <Plot
        data={[
            {
              type: 'pie',
              values: typePie.values,
              labels: typePie.labels
            }
          ]}
          layout={{
            height: 450,
            width: 480,
            title: "Distribution of Event Types"
          }}
        />
     );
}
 
export default TypePie;