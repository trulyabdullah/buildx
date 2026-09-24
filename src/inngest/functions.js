import Sandbox from "e2b";
import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const processTask = inngest.createFunction(
	{
		id: "process-task",
		triggers: { event: "app/task.created" },
	},
	async ({ event, step }) => {
		const sandboxId = await step.run("get-sandbox-id", async () => {
			const sandbox = await Sandbox.create(
				"abdullahs-project-5a11/buildx-nextjs-build",
			);
			return sandbox.sandboxId;
		});

		const helloAgent = createAgent({
			name: "hello-agent",
			description: "A simple agent",
			system: "You are a helpful assisstant",
			model: gemini({ model: "gemini-3.5-flash" }),
		});

		const { output } = await helloAgent.run("Say hello to user");

		const sandboxUrl = await step.run("get-sandbox-url", async () => {
			const sandbox = await Sandbox.connect(sandboxId);
			const host = sandbox.getHost(3000);
			return `http://${host}`;
		});
		return { message: output[0].content };
	},
);
