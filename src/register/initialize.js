import StateRegister from "./StateRegister";
import teamOptions from "./options/teamOptions";
import recommendationOptions from "./options/recommendationOptions";
import imageOptions from "./options/imageOptions";
import prototypeOptions from "./options/prototypeOptions";
import pageOptions from "./options/pageOptions";

StateRegister.register("team", teamOptions);
StateRegister.register("recommendations", recommendationOptions);
StateRegister.register("images", imageOptions);
StateRegister.register("prototypes", prototypeOptions);
StateRegister.register("pages", pageOptions);
