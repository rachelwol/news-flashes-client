<template>
    <div class="modal fade" data-bs-backdrop="false" id="editModal" tabindex="-1" aria-labelledby="editModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editModalLabel">עריכה</h1>
                    <button  @click="closeModal()" type="button" class="btn-close x-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="recipient-name" class="col-form-label title-label">כותרת:</label>
                    <input type="text" class="form-control card-text" id="recipient-name" placeholder="הכנס כותרת"
                        :value="editedTitle" @input="editedTitle = $event.target.value">
                </div>
                <div class="modal-footer">
                    <button @click="saveChanges()" type="button" class="btn btn-outline-primary modal-btn"
                        data-bs-dismiss="modal">שמור</button>
                    <button @click="closeModal()" type="button" class="btn btn-outline-secondary modal-btn"
                        data-bs-dismiss="modal">ביטול</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EditFlash } from '../services/FlashService';
export default {
    name: "EditNews",
    emits: ["editData", "cancelEdit"],
    props: {
        item: {
            type: Object
        }
    },
    data() {
        return {
            lastTitle: this.item.Title,
            editedTitle: this.item.Title
        }
    },
    methods: {
        saveChanges() {
            if (!this.editedTitle) {
                alert('לא ניתן לשמור אוביקט ריק');
            } else {
                if (this.editedTitle != this.lastTitle) {
                    const dateValue = this.item.Date;
                    const date = new Date(parseInt(dateValue.substr(6)));
                    let editItem = { Id: this.item.Id, Title: this.editedTitle, Date: date };
                    EditFlash(editItem).then(res => {
                        this.$emit("editData", res);
                    });
                }
            }
        },
        closeModal() {
            this.$emit("cancelEdit", false);
        },
        formattedTime(date) {
            return moment(date).format('HH:mm');
        },
        show() {
            const modal = new bootstrap.Modal(document.getElementById('editModal'));
            modal.show();
        },
    },
    mounted() {
        this.show();
    }

};
</script>

<style scoped>
.edit-btn {
    margin-left: 4px;
    width: 49%;
}

.title-label {
    float: right;
}
</style>