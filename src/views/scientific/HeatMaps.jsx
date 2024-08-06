import { useState } from "react";
import { instance } from "../../config/axios.instance";

import Loader from "../../components/states/Loader";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MagnitudeHeatmap from "../../components/scientific/heatmap/MagnitudeHeatmap";
import DepthHeatmap from "../../components/scientific/heatmap/DepthHeatmap";

const HeatMaps = () => {
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [maxRadiusKM, setMaxRadiusKm] = useState(0);

  const [longs, setLongs] = useState([])
  const [lats, setLats] = useState([])
  const [mags, setMags] = useState([])
  const [depths, setDepths] = useState([])

  const [loader, setLoader] = useState(false);

  const getData = async () => {
    try {
      setLoader(true);
      const req = await instance.get(
        `query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxRadiusKM}`
      );
      const res = req.data;

      const longs = [];
      const lats = [];
      const mags = [];
      const depth = []

      res.features.forEach(item => {
        longs.push(item.geometry.coordinates[0])
        lats.push(item.geometry.coordinates[1])
        mags.push(item.properties.mag)
        depth.push(item.geometry.coordinates[2])
      })

      setLongs(longs)
      setLats(lats)
      setMags(mags)
      setDepths(depth)

      let magData = [[longs,lats],[mags],[depths]]
      setData(magData)

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
        <title>Tremorcharts - density charts</title>
      </head>
      <div className="col-9">
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="heat-maps">Scientific charts</Breadcrumb.Item>
          <Breadcrumb.Item href="heat-maps" active>
            heat maps
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
        </div>
        {loader && <Loader />}
        <div className="mt-4 d-flex flex-row justify-content-evenly">
            {data && <MagnitudeHeatmap longs={longs} lats={lats} mags={mags}/>}
            {data && <DepthHeatmap longs={longs} lats={lats} depths={depths}/>}
        </div>
      </div>
    </>
  );
};

export default HeatMaps;
