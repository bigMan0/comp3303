<template>
  <div>
    <strong>{{ getTitleByDate('2024-03-14') }}</strong>
    <!-- Replace '2024-03-28' with the date you want to check -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
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
        date: this.$attrs.date // Get date passed as prop from parent component
      }
    });
    this.posts = response.data;
  } catch (e) {
    this.errors.push(e);
  }
},

  methods: {
    getTitleByDate(date) {
      const post = this.posts.find(post => post.date.substring(0, 10) === date);
      return post ? post.title : 'No title found';
    }
  }
};
</script>
