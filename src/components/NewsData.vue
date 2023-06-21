<template>
    <div class="news-data">
        <div class="card text-center news-card">
            <div class="card-header">
                מבזקי חדשות
            </div>
            <div v-for="(item, index) in data" :key="item.Id" :class="{ 'not-last': index !== data.length - 1 }">
                <div class="card-body">
                    <h5 class="card-title red-title">{{ formattedTime(item.Date) }}</h5>
                    <p class="card-text">{{ item.Title }}</p>
                </div>
                <div class="btn-card">
                    <EditNews :item="item" @editData="updateData" />
                    <DeleteNews v-if="item.Id" :itemId="item.Id" @deleteData="updateData" />
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
        }
    },
    methods: {
        getAllData() {
            GetAllData().then(response => {
                this.data = response;
            })
        },
        updateData(data) {
            this.data = data;
        },
        formattedTime(date) {
            return moment(date).format('HH:mm');
        },
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
.btn-card{
    margin: 5px;
}

.not-last {
    border-bottom: 1px solid rgba(0, 0, 0, 0.176)
}
</style>