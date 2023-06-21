<template>
    <button type="button" class="btn btn-outline-primary edit-btn" data-bs-toggle="modal" data-bs-target="#editModal">עריכה</button>
    <div class="modal fade" data-bs-backdrop="static" id="editModal" tabindex="-1" aria-labelledby="editModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editModalLabel">עריכה</h1>
                    <button type="button" class="btn-close x-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="recipient-name" class="col-form-label title-label">כותרת:</label>
                    <input type="text" class="form-control card-text" id="recipient-name" placeholder="הכנס כותרת"
                        v-model="item.Title">
                </div>
                <div class="modal-footer">
                    <button @click="saveChanges()" type="button" class="btn btn-outline-primary modal-btn" data-bs-dismiss="modal">שמור</button>
                    <button type="button" class="btn btn-outline-secondary modal-btn" data-bs-dismiss="modal">ביטול</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EditFlash } from '../services/FlashService';
export default {
    name: "EditNews",
    emits: ["editData"],
    props: {
        item: {
            type: Object
        }
    },
    data() {
        return {
            lastTitle: this.item.Title
        }
    },
    methods: {
        saveChanges() {
            if (!this.item.Title) {
                alert('לא ניתן לשמור אוביקט ריק');
            } else {
                if (this.item.Title != this.lastTitle) {
                    EditFlash(this.item).then(res => {
                        this.$emit("editData", res);
                    });
                }
            }
        },
        formattedTime(date) {
            return moment(date).format('HH:mm');
        },
    }
};
</script>

<style scoped>
.edit-btn {
    margin-left: 4px;
    width: 49%;
}

.title-label{
    float: right;
}
</style>