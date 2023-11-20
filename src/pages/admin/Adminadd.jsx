import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { baseurl } from '../../util';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function Adminadd() {
    const navigate = useNavigate();

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

      const onclose = () => {
        navigate('/listflights'); 
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


    const [name, setName] = useState('');
    const [fromdest, setFromdest] = useState('');
    const [todest, setTodest] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState(false);
    // const [data, setData] = useState([]);


    

    const handleAddFlight = (e) => {
        e.preventDefault();

        // console.log(selectedFrom, selectedTo, selectedDepartureDate, selectedNoOfTickets);
        axios.post(`${baseurl}/addflight`, {
            flightName: name,
            fromDestination: fromdest,
            toDestination: todest,
            date: date,
            time: time
        })
            .then((res) => {
                console.log(res);
                success();
            }).catch((err) => {
                console.log(err);
                error();

            })


    }
    return (
        <>
            <section className="bg-sky-200 h-auto py-10">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                    <div className="bg-white w-full max-w-md rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-4xl mb-6 font-bold leading-tight tracking-tight text-stone-950 md:text-2xl text-center ">
                                Add Flights
                            </h1>
                            <form onSubmit={(e) => handleAddFlight(e)} className="space-y-4 md:space-y-6" >

                                <div>
                                    <label htmlFor="userName" className="block mb-2 text-xl font-medium text-stone-950">
                                        Flight Name
                                    </label>
                                    <input
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        className="border-b outline-none border-gray-300 text-gray-900 sm:text-sm  focus:ring-0 focus:border-b  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
                                        placeholder="Indigo"
                                        onChange={(e) => setName(e.target.value)}

                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="userName" className="block mb-2 text-xl font-medium text-stone-950">
                                        From Destination
                                    </label>
                                    <input
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        className="border-b border-gray-300 text-gray-900 sm:text-sm  focus:ring-0 focus:border-none  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
                                        placeholder="Chennai"
                                        onChange={(e) => setFromdest(e.target.value)}

                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="userName" className="block mb-2 text-xl font-medium text-stone-950 ">To Destination</label>
                                    <input
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        className="border-b border-gray-300 text-gray-900 sm:text-sm rounded-none  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 "
                                        placeholder="Coimbatore"
                                        onChange={(e) => setTodest(e.target.value)}

                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="userName" className="block mb-2 text-xl font-medium text-stone-950">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="userName"
                                        id="userName"
                                        className="border-b border-gray-300 text-gray-900 sm:text-sm  focus:ring-0 focus:border-none  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
                                        placeholder="date"
                                        onChange={(e) => setDate(e.target.value)}

                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="userName" className="block mb-2 text-xl font-medium text-stone-950">
                                        Time
                                    </label>
                                    <input
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        className="border-b border-gray-300 text-gray-900 sm:text-sm  focus:ring-0 focus:border-none  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
                                        placeholder="9:00 am"
                                        onChange={(e) => setTime(e.target.value)}

                                        required
                                    />
                                </div>

                                {/* <div>
                                    <label htmlFor="userName" className="block mb-2 text-xl font-medium text-stone-950">
                                        Total No Of Tickets
                                    </label>
                                    <input
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        className="border-b border-gray-300 text-gray-900 sm:text-sm  focus:ring-0 focus:border-none  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
                                        placeholder="60"
                                        onChange={(e) => setSelectedFrom(e.target.value)}

                                        required
                                    />
                                </div> */}
                                <div className="flex  items-center justify-center">
                                    <button className="button mt-10 bg-green-500 text-white px-6 py-4 rounded-full "

                                    >
                                        Add Flights

                                    </button>
                                </div>
                                <div className="flex items-start">



                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
