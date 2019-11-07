import React, { useState, useEffect } from "react";
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

export const TripNew = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());

  const user = useUser();

  function onSubmit(e) {
    e.preventDefault();

    if (!origin || !destination) {
      return console.warn("Value is required");
    }

    Firebase.firestore()
      .collection("users")
      .doc(user.uid)
      .collection("trips")
      .add({
        origin_iata: origin.iata,
        origin_airport: origin.name,
        origin_city: origin.city,
        origin_country: origin.country,
        destination_iata: destination.iata,
        destination_airport: destination.name,
        destination_city: destination.city,
        destination_country: destination.country,
        departure_time: departureTime,
        arrival_time: arrivalTime
      })
      .then(() => {
        setOrigin(null);
        setDestination(null);
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="card bg-light">
        <div className="card-header">
          <strong>Add a new trip</strong>
        </div>
        <div className="card-body">
          <div className="form-row">
            <div className="form-group col-md-8">
              <label htmlFor="airline">Airline</label>
              <input id="airline" type="text" className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="flight-id">Flight No.</label>
              <input id="flight-id" type="text" className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="origin-airport">Origin</label>
              <AirportSelect
                selected={origin}
                onSelect={airport => setOrigin(airport)}
                id="origin-airport"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="destination-airport">Destination</label>
              <AirportSelect
                selected={destination}
                onSelect={airport => setDestination(airport)}
                id="destination-airport"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="">Departure Time</label>
              <div>
                <DatePicker
                  className="form-control"
                  selected={departureTime}
                  onChange={date => setDepartureTime(date)}
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Arrival Time</label>
              <div>
                <DatePicker
                  className="form-control"
                  selected={arrivalTime}
                  onChange={date => setArrivalTime(date)}
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
              <input id="reservation-id" type="text" className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="seat-id">
                Seat No.{" "}
                <small className="text-secondary">(if available)</small>
              </label>
              <input id="seat-id" type="text" className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="seat-id">
                Gate <small className="text-secondary">(if available)</small>
              </label>
              <input id="seat-id" type="text" className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="class">Class</label>
              <select name="class" id="class" className="form-control">
                <option selected>Economy</option>
                <option>Economy Plus</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="baggage">Baggage Allowance</label>
              <input id="baggage" type="text" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea className="form-control w-100" id="notes" rows="3" />
          </div>
        </div>
        <div className="card-footer text-right">
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
};
