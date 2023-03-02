import { getSession } from "@auth/solid-start";
import { query$, mutation$ } from "@prpc/solid";
import server$ from "solid-start/server";
import { z } from "zod";
import { authOpts } from "~/routes/api/auth/[...solidauth]";
import { prisma } from "~/server/db/client";

async function checkProtectedRoute() {
	const session = await getSession(server$.request, authOpts);
	if (!session?.user) throw new Error("unauthorized");

	return session;
}

export const getMessages = query$(
	server$(async () => {
		const session = await getSession(server$.request, authOpts);
		if (!session?.user) throw new Error("unauthorized");

		return await server$(async () => {
			console.log("getting on the server");
			return await prisma.message.findMany({
				orderBy: { createdAt: "desc" },
				take: 10,
				select: {
					message: true,
					createdAt: true,
					user: { select: { name: true } },
				},
			});
		})();
	})
);

export const postMessage = mutation$(
	server$(async (input) => {
		console.log(123, server$.request);
		const session = await checkProtectedRoute();
		if (session.user?.id === undefined) throw new Error("Userid not found");

		return await prisma.message.create({
			data: {
				message: input.message,
				userId: session.user?.id as string,
			},
		});
	}),
	z.object({ message: z.string() }),
	() => ({})
);
