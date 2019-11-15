import React from "react";
import Head from "next/head";
import { useUser } from "../hooks/auth";
import { Nav } from "../components/nav";
import { TripList, TripNew, useUserTrips } from "../components/trip";
import dynamic from "next/dist/next-server/lib/dynamic";

const DownloadItinerary = dynamic(() => import('../components/pdf'), {
  ssr: false
});

const Home = () => {

  const user = useUser();
  const trips = useUserTrips();

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/styles/react-datepicker.min.css" />
      </Head>

      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-sm-2">Friend Section</div>
          <div className="col-sm-10">
            <TripList />
            {user ? <TripNew /> : ""}
            <div className="row">
              { trips.length ? <DownloadItinerary trips={trips}/> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
