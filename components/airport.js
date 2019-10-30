import React, { useState } from "react";
import { airports } from "../data/airports";
import Fuse from "fuse.js";

export const AirportSelect = () => {
  const [searchText, changeSearchText] = useState("");

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
    console.log(fuse.search(text));
  };

  return (
    <div className="form-group">
      <label htmlFor="origin">Origin</label>
      <input
        className="form-control"
        id="origin"
        type="text"
        value={searchText}
        onChange={e => {
          doSearch(e.currentTarget.value);
        }}
      />
    </div>
  );
};
