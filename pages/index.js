import React from "react";
import Head from "next/head";
import { Nav } from "../components/nav";
import { TripList } from "../components/trip";

const Home = () => (
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
      <TripList />
    </div>
  </div>
);

export default Home;
