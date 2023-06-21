<template>
    <div class="modal fade" data-bs-backdrop="false" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteModalLabel">מחיקה</h1>
                    <button type="button" class="btn-close x-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>האם אתה בטוח שברצונך למחוק?</h5>
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
import { DeleteFlash } from '../services/FlashService';
export default {
    name: "DeleteNews",
    props: {
        itemId: {
            type: Number,
            required: true,
        },
    },
    emits: ["deleteData"],
    methods: {
        saveChanges() {
            DeleteFlash(this.itemId).then(res => {
                this.hide();
                this.$emit("deleteData", res);
            })
        },
        show() {
            const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
            modal.show();
        },
        hide() {
            const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
            modal.hide();
        },
    },
    mounted() {
        this.show();
    }
};
</script>

<style scoped>
.delete-btn {
    width: 49%;
}
</style>