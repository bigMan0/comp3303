<!-- COMP 3033 - Full-Stack Cloud Computing
     Final Project: Calendar Web Application
     Authors: Cameron Burgoyne (162210b) and Kylie DeViller (162298d)
     Date: April 5 2024 -->

<!--Month set up file-->

<template>
    <div class="calendar-date-indicator">{{ selectedMonth }}</div>
  </template>
  
  <script>
  export default {
    props: {
      selectedDate: {
        type: Object,
        required: true
      }
    },
  
    computed: {
      selectedMonth() { // displaying the currently selected month
        return this.selectedDate.format("MMMM YYYY");
      }
    }
  };
  </script>
  
  <style scoped>
  /* Month display */
  .calendar-date-indicator {
    font-size: 24px;
    font-weight: 600;
    color: #98827c;
  }
  </style>
  
  