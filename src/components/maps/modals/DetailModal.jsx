import { IoMdClose } from "react-icons/io";

const DetailModal = ({place, magnitudes, time, type, detail, onClose}) => {
    return ( 
        <div className="d-flex flex-column position-fixed top-0 bottom-0 start-0 end-0 justify-content-center align-items-center h-100 w-100" style={{ backgroundColor: "hsla(0, 0%, 10%, 0.75)", zIndex: 1050 }}>
            <div className="d-flex flex-column bg-light my-1 overflow-y-auto h-50 w-50 p-2">
                <div className="d-flex flex-row align-items-center justify-content-between p-2 border-bottom" style={{ borderColor: "#d3d3d3" }}>
                    <h2>Earthquake Details</h2>
                    <IoMdClose onClick={onClose}/>
                </div>
                <div className="d-flex flex-column p-2 mt-2">
                    <p><strong>Location:</strong> {place}</p>
                    <p><strong>Magnitude:</strong> {magnitudes}</p>
                    <p><strong>Time in milliseconds:</strong> {time}</p>
                    <p><strong>Type:</strong> {type}</p>
                    <p><strong>Details:</strong> <a href={detail} target="_blank" rel="noopener noreferrer">More Info</a></p>
                </div>
            </div>
        </div>
     );
}
 
export default DetailModal;