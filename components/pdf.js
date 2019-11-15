import React from "react";
import { Page, Text, View, Document, PDFDownloadLink } from "@react-pdf/renderer";

// TODO: Convert to function components
// TODO: Add PropType validation
// TODO: Handle errors

export const TripPDF = ({trips}) => (
  <Document>
    <Page size="A4">
      { console.log(trips) }
      { trips.map(trip => (
        <View key={trip.id}>
          <Text>{trip.origin_airport}</Text>
          <Text>{trip.destination_airport}</Text>
        </View>
      )) }
    </Page>
  </Document>
);

const DowloadTripPDF = ({trips}) => (
  <PDFDownloadLink document={<TripPDF trips={trips}/>} fileName="itinerary.pdf">
    {({loading}) => (loading ? 'Loading document...' : 'Download now!')}
  </PDFDownloadLink>
);

export default DowloadTripPDF;
