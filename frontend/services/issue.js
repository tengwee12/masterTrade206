import { axiosInstance } from "../services/axios";

export async function fetchIssueData(issueId) {
  try {
    const result = await axiosInstance.get(`/api/issue/${issueId}`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
