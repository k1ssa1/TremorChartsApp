import Plot from "react-plotly.js";

import { createPortal } from "react-dom";
import { useState } from "react";

import DetailModal from "./modals/DetailModal";

const Mapbox = ({lon, lat, place, magnitudes, time, type, detail}) => {

    const [selectedPlace, setSelectedPlace] = useState("");
    const [selectedMagnitude, setSelectedMagnitude] = useState(0);
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedDetail, setSelectedDetail] = useState("")
    

    const showInfo = (event) => {
        const point = event.points[0];
        const placeText = place[point.pointIndex] || "N/A";
        const magnitude = magnitudes[point.pointIndex] || 0;
        const timeText = time[point.pointIndex] || "N/A";
        const typeText = type[point.pointIndex] || "N/A";
        const detailText = detail[point.pointIndex] || "N/A";

        const occurrenceTime = new Date(timeText)
        const year = occurrenceTime.getFullYear().toString()
        const month = (occurrenceTime.getMonth() + 1).toString().padStart(2,"0")
        const day = occurrenceTime.getDate().toString().padStart(2,"0")
        const hours = occurrenceTime.getHours().toString()
        const minutes = occurrenceTime.getMinutes().toString()
        const seconds = occurrenceTime.getSeconds().toString()

        const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

        setSelectedPlace(placeText);
        setSelectedMagnitude(magnitude);
        setSelectedTime(timestamp);
        setSelectedType(typeText);
        setSelectedDetail(detailText);
        setModal(true);
    }

    const [modal, setModal] = useState(false)

    return ( 
        <>
            <Plot
                data={[
                    {
                        type: 'scattermapbox',
                        mode: 'markers',
                        lon: lon,
                        lat: lat,
                        text: "click to show info",
                        hoverinfo: 'text',
                        marker: { color: "red", size: 8}
                    }
                ]} 
                layout={{
                    dragmode: "zoom",
                    mapbox: { style: "open-street-map", center: { lat: 20, lon:  1}, zoom: 1 },
                    margin: { r: 0, t: 0, b: 0, l: 0 },
                    paper_bgcolor: 'lightgray',
                    plot_bgcolor: 'lightgray'
                }}
                
                onClick={showInfo}
            />

            {modal && createPortal(
                <DetailModal onClose={() => setModal(false)} place={selectedPlace} magnitudes={selectedMagnitude} time={selectedTime} type={selectedType} detail={selectedDetail}/>,
                document.body
            )}
        </>
        
     );
}
 
export default Mapbox;