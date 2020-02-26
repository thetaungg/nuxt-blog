<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import AdminPostForm from "~/components/Admin/AdminPostForm";

  export default {
    layout: 'admin',
    middleware: ['check-auth','auth'], //middleware run from left to right ,so, the order we put in is important
    components: {
      AdminPostForm
    },
    methods: {
      onSubmitted(postData) { //saving data in firestore //we use realtime database// we need to add .json here because of this//posts is the collection name we want to store this data
        this.$store.dispatch('addPost', postData) //the first argument is the action name
        .then(() => this.$router.push('/admin'))
      }
    }
  }
</script>

<style scoped>
  .new-post-form {
    width: 90%;
    margin: 20px auto;
  }

  @media (min-width: 768px) {
    .new-post-form {
      width: 500px;
    }
  }
</style>
