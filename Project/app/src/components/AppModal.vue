<template>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
        >
          <header class="modal-header" id="modalTitle">
            <slot name="header">
              List of All Events
            </slot>
            
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">
              x
            
            </button>
          </header>
  
          <section class="modal-body" id="modalDescription">
            <CalendarDb :posts="posts" />
          </section>
  
          <footer class="modal-footer">
            <slot name="footer">
            </slot>
          </footer>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import CalendarDb from "./CalendarDb.vue"; // Import the CalendarDb component
  
  export default {
    name: 'AppModal',
    components: {
      CalendarDb // Register the CalendarDb component
    },
    props: {
      posts: Array
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
  </script>
  <style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Ensure the modal is above other content */
  }
  
  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    z-index: 10000; /* Ensure the modal content is above the backdrop */
  }
  
  .modal-body {
    padding: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  ul li {
    margin-bottom: 10px;
  }
  </style>
  