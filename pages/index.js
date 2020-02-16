import React from "react";
import Head from "next/head";
import { useUser } from "../hooks/auth";
import { Nav } from "../components/nav";
import { TripList, TripNew, useUserTrips } from "../components/trip";
import dynamic from "next/dist/next-server/lib/dynamic";
import { ItineraryPDF } from "../components/ItineraryPDF";
import amadeus from "../services/amadeus";

const DownloadPDFLink = dynamic(() => import("../components/DownloadPDF"), {
  ssr: false
});

const Home = () => {
  const user = useUser();
  const trips = useUserTrips();

  function generateItineraryDownloadLink(trips) {
    if (trips) {
      return (
        <DownloadPDFLink
          document={<ItineraryPDF trips={trips} />}
          documentName="itinerary"
          className="btn btn-primary"
          label="Print Itinerary"
        />
      );
    } else {
      return <div> </div>;
    }
  }

  function amadeusExample() {
    amadeus.shopping.flightOffersSearch
      .get({
        originLocationCode: "SYD",
        destinationLocationCode: "BKK",
        departureDate: "2020-08-01",
        adults: "2"
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(responseError) {
        console.log(responseError.code);
      });
  }

  amadeusExample();

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
          <div className="col-sm-12">
            <TripList />
            {user ? <TripNew /> : ""}
            <div className="row">{generateItineraryDownloadLink(trips)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
