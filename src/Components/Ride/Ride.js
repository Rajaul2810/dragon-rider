import React from 'react';
import { Link } from 'react-router-dom';
import './ride.css';
const Ride = (props) => {
    const {CarName, CarImg}= props.rider;
    console.log(props.rider);
    return (
        <div className="rider">
            <Link to={'/Destination/'+CarName}><img src={CarImg} alt=""/>
            <h2>{CarName}</h2>
            </Link>
            <div> 

            </div>
           
        </div>
    );
};

export default Ride;