import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { useUser } from "../hooks/auth";
import DatePicker from "react-datepicker";
import Firebase from "../services/firebase";
import { AirportSelect } from "./airport";

function useUserTrips() {
  const user = useUser();

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (user) {
      Firebase.firestore()
        .collection("users")
        .doc(user.uid)
        .collection("trips")
        .onSnapshot(snapshot => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTrips(items);
        });
    } else {
      setTrips([]);
    }
  }, [user]);

  return trips;
}

export const TripList = () => {
  const trips = useUserTrips();

  if (!trips.length) {
    return <div>You don&apos;t have any trips</div>;
  }

  return (
    <div>
      <h2 className="display-5 my-3">Your Trips</h2>
      {trips.map(trip => (
        <div key={trip.id}>
          <div className="card mb-3">
            <div className="card-header text-center">
              Departing on&nbsp;
              <strong>
                {new Date(
                  trip.departure_time.seconds * 1000
                ).toLocaleDateString()}
              </strong>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4">
                  <h5 className="card-title">
                    {new Date(
                      trip.departure_time.seconds * 1000
                    ).toLocaleDateString()}
                  </h5>
                  <div className="card-subtitle">{trip.origin_iata}</div>
                </div>
                <div className="col-sm-4">
                  Flight duration:
                  {` ${(trip.arrival_time.seconds -
                    trip.departure_time.seconds) /
                    3600} hrs`}
                </div>
                <div className="col-sm-4">
                  <h5 className="card-title">
                    {new Date(
                      trip.arrival_time.seconds * 1000
                    ).toLocaleDateString()}
                  </h5>
                  <div className="card-subtitle">{trip.destination_iata}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function addNewTrip(data, e) {
  console.log(data);
  e.target.reset();

  // const user = useUser();
  //
  // Firebase.firestore()
  //   .collection("users")
  //   .doc(user.uid)
  //   .collection("trips")
  //   .add({trip})
  //   .then(() => {
  //   });
}

export const TripNew = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());

  const { handleSubmit, register, setValue } = useForm();

  function registerAirport(key, airport) {
    setValue(key, airport);
  }

  return (
    <form onSubmit={handleSubmit(addNewTrip)}>
      <div className="card bg-light">
        <div className="card-header">
          <strong>Add a new trip</strong>
        </div>
        <div className="card-body">
          <div className="form-row">
            <div className="form-group col-md-8">
              <label htmlFor="airline">Airline</label>
              <input
                id="airline"
                name="airline_id"
                type="text"
                className="form-control"
                ref={register}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="flight-no">Flight No.</label>
              <input
                id="flight-no"
                name="flight_id"
                type="text"
                className="form-control"
                ref={register}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="origin-airport">Origin</label>
              <AirportSelect
                id="origin_airport"
                selected={origin}
                onSelect={airport => {
                  setOrigin(airport);
                  registerAirport("origin", origin);
                }}
                ref={register({ name: "origin" })}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="destination-airport">Destination</label>
              <AirportSelect
                id="destination-airport"
                selected={destination}
                onSelect={airport => {
                  setDestination(airport);
                  registerAirport("destination", destination);
                }}
                ref={register({ name: "destination" })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="">Departure Time</label>
              <div>
                <DatePicker
                  name="departure_time"
                  className="form-control"
                  selected={departureTime}
                  onChange={date => {
                    setDepartureTime(date);
                    setValue("departure_time", departureTime);
                  }}
                  ref={register({ name: "departure_time" })}
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Arrival Time</label>
              <div>
                <DatePicker
                  name="arrival_time"
                  className="form-control"
                  selected={arrivalTime}
                  onChange={date => {
                    setArrivalTime(date);
                    setValue("arrival_time", arrivalTime);
                  }}
                  ref={register({ name: "arrival_time" })}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <h5 className="my-3">Flight Details</h5>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="reservation-id">Reservation ID</label>
              <input
                id="reservation-id"
                name="reservation_id"
                type="text"
                className="form-control"
                ref={register}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="seat-id">
                Seat No.{" "}
                <small className="text-secondary">(if available)</small>
              </label>
              <input
                id="seat-id"
                name="seat_id"
                type="text"
                className="form-control"
                ref={register}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="gate">
                Gate <small className="text-secondary">(if available)</small>
              </label>
              <input
                id="gate"
                name="gate"
                type="text"
                className="form-control"
                ref={register}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="travel-class">Class</label>
              <select
                id="travel-class"
                name="travel_class"
                defaultValue="economy"
                className="form-control"
                ref={register}
              >
                <option value="economy">Economy</option>
                <option value="economy-plus">Economy Plus</option>
                <option value="business">Business</option>
                <option value="first-class">First Class</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="baggage">Baggage Allowance</label>
              <input id="baggage" type="text" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="form-control w-100"
              rows="3"
              ref={register}
            />
          </div>
        </div>
        <div className="card-footer text-right">
          <input type="submit" className="btn btn-primary" />
        </div>
      </div>
    </form>
  );
};
