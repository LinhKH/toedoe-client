import { ref } from "vue";
import { defineStore } from "pinia";
import {
	getAllStudents,
	deleteSingleRecords,
	deleteMassRecords,
	apiExportStudent,
} from "../http/students-api";

export const useStudentStore = defineStore("studentStore", () => {
	const students = ref([]);
	const allStudent = ref([]);

	const fetchAllStudents = async (params = "") => {
		const { data } = await getAllStudents(params);
		students.value = data;
	};
	const fetchAllStudentsWithoutPagination = async (params = "") => {
		const { data } = await getAllStudents(params);
		allStudent.value = data;
	};

	const removeSingleRecords = async (product_id) => {
		await deleteSingleRecords(product_id);
	};

	const removeMassRecords = async (checked) => {
		await deleteMassRecords(checked);
	};

	const exportStudent = async (student) => {
		await apiExportStudent(student);
	};

	return {
		students,
		allStudent,
		fetchAllStudents,
		fetchAllStudentsWithoutPagination,
		removeSingleRecords,
		removeMassRecords,
		exportStudent,
	};
});
