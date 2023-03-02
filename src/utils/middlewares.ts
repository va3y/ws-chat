import { getSession } from "@auth/solid-start";
import { redirect } from "solid-start";
import type { Middleware } from "solid-start/entry-server";
import { authOpts } from "~/routes/api/auth/[...solidauth]";

const protectedPaths = ["/chat"];

export const protectedRouteMiddleware: Middleware = ({ forward }) => {
	return async (event) => {
		const pathname = new URL(event.request.url).pathname;
		const session = await getSession(event.request, authOpts);

		if (pathname === "/" && session?.user) return redirect("/chat");

		if (protectedPaths.includes(pathname) && !session?.user)
			return redirect("/");

		return forward(event);
	};
};
