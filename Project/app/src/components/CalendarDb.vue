<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post._id">
        <strong>{{ post.title }}</strong> - {{ formatDate(post.date) }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    date: String 
  },
  data() {
    return {
      posts: [],
      errors: []
    };
  },

  async created() {
    try {
      const response = await axios.get('http://localhost:3001/calendar', {
        params: {
          date: this.date 
        }
      });
      this.posts = response.data;
    } catch (e) {
      this.errors.push(e);
    }
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    },

    getTitleByDate(date) {
      const post = this.posts.find(post => post.date.substring(0, 10) === date);
      return post ? post.title : 'No title found';
    }
  }
};
</script>
