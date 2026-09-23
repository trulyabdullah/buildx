import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const processTask = inngest.createFunction(
	{
		id: "process-task",
		triggers: { event: "app/task.created" },
	},
	async ({ event, step }) => {
		const helloAgent = createAgent({
			name: "hello-agent",
			description: "A simple agent",
			system: "You are a helpful assisstant",
			model: gemini({ model: "gemini-2.0-flash" }),
		});

		const { output } = await helloAgent.run("Say hello to user");
		return { message: output[0].content };
	},
);
