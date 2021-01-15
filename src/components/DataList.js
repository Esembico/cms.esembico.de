import React from "react";
import "../css/DataList.css";
import getDisplayValue from "../helpers/getDisplayValue";

export default function DataList({
  data,
  primaryProperty,
  selected,
  onSelect,
}) {
  return (
    <ul className="data-list">
      <li className="header">{primaryProperty.header}</li>
      {data.map((entry) => {
        return (
          <li
            onClick={() => onSelect(entry.id)}
            className={selected === entry.id ? "entry active" : "entry"}
            key={entry.id}
          >
            {getDisplayValue(entry, primaryProperty.display)}
          </li>
        );
      })}
    </ul>
  );
}
