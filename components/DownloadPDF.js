import React from "react";
import PropTypes from "prop-types";
import { PDFDownloadLink } from "@react-pdf/renderer";

const DownloadPDFLink = ({
  document,
  documentName = "print",
  className = "",
  label = "Download"
}) => (
  <PDFDownloadLink
    className={className}
    document={document}
    fileName={`${documentName}.pdf`}
  >
    {({ loading, error }) => {
      if (error) {
        return "Download unavailable";
      } else if (loading) {
        return "Loading document...";
      } else {
        return label;
      }
    }}
  </PDFDownloadLink>
);

export default DownloadPDFLink;

DownloadPDFLink.propTypes = {
  document: PropTypes.object.isRequired,
  documentName: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string
};
