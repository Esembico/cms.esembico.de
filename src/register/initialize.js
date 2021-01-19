import StateRegister from "./StateRegister";
import teamOptions from "./options/teamOptions";
import recommendationOptions from "./options/recommendationOptions";
import imageOptions from "./options/imageOptions";

StateRegister.register("team", teamOptions);
StateRegister.register("recommendations", recommendationOptions);
StateRegister.register("images", imageOptions);
