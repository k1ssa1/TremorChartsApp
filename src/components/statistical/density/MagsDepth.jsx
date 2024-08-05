import Plot from "react-plotly.js";

const MagsDepth = ({mags, depths, title}) => {
    return ( 
        <Plot
        data={[
          {
            x: depths,
            y: mags,
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
 
export default MagsDepth;