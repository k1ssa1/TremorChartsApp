import Plot from "react-plotly.js";
const DetectionQuality = ({qualityData}) => {
    return ( 
        <Plot
        data={[
            {
                type: 'scatterpolar',
                r: qualityData,
                theta: ['Station Nbr','Gap','Rms', 'Dmin'],
                fill: 'toself'
            }
        ]}
        layout={{
            width: 480,
            height: 400,
            title: "Seismic Detection Quality",
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
 
export default DetectionQuality;