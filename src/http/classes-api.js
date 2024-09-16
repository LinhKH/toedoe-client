import api from "./api";

const resource = '/api' + "/classes";

export const allClasses = () => api.get(resource);

// export const createTask = (task) => api.post(resource, task);

// export const updateTask = (id, task) => api.put(`${resource}/${id}`, task);

// export const removeTask = (id) => api.delete(`${resource}/${id}`);

// export const completeTask = (id, task) =>
//   api.patch(`${resource}/${id}/complete`, task);
