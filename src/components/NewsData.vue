<template>
    <div class="news-data">
        <div class="card text-center news-card">
            <div class="card-header">
                מבזקי חדשות
            </div>
            <div class="news-container" ref="newsContainer">
                <ul>
                    <li v-for="(item, index) in data" :key="index" class="add-border">
                        <div class="card-body">
                            <h5 class="card-title red-title">{{ formattedTime(item.Date) }}</h5>
                            <p class="card-text">{{ item.Title }}</p>
                        </div>
                        <div class="btn-card">
                            <button type="button" @click="openEdit(item)"
                                class="btn btn-outline-primary edit-btn">עריכה</button>
                            <button type="button" @click="openDelete(item.Id)"
                                class="btn btn-outline-primary delete-btn">מחיקה</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <EditNews v-if="openEditModal" :item="editItem" @editData="updateData" @cancelEdit="resetOpenEditModal" />
        <DeleteNews v-if="openDeleteModal" :itemId="itemId" @deleteData="updateData" @cancelDelete="resetOpenDeleteModal" />
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
            this.startAnimation();
        },
        resetOpenEditModal(close) {
            this.openEditModal = close;
            this.startAnimation();
        },
        resetOpenDeleteModal(close) {
            this.openDeleteModal = close;
            this.startAnimation();
        },
        formattedTime(date) {
            return moment(date).format('HH:mm');
        },
        openDelete(id) {
            this.itemId = id;
            this.openDeleteModal = true;
        },
        openEdit(item) {
            this.stopAnimation();
            this.editItem = item;
            this.openEditModal = true;
        },
        stopAnimation() {
            const newsContainer = document.querySelector('.news-container ul');
            newsContainer.style.animationPlayState = 'paused';
        },
        startAnimation() {
            if (!this.openEditModal && !this.openDeleteModal) {
                const newsContainer = document.querySelector('.news-container ul');
                newsContainer.style.animationPlayState = 'running';
            }
        }
    },
    mounted() {
        this.getAllData();
        const newsContainer = this.$refs.newsContainer;
        newsContainer.addEventListener('mouseenter', this.stopAnimation);
        newsContainer.addEventListener('mouseleave', this.startAnimation);
    },
};
</script>

<style scoped>
.news-container {
    height: 540px;
    overflow: hidden;
}

.news-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    animation: scroll-up 20s linear infinite;
}

.news-container ul li {
    margin: 10px 0;
}

@keyframes scroll-up {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-150%);
    }
}

.news-data {
    width: 336px;
}

.news-card {
    min-height: 584.8px;
    height: 584.8px;
}

.btn-card {
    margin: 5px;
}

.add-border:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.176)
}

.add-border:first-child{
    margin-top: 450px;
}
/* .add-border:last-child{
    margin-bottom: 450px;
} */

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