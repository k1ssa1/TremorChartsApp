const Loader = () => {
    return ( 
        <div className="mt-3">
            <div className="spinner-border" style={{width: "2rem", height: "2rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow" style={{width: "2rem", height: "2rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
     );
}
 
export default Loader;