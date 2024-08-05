import Plot from "react-plotly.js";

const MagHistogram = ({magData, title}) => {
    return ( 
        <Plot
            data={[
                {
                    x: magData,
                    type: "histogram",
                    marker: {
                        color: "blue"
                    }
                }
            ]}
            
            layout={{
                width: 480,
                height: 400,
                title: title
            }}
        />
     );
}
 
export default MagHistogram;