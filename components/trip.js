import React, { useState, useEffect } from "react";
import { useUser } from "../hooks/auth";
import DatePicker from "react-datepicker";

import Firebase from "../services/firebase";

function useUserTrips() {
  const user = useUser();

  const [trips, setTrips] = useState([]);

  useEffect(
    () => {
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
    },
    [user]
  );

  return trips;
}

export const TripList = () => {
  const trips = useUserTrips();

  if (!trips.length) {
    return <div>You don't have any trips</div>;
  }

  return (
    <div>
      <h1>Trips</h1>
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
                          <div className="card-subtitle">{trip.origin}</div>
                      </div>
                      <div className="col-sm-4">
                          Flight duration:
                          {` ${(trip.arrival_time.seconds - trip.departure_time.seconds) /
                          3600} hrs`}
                      </div>
                      <div className="col-sm-4">
                          <h5 className="card-title">
                              {new Date(
                                  trip.arrival_time.seconds * 1000
                              ).toLocaleDateString()}
                          </h5>
                          <div className="card-subtitle">{trip.destination}</div>
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
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());

  const user = useUser();

  function onSubmit(e) {
    e.preventDefault();

    Firebase.firestore()
      .collection("users")
      .doc(user.uid)
      .collection("trips")
      .add({
        origin,
        destination,
        departure_time: departureTime,
        arrival_time: arrivalTime
      })
      .then(() => {
        setOrigin("");
        setDestination("");
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Origin</label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            value={origin}
            onChange={e => setOrigin(e.currentTarget.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Destination</label>
          <input
            type="text"
            className="form-control"
            id="inputPassword4"
            value={destination}
            onChange={e => setDestination(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="">Departure Time</label>
          <DatePicker
            className="form-control"
            selected={departureTime}
            onChange={date => setDepartureTime(date)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="">Arrival Time</label>
          <DatePicker
            className="form-control"
            selected={arrivalTime}
            onChange={date => setArrivalTime(date)}
          />
        </div>
      </div>
      <div className="form-row">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};
