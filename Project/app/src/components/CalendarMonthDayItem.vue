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
  color: #98827c;
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

/* displaying the events */
.event-box {
  position: absolute;
  top: 25px;
  left: 15px;
  padding-top: 3px;
  width: calc(90% - 10px);
  border: 2px solid #d1ab4a;
  background-color: #edC971;
  text-align: left;
  color: #000;
  word-wrap: break-word;
}

.event-title {
  font-size: small;
  font-weight: bold;
  padding: 2px 4px;
  text-wrap: pretty;
}

.calendar-day--not-current {
  background-color: #e7f0f4;
  color: #b5c0cd;;
}

.calendar-day--today {
  padding-top: 4px;
  background-color: #cddee6;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: #5e7481;
}
</style>
