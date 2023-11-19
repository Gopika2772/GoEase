import React from 'react';
import { useNavigate } from 'react-router-dom';
import flightDetails from '../../../src/flightDetails.json';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { baseurl } from '../../util';

const Flights = ({data,ticket}) => {
  const navigate = useNavigate();

  const submit = (msg) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: `Are You Sure You Want to Book${msg}`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: onclose
        }
      ]
    });
  }; 
  const handleBookFlight = (flight) => {
    
   axios.post(`${baseurl}/bookTicket`,{
    userId:1,
    flightId:flight.flightId,
    fromDestination:flight.flightFrom,
    toDestination:flight.flightTo,
    noOfSeats:ticket,
    date:flight.flightDate
   }) .then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);

})
  };

  console.log(data);

  return (
    <div className="flex items-center justify-center h-screen bg-sky-200">
      <div className="bg-white w-5/6 h-1/5 rounded-lg p-4 flex">
        {data.map((flight, index) => (
          <div key={index} className="flex flex-row p-4 w-full border border-gray-300 rounded-lg mx-2  items-center justify-evenly">
            <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>Flight Name</div>
            <div>{flight.flightName}</div>
            </div>
            <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>Date and Time</div>
            <div>{flight.flightDate}</div>
            </div>
            <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>From</div>
            <div>{flight.flightFrom}</div>
            </div>
            <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>To</div>
            <div>{flight.flightTo}</div>
            </div>
            {/* <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>Rate per Person</div>
            <div>{flight.ratePerPerson}</div>
            </div> */}
            
            <div>
              <button
                onClick={() => handleBookFlight(flight)}
                className="bg-green-500 text-white px-4 py-2 rounded-full focus:outline-none mt-4"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flights;
