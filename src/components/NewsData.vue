<template>
    <div class="news-data">
        <div class="card text-center news-card">
            <div class="card-header">
                מבזקי חדשות
            </div>
            <div v-for="(item, index) in data" :key="item.Id" :class="{ 'add-border': index !== data.length - 1 }">
                <div class="card-body">
                    <h5 class="card-title red-title">{{ formattedTime(item.Date) }}</h5>
                    <p class="card-text">{{ item.Title }}</p>
                </div>
                <div class="btn-card">
                    <button type="button" @click="openEdit(item)" class="btn btn-outline-primary edit-btn">עריכה</button>
                    <EditNews v-if="openEditModal" :item="editItem" @editData="updateData" @cancelEdit="resetOpenEditModal" />
                    <button type="button" @click="openDelete(item.Id)"
                        class="btn btn-outline-primary delete-btn">מחיקה</button>
                    <DeleteNews v-if="openDeleteModal" :itemId="itemId" @deleteData="updateData" @cancelDelete="resetOpenDeleteModal" />
                </div>
            </div>
        </div>
        <AddNews @addData="updateData" />
    </div>
</template>

<script>
import AddNews from './AddNews.vue';
import EditNews from './EditNews.vue';
import DeleteNews from './DeleteNews.vue';
import { GetAllData } from '../services/FlashService';
import moment from 'moment';
export default {
    name: "News",
    components: { AddNews, EditNews, DeleteNews },
    data() {
        return {
            data: [],
            itemId: 0,
            editItem: {},
            openDeleteModal: false,
            openEditModal: false
        }
    },
    methods: {
        getAllData() {
            GetAllData().then(response => {
                this.data = response;
            })
        },
        updateData(data) {
            this.openDeleteModal = false;
            this.openEditModal = false;
            this.data = data;
        },
        resetOpenEditModal(close){
            this.openEditModal = close;
        },
        resetOpenDeleteModal(close){
            this.openDeleteModal = close;
        },
        formattedTime(date) {
            return moment(date).format('HH:mm');
        },
        openDelete(id) {
            this.itemId = id;
            this.openDeleteModal = true;
        },
        openEdit(item) {
            this.editItem = item;
            this.openEditModal = true;
        }
    },
    mounted() {
        this.getAllData();
    }
};
</script>

<style scoped>
.news-data {
    width: 336px;
}

.news-card {
    min-height: 584.8px;
    height: 584.8px;
    overflow-y: scroll;
}

.btn-card {
    margin: 5px;
}

.add-border:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.176)
}

.delete-btn {
    width: 49%;
}

.edit-btn {
    margin-left: 4px;
    width: 49%;
}

.card-header {
  position: sticky;
  top: 0;
  background-color: #dee2e6;
  z-index: 1;
}

</style>