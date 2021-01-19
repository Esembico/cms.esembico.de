import makeDataPage from "../helpers/makeDataPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faOtter } from "@fortawesome/free-solid-svg-icons";

const columns = [
  {
    header: "Type",
    display: (entry) => {
      switch (entry.type) {
        case "movie":
          return <FontAwesomeIcon icon={faFilm} />;
        case "misc":
          return <FontAwesomeIcon icon={faOtter} />;
        default:
          return entry.type;
      }
    },
  },
  {
    header: "Title",
    display: "title",
  },
  {
    header: "Description",
    display: "description",
  },
];

const primaryProperty = {
  header: "Title",
  display: "title",
};

export default makeDataPage({
  columns,
  primaryProperty,
  entity: "recommendations",
});
