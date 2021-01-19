import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faOtter } from "@fortawesome/free-solid-svg-icons";

const recommendationOptions = {
  columns: [
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
  ],
  primaryProperty: {
    header: "Title",
    display: "title",
  },
};

export default recommendationOptions;
