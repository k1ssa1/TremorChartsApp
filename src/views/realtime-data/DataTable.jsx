import Breadcrumb from "react-bootstrap/Breadcrumb";

import { instance } from "../../config/axios.instance";

import { useEffect, useState } from "react";

import Loader from "../../components/states/Loader"
import { Spinner } from "react-bootstrap";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true)

  const currentDate = new Date();
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 1);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const endDateString = formatDate(currentDate);
  const startDateString = formatDate(startDate);

  const getData = async () => {
    try {
      const req = await instance.get(
        `query?format=geojson&starttime=${startDateString}&endtime=${endDateString}`
      );
      const res = req.data;
      const info = res.features.map((item) => {
        const milliseconds = item.properties.time;
        const convertTime = new Date(milliseconds);
        const year = convertTime.getFullYear();
        const month = (convertTime.getMonth() + 1).toString().padStart(2, "0");
        const day = convertTime.getDate().toString().padStart(2, "0");
        const hours = convertTime.getHours().toString().padStart(2, "0");
        const minutes = convertTime.getMinutes().toString().padStart(2, "0");
        const seconds = convertTime.getSeconds().toString().padStart(2, "0");

        return {
          type: item.properties.type,
          place: item.properties.place,
          time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
          magnitude: item.properties.mag,
          detail: item.properties.detail,
        };
      });
      setData(info);
    } catch (err) {
      console.error(err);
    }finally{
      setSpinner(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getMagnitudeColor = (magnitude) => {
    if (magnitude > 5.0) {
      return { backgroundColor: "red", color: "white"};
    } else if (magnitude >= 3.0 && magnitude <= 5.0) {
      return { backgroundColor: "orange", color: "black" };
    } else {
      return { backgroundColor: "green", color: "white" };
    }
  };

  return (
    <>
      <div className="col-9">
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="data-table" active>
            Real time data
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr />
        <div className="alert alert-primary" role="alert">
          Displaying Real-Time Event Data from the Current Date to the Previous Day
        </div>
        {spinner && <Loader/>}
        <table className="w-100">
          <thead className="bg-dark-subtle">
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Place</th>
              <th scope="col">Time</th>
              <th scope="col">Magnitude</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
           {
            data.length > 0 && data.map((item, index) => (
                <tr key={index} style={getMagnitudeColor(item.magnitude)}>
                    <td className="mx-2">{item.type}</td>
                    <td className="mx-2">{item.place}</td>
                    <td className="mx-2">{item.time}</td>
                    <td className="mx-2">{item.magnitude}</td>
                    <td className="mx-2"><a href={item.detail}>more details</a></td>
                </tr>
            ))
           }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
