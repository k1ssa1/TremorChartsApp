import Plot from "react-plotly.js";

const DepthHeatmap = ({ longs, lats, depths }) => {
  return (
    <Plot
      data={[
        {
          x: longs,
          y: lats,
          z: depths,
          type: "heatmap",
          hoverongaps: false,
        },
      ]}
      layout={{
        width: 480,
        height: 400,
        title: "Geospatial Heatmap (Depth)",
        xaxis: {
          title: "Longitude",
        },
        yaxis: {
          title: "Latitude",
        },
      }}
    />
  );
};

export default DepthHeatmap;
