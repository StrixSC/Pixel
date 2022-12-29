import { Event } from "../chronos/event";

export default new Event('ready', () => {
	console.log("Chronos is online!");
});