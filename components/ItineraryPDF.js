import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";

export const ItineraryPDF = ({trips}) => (
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

ItineraryPDF.propTypes = {
  trips: PropTypes.array
};
