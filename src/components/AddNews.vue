<template>
    <button type="button" class="btn btn-outline-primary add-btn" data-bs-toggle="modal"
        data-bs-target="#addModal">הוספה</button>
    <div class="modal fade" data-bs-backdrop="static" id="addModal" tabindex="-1" aria-labelledby="addModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addModalLabel">הוספה</h1>
                    <button type="button" class="btn-close x-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">כותרת:</label>
                        <input type="text" class="form-control card-text" id="recipient-name" placeholder="הכנס כותרת"
                            v-model="title">
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="saveChanges()" type="button" class="btn btn-outline-primary modal-btn"
                        data-bs-dismiss="modal">שמור</button>
                    <button type="button" class="btn btn-outline-secondary modal-btn" data-bs-dismiss="modal">ביטול</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AddFlash } from '../services/FlashService';
export default {
    name: "AddNews",
    emits: ["addData"],
    data() {
        return {
            title: ''
        }
    },
    methods: {
        saveChanges() {
            if (!this.title) {
                alert('לא ניתן לשמור אוביקט ריק');
            } else {
                AddFlash(this.title).then(res => {
                    this.$emit("addData", res);
                });
            }
        },
    },
};
</script>

<style scoped>
.add-btn {
    margin-top: 10px;
    width: 100%;
}
</style>