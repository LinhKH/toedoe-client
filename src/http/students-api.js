import api from "./api";

const resource = '/api' + "/students";

export const getAllStudents = (params) => api.get(`${resource}?${params}`);

// export const createTask = (task) => api.post(resource, task);

// export const updateTask = (id, task) => api.put(`${resource}/${id}`, task);

export const deleteMassRecords = (checked) => api.delete(`${resource}/massDestroy/${checked}`);
export const deleteSingleRecords = (student_id) => api.delete(`/api/student/delete/${student_id}`);
export const apiExportStudent = (student_id) => api.get(`/api/students/export/${student_id}`);

// export const completeTask = (id, task) =>
//   api.patch(`${resource}/${id}/complete`, task);
