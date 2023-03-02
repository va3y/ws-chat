import { ParentComponent, Show } from "solid-js";
import { createSession } from "~/routes";

export const ProtectedRoute: ParentComponent = (props) => {
	const res = createSession();

	return (
		<Show when={res()?.user} fallback={<div>You need to be logged in </div>}>
			{props.children}
		</Show>
	);
};
