import { useState } from "react";
import { instance } from "../../config/axios.instance.";

const Maps = () => {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [maxRadiusKM, setMaxRadiusKm] = useState(0)

    const getData = async () => {
       try{
            const req = await instance.get(`query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxRadiusKM}`)
            const res = req.data
            res.features.forEach(item => {
                console.log(item.properties.type)
            })

       }catch(err){
        console.error(err)
       }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getData();
    }

    return ( 
    <div className="col-9">
        <h2 className="mt-4 text-secondary">Maps</h2>
        <hr />
        <div className="row mb-5 mx-2">
            <form className="d-flex flex-row justify-content-between align-items-end" onSubmit={handleSubmit}>
                <div className="d-flex flex-column w-25">
                    <label>Latitude</label>
                    <input type="number" placeholder="please select a value" name="latitude" id="latitude" min="-90" max="90" onChange={e => setLatitude(e.target.value)} />
                </div>
                <div className="d-flex flex-column w-25">
                    <label>Longitude</label>
                    <input type="number" placeholder="please select a value" name="longitude" id="longitude" min="-180" max="180" onChange={e => setLongitude(e.target.value)} />
                </div>
                <div className="d-flex flex-column w-25">
                    <label>Max Radius</label>
                    <input type="number" placeholder="please select a value" name="maxRadius" id="maxRadius" min="0" max="20001.6" onChange={e => setMaxRadiusKm(e.target.value)} />
                </div>
                <button className="bg-success text-bg-primary border border-success p-1" type="submit">Display data</button>
            </form>
        </div>
    </div>
    );
}
 
export default Maps;