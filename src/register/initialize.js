import StateRegister from "./StateRegister";

StateRegister.register("team", { endpoint: "members", header: "Team" });
StateRegister.register("recommendations", { header: "Recommendations" });
StateRegister.register("images", { header: "Images" });
