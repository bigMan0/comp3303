<!-- COMP 3033 - Full-Stack Cloud Computing
     Final Project: Calendar Web Application
     Authors: Cameron Burgoyne (162210b) and Kylie DeViller (162298d)
     Date: April 5 2024 -->

<!--Formatting the month file-->
     
<template>
    <div class="calendar-month">
      <div class="calendar-month-header">
        <CalendarDateIndicator
          :selected-date="selectedDate"
          class="calendar-month-header-selected-month"
        />
  
        <CalendarDateSelector
          :current-date="today"
          :selected-date="selectedDate"
          @dateSelected="selectDate"
        />
      </div>
  
      <CalendarWeekdays/>
  
      <ol class="days-grid">
        <CalendarMonthDayItem
          v-for="day in days"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
        />
      </ol>
    </div>
  </template>
  
  <script>
  // importing the day.js library and its functionalities
  import dayjs from "dayjs";
  import weekday from "dayjs/plugin/weekday";
  import weekOfYear from "dayjs/plugin/weekOfYear";

  // importing the other files needed
  import CalendarMonthDayItem from "./CalendarMonthDayItem";
  import CalendarDateIndicator from "./CalendarDateIndicator";
  import CalendarDateSelector from "./CalendarDateSelector";
  import CalendarWeekdays from "./CalendarWeekdays";
  

  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);
  
  export default {
    name: "CalendarMonth",
  
    // adding the imports
    components: {
      CalendarMonthDayItem,
      CalendarDateIndicator,
      CalendarDateSelector,
      CalendarWeekdays
    },
  
    data() {
      return {
        selectedDate: dayjs()
      };
    },
  
    computed: {
      days() {
        return [
          ...this.previousMonthDays,
          ...this.currentMonthDays,
          ...this.nextMonthDays
        ];
      },
  
      // returning the current date
      today() {
        return dayjs().format("YYYY-MM-DD");
      },
  
      // setting months to return type
      month() {
        return Number(this.selectedDate.format("M"));
      },
  
      // setting year to return type
      year() {
        return Number(this.selectedDate.format("YYYY"));
      },
  
      // returning the number of days in the selected month
      numberOfDaysInMonth() {
        return dayjs(this.selectedDate).daysInMonth();
      },
  
      currentMonthDays() {
        return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
          return {
            date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
              "YYYY-MM-DD"
            ),
            isCurrentMonth: true
          };
        });
      },
  
      previousMonthDays() {
        const firstDayOfTheMonthWeekday = this.getWeekday(
          this.currentMonthDays[0].date
        );
        const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
          1,
          "month"
        );
  
        // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
        const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
          ? firstDayOfTheMonthWeekday - 1
          : 6;
  
        const previousMonthLastMondayDayOfMonth = dayjs(
          this.currentMonthDays[0].date
        )
          .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
          .date();
  
        return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
          (day, index) => {
            return {
              date: dayjs(
                `${previousMonth.year()}-${previousMonth.month() +
                  1}-${previousMonthLastMondayDayOfMonth + index}`
              ).format("YYYY-MM-DD"),
              isCurrentMonth: false
            };
          }
        );
      },
  
      nextMonthDays() {
        const lastDayOfTheMonthWeekday = this.getWeekday(
          `${this.year}-${this.month}-${this.currentMonthDays.length}`
        );
  
        const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");
  
        const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
          ? 7 - lastDayOfTheMonthWeekday
          : lastDayOfTheMonthWeekday;
  
        return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
          return {
            date: dayjs(
              `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
            ).format("YYYY-MM-DD"),
            isCurrentMonth: false
          };
        });
      }
    },
  
    methods: {
      getWeekday(date) {
        return dayjs(date).weekday();
      },
  
      selectDate(newSelectedDate) {
        this.selectedDate = newSelectedDate;
      }
    }
  };
  </script>
  
  <style scoped>
  /* styling for the actual layout of the calendar */
  .calendar-month {
    position: relative;
    background-color: #5e7481;
  }
  
  .day-of-week {
    color: white;
    font-size: 18px;
    background-color: #5e7481;
    padding-bottom: 5px;
    padding-top: 10px;
  }
  
  .day-of-week,
  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  
  .day-of-week > * {
    text-align: right;
    padding-right: 5px;
  }
  
  .days-grid {
    height: 100%;
    position: relative;
    grid-column-gap: var(--grid-gap);
    grid-row-gap: var(--grid-gap);
  }
  </style>
  