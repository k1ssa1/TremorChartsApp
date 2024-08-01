import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const MagnitudePie = ({ pieData }) => {
  const [magnitudeData, setMagnitudeData] = useState({ labels: [], values: [] });

  useEffect(() => {
    setMagnitudeData({
      labels: ['<= 1', ']1-2]', ']2-3]', ']3-4]', ']4-5]', '>5'],
      values: pieData
    });
  }, [pieData]);

  return (
    <Plot
      data={[
        {
          type: 'pie',
          values: magnitudeData.values,
          labels: magnitudeData.labels
        }
      ]}
      layout={{
        height: 400,
        width: 500,
        title: "Earthquake Distribution by Magnitude Range"
      }}
    />
  );
}

export default MagnitudePie;
