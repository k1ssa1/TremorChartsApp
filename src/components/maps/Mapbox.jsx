import Plot from "react-plotly.js";

const Mapbox = ({lon,lat}) => {

    return ( 
        <Plot
        
            data={[
                {
                    type: 'scattermapbox',
                    mode: 'markers',
                    lon: lon,
                    lat: lat,
                    marker: { color: "red", size: 10 }
                }
            ]}
            
            layout={{
                dragmode: "zoom",
                mapbox: { style: "open-street-map", center: { lat: 20, lon:  1}, zoom: 1 },
                margin: { r: 0, t: 0, b: 0, l: 0 },
                paper_bgcolor: 'lightgray',
                plot_bgcolor: 'lightgray'
            }}
        
        />
     );
}
 
export default Mapbox;