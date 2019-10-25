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
          <div className="row mb-3">
            <div className="col-sm-12">
              <span className="h2">
                {trip.origin} -> {trip.destination}
              </span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-header">Departure information</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="font-weight-bold mr-3">Origin: </span>
                    {trip.origin}
                  </li>
                  <li className="list-group-item">
                    <span className="font-weight-bold mr-3">
                      Departure Time:{" "}
                    </span>
                    {new Date(
                      trip.departure_time.seconds * 1000
                    ).toLocaleDateString()}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-header">Destination information</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="font-weight-bold mr-3">Destination: </span>
                    {trip.destination}
                  </li>
                  <li className="list-group-item">
                    <span className="font-weight-bold mr-3">
                      Arrival Time:{" "}
                    </span>
                    {new Date(
                      trip.arrival_time.seconds * 1000
                    ).toLocaleDateString()}
                  </li>
                </ul>
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
