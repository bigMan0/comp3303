<template>
    <div v-if="isVisible" class="modal">
        <!--contnet of modal-->
        <div class="modal-content">
            <p>hi</p>
            <span class="close" @click="hideModal">&times;</span>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isVisible: false
            };
        },

        methods: {
            showModal() {
                this.isVisible = true;
            },

            hideModal() {
                this.isVisible = false;
            }
        }
    };
</script>

<style scoped>
.model {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* semi transparent */
}

.model-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
}

.close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    cursor: pointer;
}
</style>