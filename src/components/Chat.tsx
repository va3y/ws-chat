import type { VoidComponent } from "solid-js";
import { For } from "solid-js";
import { trpc } from "~/utils/trpc";

export const Chat: VoidComponent = () => {
	const { data: messages } = trpc.chat.getMessages.useQuery();
	const postMessage = trpc.chat.postMessage.useMutation();

	return (
		<div>
			<For each={messages}>
				{(item) => (
					<div class="bg-blue-500 rounded p-4">
						<div>From: {item.user.name}</div>
						<div>{item.message}</div>
					</div>
				)}
			</For>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const data = new FormData(e.currentTarget);

					postMessage.mutate({ message: data.get("message") as string });
				}}
			>
				<p>New message: </p>
				<textarea name="message" />

				<button type="submit">Send</button>
			</form>
		</div>
	);
};
