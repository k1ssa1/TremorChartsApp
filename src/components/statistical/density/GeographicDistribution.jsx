import Plot from "react-plotly.js";

const GeographicDistribution = ({longitude, latitude, title}) => {
    return ( 
        <Plot
        data={[
          {
            x: longitude,
            y: latitude,
            type: "histogram2dcontour",
            ncontours: 20,
            colorscale: 'Hot',
            reversescale: true,
            showscale: false,
          },
        ]}
        layout={{
          width: 480,
          height: 400,
          title: title,
        }}
      />
     );
}
 
export default GeographicDistribution;