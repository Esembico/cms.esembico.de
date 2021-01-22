import React from "react";
import "../css/DataList.css";
import getDisplayValue from "../helpers/getDisplayValue";
import Pagination from "./Pagination";

export default function DataList({
  data,
  primaryProperty,
  selected,
  onSelect,
  onPageChange,
  pageData,
}) {
  return (
    <React.Fragment>
      <div style={{ marginRight: "10px" }}>
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
        <Pagination
          align="right"
          lastPage={pageData.last}
          onPageChange={onPageChange}
          selectedPage={pageData.current}
        ></Pagination>
      </div>
    </React.Fragment>
  );
}
