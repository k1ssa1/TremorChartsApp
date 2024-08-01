const Success = ({startDate, endDate}) => {

    const sDate = startDate.toDateString()
    const eDate = endDate.toDateString()
    return ( 
        <div className="alert alert-success" role="alert">
             Successfully loaded data from {sDate} to {eDate}.
        </div>
     );
}
 
export default Success;