import StateRegister from "./StateRegister";
import teamOptions from "./options/teamOptions";
import recommendationOptions from "./options/recommendationOptions";
import imageOptions from "./options/imageOptions";
import prototypeOptions from "./options/prototypeOptions";

StateRegister.register("team", teamOptions);
StateRegister.register("recommendations", recommendationOptions);
StateRegister.register("images", imageOptions);
StateRegister.register("prototypes", prototypeOptions);
