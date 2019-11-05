import React, { useState } from "react";
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

  const SuggestionList = () => (
    <ul className="list-group position-absolute">
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
    <div className="form-group">
      <label htmlFor={id}>Origin</label>
      <input
        className="form-control"
        id={id}
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
      />
      {suggestions ? <SuggestionList /> : ""}
    </div>
  );
};
