import { createEffect, Suspense, type VoidComponent } from "solid-js";
import { signOut, signIn } from "@auth/solid-start/client";
import { createServerData$ } from "solid-start/server";
import { getSession } from "@auth/solid-start";
import { authOpts } from "./api/auth/[...solidauth]";

const Home: VoidComponent = () => {
	return (
		<div class="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
			<div class="flex flex-col items-center gap-2">
				<Suspense>
					<AuthShowcase />
				</Suspense>
			</div>
		</div>
	);
};

export default Home;

const AuthShowcase: VoidComponent = () => {
	const sessionData = createSession();
	createEffect(() => {
		if (sessionData()?.user) window.location.assign("/chat");
	});

	return (
		<>
			<div class="flex flex-col items-center justify-center gap-4">
				<p class="text-center text-2xl text-white">
					{sessionData() && (
						<span>Logged in as {sessionData()?.user?.name}</span>
					)}
				</p>

				<button
					class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
					onClick={() => (sessionData() ? signOut() : signIn("discord"))}
				>
					{sessionData() ? "Sign out" : "Sign in"}
				</button>
			</div>
		</>
	);
};

export const createSession = () => {
	return createServerData$(async (_, event) => {
		return await getSession(event.request, authOpts);
	});
};
