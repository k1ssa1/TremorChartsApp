import { useState } from "react";
import { instance } from "../../config/axios.instance";
import Mapbox from "../../components/maps/Mapbox";

import Loader from "../../components/states/Loader";

const Maps = () => {

    const [data, setData] = useState([])
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [maxRadiusKM, setMaxRadiusKm] = useState(0)

    const [loader, setLoader] = useState(false)

    const [lon, setLon] = useState([])
    const [lat, setLat] = useState([])

    const getData = async () => {
       try{
            setLoader(true)
            const req = await instance.get(`query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxRadiusKM}`)
            const res = req.data
            const pos = []
            res.features.forEach(item => {
                pos.push(item.geometry.coordinates)
            })
            setData(pos)

            const longs = pos.map(item => item[0])
            const lats = pos.map(item => item[1])

            setLon(longs)
            setLat(lats)

       }catch(err){
        console.error(err)
       }finally{
        setLoader(false)
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
            {loader && <Loader/>}
        </div>
        <div className="row">
           {data && <Mapbox lon={lon} lat={lat} />}
        </div>
    </div>

    );


}
 
export default Maps;