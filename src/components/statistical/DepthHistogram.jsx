import Plot from "react-plotly.js";

const DepthHistogram = ({depthData, title}) => {
  return (
    <Plot
      data={[
        {
          x: depthData,
          type: "histogram",
          marker: {
            color: "pink",
          },
        },
      ]}
      layout={{
        width: 480,
        height: 400,
        title: title,
      }}
    />
  );
};

export default DepthHistogram;
