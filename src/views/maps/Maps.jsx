import { useState } from "react";
import { instance } from "../../config/axios.instance";
import Mapbox from "../../components/maps/Mapbox";

import Loader from "../../components/states/Loader";

import Breadcrumb from "react-bootstrap/Breadcrumb";

const Maps = () => {
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [maxRadiusKM, setMaxRadiusKm] = useState(0);

  const [loader, setLoader] = useState(false);

  const [lon, setLon] = useState([]);
  const [lat, setLat] = useState([]);
  const [place, setPlace] = useState([]);
  const [magnitudes, setMagnitudes] = useState([]);
  const [time, setTime] = useState([]);
  const [type, setType] = useState([]);
  const [detail, setDetail] = useState([]);

  const getData = async () => {
    try {
      setLoader(true);
      const req = await instance.get(
        `query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxRadiusKM}`
      );
      const res = req.data;

      const pos = res.features.map((item) => ({
        coordinates: item.geometry.coordinates,
        place: item.properties.place,
        magnitude: item.properties.mag,
        time: item.properties.time,
        type: item.properties.type,
        detail: item.properties.detail,
      }));
      setData(pos);

      const longs = pos.map((item) => item.coordinates[0]);
      const lats = pos.map((item) => item.coordinates[1]);
      const locations = pos.map((item) => item.place);
      const magnitudes = pos.map((item) => item.magnitude);
      const times = pos.map((item) => item.time);
      const types = pos.map((item) => item.type);
      const details = pos.map((item) => item.detail);

      setLon(longs);
      setLat(lats);
      setPlace(locations);
      setMagnitudes(magnitudes);
      setTime(times);
      setType(types);
      setDetail(details);
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <>
      <head>
        <title>Tremorcharts - mapbox</title>
      </head>
      <div className="col-9">
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="maps" active>
            Maps
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr />
        <div className="row mb-5 mx-2">
          <form
            className="d-flex flex-row justify-content-between align-items-end"
            onSubmit={handleSubmit}
          >
            <div className="d-flex flex-column w-25">
              <label>Latitude</label>
              <input
                type="number"
                placeholder="please select a value"
                name="latitude"
                id="latitude"
                min="-90"
                max="90"
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column w-25">
              <label>Longitude</label>
              <input
                type="number"
                placeholder="please select a value"
                name="longitude"
                id="longitude"
                min="-180"
                max="180"
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column w-25">
              <label>Max Radius</label>
              <input
                type="number"
                placeholder="please select a value"
                name="maxRadius"
                id="maxRadius"
                min="0"
                max="20001.6"
                onChange={(e) => setMaxRadiusKm(e.target.value)}
              />
            </div>
            <button
              className="bg-success text-bg-primary border border-success p-1"
              type="submit"
            >
              Display data
            </button>
          </form>
          {loader && <Loader />}
        </div>
        <div className="row">
          {data && (
            <Mapbox
              lon={lon}
              lat={lat}
              place={place}
              magnitudes={magnitudes}
              time={time}
              type={type}
              detail={detail}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Maps;
