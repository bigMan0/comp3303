<template>
  <div id="app">
    <button id="add" type="button" class="btn btn-info mx-3" @click="addE">Add event</button>
    <button id="edit" type="button" class="btn btn-info mx-3" @click="editE">Edit event</button>
    <button id="delete" type="button" class="btn btn-info mx-3" @click="delE">Delete event</button>
    <button type="button" class="btn btn-info mx-3" @click="showModal = !showModal">Open Modal</button>

    <AppModal v-if="showModal" @close="showModal = false">
      <!-- Modal content -->
      <template v-slot:default>
        <button @click="showModal = false">Close Modal</button>
      </template>
    </AppModal>

    <CalendarMonth/>
    <router-view></router-view>
  </div>
</template>

<script>
import CalendarMonth from "./components/CalendarMonth.vue";
import AppModal from "./components/AppModal.vue"; 

export default {
  name: "App",
  components: {
    CalendarMonth,
    AppModal,
  },
  // Button functionality
  methods: {
    addE() { // Add event function
      alert('Add Event!');
    },
    editE() { // Edit event function
      alert('Edit Event!');
    },
    delE() { // Delete event function
      alert('Delete Event!');
    }
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  font-family: sans-serif;
  font-weight: 100;
  --grey-100: #e4e9f0;
  --grey-200: #cfd7e3;
  --grey-300: #b5c0cd;
  --grey-800: #3e4e63;
  --grid-gap: 1px;
  --day-label-size: 20px;
}

ol,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.calendar-month-header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
}
</style>
