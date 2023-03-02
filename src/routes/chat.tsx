import type { VoidComponent } from "solid-js";
import { For } from "solid-js";
import { createSession } from ".";
import { signOut } from "@auth/solid-start/client";
import { formatDuration, intervalToDuration } from "date-fns";

import { getMessages, postMessage } from "~/server/queries";

export const ChatPage: VoidComponent = () => {
	const postMessageMutation = postMessage();
	const getMessagesQuery = getMessages();

	const session = createSession();

	const formatDate = (str: string) =>
		formatDuration(
			intervalToDuration({
				start: Date.now(),
				end: new Date(str).getTime(),
			})
		) + " ago";

	return (
		<div>
			<header>
				<div>logged in as: {session()?.user?.name}</div>
				<button
					onClick={() => {
						console.log(123);
						signOut();
					}}
				>
					Log out
				</button>
			</header>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const data = new FormData(e.currentTarget);
					await postMessageMutation.mutateAsync(
						{ message: data.get("message") as string },
						{ onSuccess: () => getMessagesQuery.refetch() }
					);
					e.currentTarget.reset();
				}}
			>
				<p>New message: </p>
				<textarea name="message" />

				<button type="submit">Send</button>
			</form>
			<div class="flex flex-col gap-4">
				<For each={getMessagesQuery.data}>
					{(item) => (
						<div class="bg-blue-500 rounded p-4">
							<div>From: {item.user.name}</div>
							<div class="text-xs mb-4">
								{formatDate(item.createdAt as unknown as string)}
							</div>
							<div>{item.message}</div>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};

export default ChatPage;
