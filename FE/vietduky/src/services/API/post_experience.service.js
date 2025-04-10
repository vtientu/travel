import restClient from "../restClient";

export const PostExperienceService = {
    getAllPostExperience: () => {
        return restClient({
            url: "post-experience",
            method: "GET",
        });
    },
    getPostExperienceById: (id) => {
        return restClient({
            url: `post-experience/${id}`,
            method: "GET",
        });
    },
    createPostExperience: (data) => {
        return restClient({
            url: "post-experience",
            method: "POST",
            data,
        });
    },
    updatePostExperience: (id, data) => {
        return restClient({
            url: `post-experience/${id}`,
            method: "PUT",
            data,
        });
    },
    deletePostExperience: (id) => {
        return restClient({
            url: `post-experience/${id}`,
            method: "DELETE",
        });
    },
};