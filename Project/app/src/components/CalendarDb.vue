<template>
  <div>
    <div v-if="posts && posts.length">
      <div v-for="post of posts" :key="post._id">
        <strong>{{ post.title }} </strong>  
        <!-- {{ post._id }} -->
      </div>
    </div>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors" :key="error.id">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      errors: []
    }
  },

  // Fetches posts when the component is created.
  async created() {
    try {
      const response = await axios.get('http://localhost:3001/calendar')
      this.posts = response.data
    } catch (e) {
      this.errors.push(e)
    }
  }
}
</script>