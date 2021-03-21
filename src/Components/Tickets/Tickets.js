import React from 'react';
import './Tickets.css';

const Tickets = (props) => {
    const {CarName,CarImg,ticket1,ticket2,ticket3} = props.ticket;
    return (
        <div className="ticket-info">
           <h5> <img src={CarImg} alt=""/>  <span>{CarName}</span>     ${ticket1}</h5>
           <h5> <img src={CarImg} alt=""/>   <span>{CarName}</span>   ${ticket2}</h5>
           <h5> <img src={CarImg} alt=""/>  <span>{CarName}</span>   ${ticket3}</h5>
        </div>
    );
};

export default Tickets;