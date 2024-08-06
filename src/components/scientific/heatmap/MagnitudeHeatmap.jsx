import Plot from "react-plotly.js";

const MagnitudeHeatmap = ({longs, lats, mags}) => {
    return ( 
        <Plot
            data={[
                {
                    x: longs,
                    y: lats,
                    z: mags,
                    type: 'heatmap',
                    hoverongaps: false
                }
            ]}
            layout={{
                width: 480,
                height: 400,
                title: "Geospatial Heatmap (Magnitude)",
                xaxis:{
                    title: 'Longitude'
                },
                yaxis:{
                    title: 'Latitude'
                }
            }}
        />
     );
}
 
export default MagnitudeHeatmap;