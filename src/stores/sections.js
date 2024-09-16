import { ref } from "vue";
import { defineStore } from "pinia";
import { getSectionByClassId } from "../http/sections-api";

export const useSectionsStore = defineStore("sectionsStore", () => {
    const sections = ref([]);

    const getSectionClassId = async (class_id = null) => {
        const { data } = await getSectionByClassId(class_id);
        sections.value = data;
    };

    return {
        sections,
        getSectionClassId,
    };
});
