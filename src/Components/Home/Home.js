import React, { useEffect, useState } from 'react';
import Ride from '../Ride/Ride';
import './Home.css';
import fakeData from '../../fakeData/FakeData.json';
const Home = () => {
    const [riders,setRiders]= useState([]);
    useEffect(()=>{
          setRiders(fakeData);
          console.log(fakeData);
    },[])
    return (
        <div className="home">
            {
                riders.map(rider => <Ride key={rider.id} rider={rider}></Ride>)
            }
        </div>
    );
};

export default Home;