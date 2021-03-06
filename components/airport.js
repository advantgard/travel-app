import React, { useState } from "react";
import PropTypes from "prop-types";
import { airports } from "../data/airports";
import Fuse from "fuse.js";

export const AirportSelect = ({
  selected = null,
  onSelect = () => {},
  id = Math.random()
    .toString(36)
    .substring(2, 5),
  autocompleteOnLength = 3,
  limitSuggestions = 10
}) => {
  const [searchText, changeSearchText] = useState("");
  const [suggestions, changeSuggestions] = useState([]);

  const fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    maxPatternLength: 16,
    keys: [
      {
        name: "iata",
        weight: 0.5
      },
      {
        name: "name",
        weight: 0.3
      },
      {
        name: "city",
        weight: 0.2
      }
    ]
  };

  const fuse = new Fuse(airports, fuseOptions);

  const doSearch = text => {
    changeSearchText(text);

    if (text.length >= autocompleteOnLength) {
      changeSuggestions(fuse.search(text).slice(0, limitSuggestions));
    } else {
      changeSuggestions([]);
    }
  };

  const selectItem = airport => {
    onSelect(airport);
    changeSearchText("");
    changeSuggestions([]);
  };

  const SuggestionList = id => (
    <ul className="list-group position-absolute" style={{ zIndex: 1000 }}>
      {suggestions.map((airport, index) => (
        <li
          key={`${id}-${airport.iata}-${index}`}
          className={`list-group-item list-group-item-action`}
          onClick={() => {
            selectItem(airport);
          }}
        >
          <strong>{airport.iata}</strong> - {airport.name}, {airport.city},{" "}
          {airport.country}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <input
        className="form-control"
        id={id}
        name={id}
        type="text"
        placeholder={
          selected
            ? `${selected.iata} - ${selected.name}, ${selected.city}, ${selected.country}`
            : ""
        }
        value={searchText}
        onChange={e => {
          doSearch(e.currentTarget.value);
        }}
        autoComplete="off"
      />
      {suggestions ? <SuggestionList id={id}/> : ""}
    </>
  );
};

AirportSelect.propTypes = {
  selected: PropTypes.object,
  onSelect: PropTypes.func,
  id: PropTypes.string,
  autocompleteOnLength: PropTypes.number,
  limitSuggestions: PropTypes.number
};
