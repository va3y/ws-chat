import solid from "solid-start/vite";
import { defineConfig } from "vite";
import vercel from "solid-start-vercel";
import prpc from "@prpc/solid";

export default defineConfig(() => {
	return {
		plugins: [prpc(), solid({ ssr: true, adapter: vercel({ edge: false }) })],
		ssr: { external: ["@prisma/client"] },
	};
});
