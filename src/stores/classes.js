import { ref } from "vue";
import { defineStore } from "pinia";
import { allClasses } from "../http/classes-api";

export const useClassesStore = defineStore("classesStore", () => {
    const classess = ref([]);

    const fetchAllClasses = async (params = {}) => {
        const { data } = await allClasses(params);
        classess.value = data;
    };

    return {
        classess,
        fetchAllClasses,
    };
});
