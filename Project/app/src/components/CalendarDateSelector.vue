<!-- COMP 3033 - Full-Stack Cloud Computing
     Final Project: Calendar Web Application
     Authors: Cameron Burgoyne (162210b) and Kylie DeViller (162298d)
     Date: April 5 2024 -->

<!--Selecting date file -->

<template>
    <div class="calendar-date-selector">
      <!--Navigating to previous or next month, and today-->
      <span @click="selectPrevious">&lt;</span>
      <span @click="selectCurrent"><strong>Today</strong></span>
      <span @click="selectNext">&gt;</span>
    </div>
  </template>
  
  <script>
  import dayjs from "dayjs"; // day.js library import
  
  export default {
    name: "CalendarModeSelector",
  
    props: {
      currentDate: {
        type: String,
        required: true
      },
  
      selectedDate: {
        type: Object,
        required: true
      }
    },
  
    methods: {
      // getting the previous month
      selectPrevious() {
        let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
        this.$emit("dateSelected", newSelectedDate);
      },
  
      // getting the current month
      selectCurrent() {
        let newSelectedDate = dayjs(this.currentDate);
        this.$emit("dateSelected", newSelectedDate);
      },
  
      // getting the next month
      selectNext() {
        let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
        this.$emit("dateSelected", newSelectedDate);
      }
    }
  };
  </script>
  
  <style scoped>
  /* month selector buttons and text */
  .calendar-date-selector {
    display: flex;
    justify-content: space-between;
    width: 80px;
    color: #98827c;
  }
  
  .calendar-date-selector > * {
    cursor: pointer;
    user-select: none;
  }
  </style>
  