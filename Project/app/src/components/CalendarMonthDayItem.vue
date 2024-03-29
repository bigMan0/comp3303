<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday
    }"
  >
    <span>{{ label }}</span>
    <div v-if="hasEventForDay" class="event-box">
      <div class="event-title">{{ eventTitle }}</div>
    </div>
  </li>
</template>

<script>
import dayjs from "dayjs";
import axios from 'axios';

export default {
  name: "CalendarMonthDayItem",

  data() {
    return {
      posts: [],
      errors: [],
      hasEventForDay: false,
      eventTitle: ''
    };
  },

  async created() {
    try {
      const response = await axios.get('http://localhost:3001/calendar', {
        params: {
          date: this.day.date // Use the date associated with the calendar item
        }
      });
      this.posts = response.data;
      this.hasEventForDay = this.posts.some(post => post.date.substring(0, 10) === this.day.date);
      if (this.hasEventForDay) {
        this.eventTitle = this.getTitleByDate(this.day.date);
      }
    } catch (e) {
      this.errors.push(e);
    }
  },

  methods: {
    getTitleByDate(date) {
      const post = this.posts.find(post => post.date.substring(0, 10) === date);
      return post ? post.title : 'No title found';
    }
  },

  props: {
    day: {
      type: Object,
      required: true
    },

    isCurrentMonth: {
      type: Boolean,
      default: false
    },

    isToday: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    label() {
      return dayjs(this.day.date).format("D");
    }
  }
};
</script>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
}

.calendar-day > span {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  width: var(--day-label-size);
  height: var(--day-label-size);
}
.event-box {
  position: absolute;
  top: 25px;
  left: 15px;
  padding: 10px;
  width: calc(80% - 10px);
  height: calc(80% - 10px);
  border: 2px solid #000;
}

.event-title {
  font-weight: bold;
  padding: 5px;
}
.calendar-day--not-current {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
}
</style>
