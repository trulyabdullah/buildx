import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createProject, getProjectById, getProjects } from "../actions";

export const useGetProjects = () => {
	return useQuery({
		queryKey: ["projects"],
		queryFn: () => getProjects(),
	});
};

export const useCreateProject = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationfn: (value) => createProject(value),
		onSuccess: () => queryClient.invalidateQueries(["projects"]),
	});
};

export const useGetProject = () => {
	return useQuery({
		queryKey: ["project", projectId],
		queryFn: () => getProjectById(projectId),
	});
};
