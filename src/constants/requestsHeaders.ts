import { environmentId, projectId } from "./variable";

export const defaultHeaders = {
  projectId: projectId,
  environmentId: environmentId,
  "Content-Type": "application/json",
};
