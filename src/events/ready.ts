import { Event } from "../pixel/event";
export default new Event("ready", () => {
  console.log("Chronos is online!");
});
