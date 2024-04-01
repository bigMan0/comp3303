<!-- COMP 3033 - Full-Stack Cloud Computing
     Final Project: Calendar Web Application
     Authors: Cameron Burgoyne (162210b) and Kylie DeViller (162298d)
     Date: April 5 2024 -->

<!--Weekdays file-->

<template>
    <!--Displays the weekdays from the array-->
    <ol class="day-of-week">
      <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
    </ol>
  </template>
  
  <script>
  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  export default {
    name: "CalendarWeekdays",
  
    computed: {
      weekdays() {
        return WEEKDAYS;
      }
    }
  };
  </script>
  
  <style scoped>
  /* layout of the weeks */
  .day-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  
  .day-of-week > * {
    text-align: right;
    padding-right: 5px;
  }
  </style>
  