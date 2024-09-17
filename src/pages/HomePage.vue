<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import debounce from 'lodash.debounce';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { useToast } from 'vue-toast-notification';

import { useClassesStore } from '@/stores/classes';
import { useSectionsStore } from '@/stores/sections';
import { useStudentStore } from '@/stores/students';

const item_per_page = ref(10);
const selectedClass = ref('');
const selectedSection = ref('');
const search = ref('');
const sort_direction = ref('desc');
const sort_field = ref('created_at');
const checked = ref([]);
const isCheckAll = ref(false);
const selectAll = ref(false);
const getStudentsUrl = ref('');
const getStudentsUrlWithoutPaginate = ref('');

const classStore = useClassesStore();
const { classess } = storeToRefs(classStore);
const { fetchAllClasses } = classStore;

const sectionStore = useSectionsStore();
const { sections } = storeToRefs(sectionStore);
const { getSectionClassId } = sectionStore;

const studentStore = useStudentStore();
const { students, allStudent, isLoading } = storeToRefs(studentStore);
const { fetchAllStudents, fetchAllStudentsWithoutPagination, removeSingleRecords, removeMassRecords, exportStudent } = studentStore;
const $toast = useToast();

import Loading from '../components/loader/Loading.vue';
import Checkbox from '../components/Checkbox.vue';
import CheckAll from '../components/CheckAll.vue';
import Sortable from '../components/Sortable.vue';

onMounted(async () => {
    await fetchAllClasses();
    await getStudents();
});

watch(() => selectedClass.value, () => {
    getSectionClassId(selectedClass.value);
    getStudents();
});

watch(() => selectedSection.value, () => {
    getStudents();
});

watch(() => item_per_page.value, () => {
    getStudents();
});

watch(() => search.value, debounce((value) => {
    getStudents();
}, 300));

watch(() => checked.value, (value) => {
    if (checked.value.length == students.value.data.length) {
        isCheckAll.value = true;
    } else {
        isCheckAll.value = false;
    }
});

const isChecked = (student_id) => {
    return checked.value.includes(student_id);
};

const getStudents = async (page = 1) => {
    getStudentsUrlWithoutPaginate.value =
        "q=" +
        search.value +
        "&sort_direction=" +
        sort_direction.value +
        "&sort_field=" +
        sort_field.value +
        "&selectedClass=" +
        selectedClass.value +
        "&selectedSection=" +
        selectedSection.value;

    getStudentsUrl.value = getStudentsUrlWithoutPaginate.value.concat(
        "&item_per_page=" + item_per_page.value + "&page=" + page
    );

    await fetchAllStudents(getStudentsUrl.value);

};

const deleteSingleRecord = async (student_id) => {
    await removeSingleRecords(student_id);
    checked.value = checked.value.filter(id => id !== student_id);
    await getStudents();
    $toast.success('Student removed succcessfully!');
};

const deleteRecords = async () => {
    await removeMassRecords(checked.value);
    checked.value = [];
    await getStudents();
    $toast.success("Selected Students were Deleted Successfully");
};

const selectAllRecords = async () => {
    await fetchAllStudentsWithoutPagination(getStudentsUrlWithoutPaginate.value);
    checked.value = [];

    allStudent.value.data.map(student => {
        checked.value.push(student.id);
    });
    selectAll.value = true;
};

const exportSelectedStudent = async () => {
    await exportStudent(checked.value);
};

const handleSearch = async (field) => {
    if (field === sort_field.value) {
        if (sort_direction.value === 'desc') {
            sort_direction.value = 'asc'
        } else {
            sort_direction.value = 'desc'
        }
    } else {
        sort_field.value = field;
        sort_direction.value = 'asc'
    }
    await getStudents();
}

</script>

<template>
    <div>
        <Loading v-if="isLoading" />

        <div class="wrapper">
            <div class="content-wrapper">
                <div class="content">
                    <div class="container-fluid">
                        <div class="container">
                            <div class="row mt-5">
                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h3 class="card-title">Vue.js DataTable Tutorial</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="d-flex justify-content-between align-content-center mb-2 mt-2">
                                            <div class="d-flex">
                                                <div class="d-flex align-items-center ml-4 me-5">
                                                    <label for="item_per_page" class="text-nowrap mr-2 mb-0">Per
                                                        Page</label>
                                                    <select v-model="item_per_page"
                                                        class="form-control form-control-sm">
                                                        <option value="10">10</option>
                                                        <option value="20">20</option>
                                                        <option value="30">30</option>
                                                    </select>
                                                </div>
                                                <div class="d-flex align-items-center ml-4 me-5">
                                                    <label for="item_per_page" class="text-nowrap mr-5 mb-0">Filter By
                                                        Class</label>
                                                    <select v-model="selectedClass"
                                                        class="form-control form-control-sm">
                                                        <option value="">All Class</option>
                                                        <option v-for="item in classess.data" :key="item.id"
                                                            :value="item.id">
                                                            {{ item.name }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <template v-if="selectedClass">
                                                    <div class="d-flex align-items-center ml-4 me-5">
                                                        <label for="item_per_page"
                                                            class="text-nowrap mr-2 mb-0">Section</label>
                                                        <select v-model="selectedSection"
                                                            class="form-control form-control-sm">
                                                            <option value="">Select a Section</option>
                                                            <option v-for="section in sections.data" :key="section.id"
                                                                :value="section.id">
                                                                {{ section.name }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </template>

                                                <div class="dropdown">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button" v-if="checked.length > 0"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                        With Checked ({{ checked.length }})
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a href="#"
                                                                onclick="confirm('Are you sure you wanna delete this Record?') || event.stopImmediatePropagation()"
                                                                class="dropdown-item" type="button"
                                                                @click.prevent="deleteRecords">
                                                                Delete
                                                            </a>
                                                        </li>
                                                        <li><a @click.prevent="exportSelectedStudent"
                                                                class="dropdown-item" type="button">
                                                                Export
                                                            </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <input v-model="search" type="search" class="form-control"
                                                    placeholder="Search by name,email,phone,or address..." />
                                            </div>
                                        </div>
                                        <div class="col-md-10 mb-2" v-if="isCheckAll || selectAll">
                                            <div v-if="selectAll || students.meta.total == checked.length">
                                                You are currently selecting all
                                                <strong>{{ checked.length }}</strong> items.
                                            </div>
                                            <div v-else>
                                                You have selected <strong>{{ checked.length }}</strong> items,
                                                Do you want to Select All
                                                <strong>{{ students.meta.total }}</strong>?
                                                <a @click.prevent="selectAllRecords" href="#" class="ml-2">Select
                                                    All</a>
                                            </div>
                                        </div>
                                        <div class="card-body table-responsive p-0">
                                            <table class="table table-hover">
                                                <tbody>
                                                    <tr>
                                                        <th>
                                                            <!-- <input type="checkbox" @change="setCheckAll"
                                                                 v-model="isCheckAll" /> -->
                                                            <CheckAll v-model="checked"  v-if="students && students.data" :rows="students.data"/>
                                                        </th>
                                                        <th>
                                                            <Sortable :sort_field="sort_field" :sort_direction="sort_direction" label="Student's Name" name="name" @click="handleSearch('name')" />
                                                        </th>
                                                        <th>
                                                            <Sortable :sort_field="sort_field" :sort_direction="sort_direction" label="Email" name="email" @click="handleSearch('email')" />
                                                        </th>
                                                        <th>
                                                            <Sortable :sort_field="sort_field" :sort_direction="sort_direction" label="Address" name="address" @click="handleSearch('address')" />
                                                        </th>
                                                        <th>
                                                            <Sortable :sort_field="sort_field" :sort_direction="sort_direction" label="Phone" name="phone_number" @click="handleSearch('phone_number')" />
                                                        </th>
                                                        <th>
                                                            <Sortable :sort_field="sort_field" :sort_direction="sort_direction" label="Created At" name="created_at" @click="handleSearch('created_at')" />
                                                        </th>
                                                        <th>Class</th>
                                                        <th>Section</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    <tr v-for="student in students.data" :key="student.id"
                                                        :class="isChecked(student.id) ? 'table-primary' : ''">
                                                        <td>
                                                            <Checkbox :value="student.id" v-model:checked="checked" />
                                                            <!-- <input type="checkbox" :value="student.id" v-model="checked" /> -->
                                                        </td>
                                                        <td>{{ student.name }}</td>
                                                        <td>{{ student.email }}</td>
                                                        <td>{{ student.address }}</td>
                                                        <td>{{ student.phone_number }}</td>
                                                        <td>{{ student.created_at }}</td>
                                                        <td>{{ student.class }}</td>
                                                        <td>{{ student.section }}</td>
                                                        <td>
                                                            <button
                                                                onclick="confirm('Are you sure you wanna delete this Record?') || event.stopImmediatePropagation()"
                                                                class="btn btn-danger btn-sm"
                                                                @click="deleteSingleRecord(student.id)">
                                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-sm-6 offset-5">
                                                <Bootstrap5Pagination :data="students" :limit="5"
                                                    @pagination-change-page="getStudents"></Bootstrap5Pagination>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>