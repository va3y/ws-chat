// @refresh reload
import "./root.css";
import { Suspense } from "solid-js";
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
	Link,
} from "solid-start";
import { QueryProvider } from "@prpc/solid";
import { QueryClient, QueryClientProvider } from "@adeora/solid-query";

const queryClient = new QueryClient();

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>Create JD App</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta name="theme-color" content="#026d56" />
				<Meta name="description" content="Generated by create-jd-app" />
				<Link rel="icon" href="/favicon.ico" />
			</Head>
			<Body>
				<QueryProvider>
					<QueryClientProvider client={queryClient}>
						<Suspense>
							<ErrorBoundary>
								<main class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#026d56] to-[#152a2c]">
									<Routes>
										<FileRoutes />
									</Routes>
								</main>
							</ErrorBoundary>
						</Suspense>
					</QueryClientProvider>
				</QueryProvider>
				<Scripts />
			</Body>
		</Html>
	);
}
