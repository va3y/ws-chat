import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start";
import Discord from "@auth/core/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { serverEnv } from "~/env/server";
import { prisma } from "~/server/db/client";
import type { Provider } from "@auth/core/providers";

export const authOpts: SolidAuthConfig = {
	callbacks: {
		session({ session, user }) {
			if (session.user) session.user.id = user.id;

			return session;
		},
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		Discord({
			clientId: serverEnv.DISCORD_ID,
			clientSecret: serverEnv.DISCORD_SECRET,
		}) as Provider,
	],
	debug: false,
};

export const { GET, POST } = SolidAuth(authOpts);
