import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { baseurl } from '../../util';

const Flights = ({ data, ticket }) => {
  const navigate = useNavigate();
  const userdata = window.sessionStorage.getItem('userData');
  console.log(userdata);

  useEffect(() => {
    if (userdata == null) {
      navigate('/login')
    }
  }, []);
  const success = () => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Flight has been added successfully',
      buttons: [
        {
          label: 'Ok',
          onClick: onclose
        },

      ]
    });
  };

  const error = () => {
    confirmAlert({
      title: 'Error',
      message: 'Error!occurred while adding the flight Try again',
      buttons: [
        {
          label: 'Ok',
          onClick: onclose
        },

      ]
    });
  };

  const submit = (flight) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: `Are You Sure You Want to Book${flight.flightName}`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleBookFlight(flight)
        },
        {
          label: 'No',
          onClick: onclose
        }
      ]
    });
  };
  const handleBookFlight = (flight) => {

    axios.post(`${baseurl}/bookTicket`, {
      userId: userdata.userId,
      flightId: flight.flightId,
      fromDestination: flight.flightFrom,
      toDestination: flight.flightTo,
      noOfSeats: ticket,
      date: flight.flightDate.slice(0, 10),
      flightName: flight.flightName
    }).then((res) => {
      console.log(res);
      success();
    }).catch((err) => {
      console.log(err);
      error();

    })
  };

  console.log(data);

  return (
    <div className="flex items-center justify-center h-1/2 bg-sky-200">
      <div className="bg-white w-5/6 h-1/5 rounded-lg p-4 flex flex-col h-auto">
        {data.map((flight, index) => (
          <div key={index} className="flex flex-row p-4 w-full border border-gray-300 rounded-lg m-2   items-center justify-evenly">
            <div className="flex flex-col">
              <div className='text-2xl font-bold mb-2'>Flight Name</div>
              <div>{flight.flightName}</div>
            </div>
            <div className="flex flex-col">
              <div className='text-2xl font-bold mb-2'>Date</div>
              <div>{flight.flightDate.slice(0, 10)}</div>
            </div>
            <div className="flex flex-col">
              <div className='text-2xl font-bold mb-2'>Time</div>
              <div>{flight.flightTime}</div>
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
                onClick={() => submit(flight)}
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
