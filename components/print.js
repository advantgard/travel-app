import React from "react";
import { Page, Text, View, Document, PDFDownloadLink } from "@react-pdf/renderer";

export const ViewPDF = () => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

const DowloadItinerary = () => (
  <PDFDownloadLink document={<ViewPDF />} fileName="itinerary.pdf">
    {({loading}) => (loading ? 'Loading document...' : 'Download now!')}
  </PDFDownloadLink>
);

export default DowloadItinerary;


