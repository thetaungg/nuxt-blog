<template>
  <div class="admin-post-page">
    <div class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </div>
  </div>
</template>

<script>
  import AdminPostForm from "../../../components/Admin/AdminPostForm";

  export default {
    layout: 'admin',
    middleware: ['check-auth','auth'], //middleware run from left to right ,so, the order we put in is important
    components: {
      AdminPostForm
    },
    asyncData(context) {//axios coming from modules directly from nuxt.config file , so we don't need to import it
      return context.app.$axios.$get('https://nuxt-blog-368f7.firebaseio.com/posts/' + context.params.postId + '.json')
        .then(data => { //and axios with axios modules we get access to data directly ,not res.data
          return {
            loadedPost: {...data, id: context.params.postId}
          }
        })
        .catch(error => console.log(error))
    },
    methods: {
      onSubmitted(editedPost) { //from adminPostForm
        this.$store.dispatch('editPost', editedPost)
        .then(() => this.$router.push('/admin'))
      },
    },
  }
</script>

<style scoped>
  .update-form {
    width: 90%;
    margin: 20px auto;
  }

  @media (min-width: 768px) {
    .update-form {
      width: 500px;
    }
  }
</style>
