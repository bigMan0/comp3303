<template>
  <div id="app">
    <button id="add" type="button" class="btn btn-info mx-3" @click="toggleForm">Add event</button>
    <button id="edit" type="button" class="btn btn-info mx-3" @click="editE">Edit event</button>
    <button id="delete" type="button" class="btn btn-info mx-3" @click="toggleDeleteForm">Delete event</button>
    <button type="button" class="btn btn-info mx-3" @click="showModal = !showModal">Open Modal</button>

    <AppModal v-if="showModal" @close="showModal = false">
      <!-- Modal content -->
      <template v-slot:default>
        <button @click="showModal = false">Close Modal</button>
      </template>
    </AppModal>

    <div v-if="showForm">
      <h2>Add Event</h2>
      <form @submit.prevent="addEvent">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="event.title" required>
        <label for="date">Date:</label>
        <input type="date" id="date" v-model="event.date" required>
        <label for="type">Type:</label>
        <select id="type" v-model="event.type" required>
          <option value="">Select type</option>
          <option value="event">Event</option>
          <option value="task">Task</option>
          <option value="reminder">Reminder</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>

    <!-- Delete event form -->
    <div v-if="showDeleteForm">
      <h2>Delete Event</h2>
      <ul>
        <li v-for="event in events" :key="event._id">
          {{ event.title }} - {{ formatDate(event.date) }} - {{ event.type }}
          <button @click="deleteEvent(event._id)">Delete</button>
        </li>
      </ul>
    </div>

    <CalendarMonth/>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
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
    toggleForm() {
      this.showForm = !this.showForm;
    },
    toggleDeleteForm() {
      this.showDeleteForm = !this.showDeleteForm;
      if (this.showDeleteForm) {
        this.fetchEvents();
      }
    },
    async addEvent() {
      try {
        // Send a POST request to the backend endpoint '/calendar'
        const response = await axios.post('http://localhost:3001/calendar', this.event);
        
        // Log the response data
        console.log('Event added successfully:', response.data);

        // Reset the form after adding the event
        this.event = { title: '', date: '', type: '' };

        // Hide the form
        this.showForm = false;

        // Reload the page
        window.location.reload();
      } catch (error) {
        console.error('Error adding event:', error.message);
      }
    },
    async fetchEvents() {
      try {
        // Fetch all events from the backend
        const response = await axios.get('http://localhost:3001/calendar');
        this.events = response.data;
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    },

    async deleteEvent(eventId) {
      try {
        // Send a DELETE request to the backend endpoint '/calendar/:id'
        await axios.delete(`http://localhost:3001/calendar/${eventId}`);
        
        // Fetch updated events after deletion
        this.fetchEvents();

        //Reload page 
        window.location.reload();
      } catch (error) {
        console.error('Error deleting event:', error.message);
      }
    },

    editE() { // Edit event function
      alert('Edit Event!');
    },
    formatDate(date) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
  data() {
    return {
      showModal: false,
      showForm: false,
      showDeleteForm: false,
      events: [],
      event: { title: '', date: '', type: '' } // Object to hold the form data
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
