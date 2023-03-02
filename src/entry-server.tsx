import {
	StartServer,
	createHandler,
	renderAsync,
} from "solid-start/entry-server";
import { protectedRouteMiddleware } from "./utils/middlewares";

export default createHandler(
	protectedRouteMiddleware,
	renderAsync((event) => <StartServer event={event} />)
);
