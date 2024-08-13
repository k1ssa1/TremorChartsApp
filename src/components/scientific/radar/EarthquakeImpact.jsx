import Plot from "react-plotly.js";

const EarthquakeImpact = ({overviewData}) => {
    return ( 
        <Plot
        data={[
            {
                type: 'scatterpolar',
                r: overviewData,
                theta: ['Magnitude','Depth','Significance', 'Rms', 'Gap'],
                fill: 'toself'
            }
        ]}
        layout={{
            width: 480,
            height: 400,
            title: "Earthquake Impact Overview",
            polar: {
                radialaxis: {
                  visible: true,
                  range: [0, 50]
                }
              },
              showlegend: false
        }}
    />
     );
}
 
export default EarthquakeImpact;