import React, { useState } from 'react';
import { useParams } from 'react-router';
import './Destination.css';
import fakeData from '../../fakeData/FakeData.json';
import Tickets from '../Tickets/Tickets';
import { GoogleMap } from '../GoogleMap/GoogleMap';



const Destination = () => {
    const { CarName } = useParams();
    const carName = fakeData.find(pd => pd.CarName === CarName)
    console.log(carName);
    const [pick, setPick] = useState({
        pickFrom: '',
        pickTo: ''
    })
    const [pickInfo, setPickInfo] = useState(true);

    const handleForm = (e) => {

        if (pick.pickFrom && pick.pickTo) {

        }
        e.preventDefault();
    }
    const handleBlur = (e) => {
        console.log(e.target.value)
        let pickValid1 = true;
        let pickValid2 = true;
        if (e.target.name === 'pickFrom') {
            pickValid1 = e.target.value;
        }
        if (e.target.name === 'pickTo') {
            pickValid2 = e.target.value;
        }
        if (pickValid1 && pickValid2) {
            const newPick = { ...pick };
            newPick[e.target.name] = e.target.value;
            setPick(newPick);

        }
    }
    return (
        <div className="destination">
            <div className="pick-form">
                {pickInfo && <form onSubmit={handleForm}>
                    <h4>Pick From:</h4>
                    <input type="text" name="pickFrom" onBlur={handleBlur} required />
                    <h4>Pick To:</h4>
                    <input type="text" name="pickTo" onBlur={handleBlur} required /><br />
                    <input onClick={() => setPickInfo(!pickInfo)} type="submit" />
                </form>}
                {!pickInfo && <div className="pick-detail">
                    <div className="pick">
                        <div className="from-to">
                            <h4>{pick.pickFrom}</h4>
                            <h4>{pick.pickTo}</h4>
                        </div>
                        <div className="ticket">
                            <Tickets ticket={carName}></Tickets>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="map">
               <GoogleMap></GoogleMap>
               
            </div>
        </div>
    );
};

export default Destination;