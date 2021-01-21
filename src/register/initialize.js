import StateRegister from "./StateRegister";
import teamOptions from "./options/teamOptions";
import recommendationOptions from "./options/recommendationOptions";
import imageOptions from "./options/imageOptions";
import prototypeOptions from "./options/prototypeOptions";
import pageOptions from "./options/pageOptions";

StateRegister.setGlobalOptions({
  getNextPageNumber: (json) => {
    const pageRegex = /[\w\W]*page=([0-9]*)/;
    if (json.next) {
      const groups = json.next.match(pageRegex);
      return parseInt(groups[1]);
    } else {
      return null;
    }
  },
});
StateRegister.register("team", teamOptions);
StateRegister.register("recommendations", recommendationOptions);
StateRegister.register("images", imageOptions);
StateRegister.register("prototypes", prototypeOptions);
StateRegister.register("pages", pageOptions);
