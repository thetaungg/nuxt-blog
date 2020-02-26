<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <PostList :posts="loadedPosts"/>
    <AdminPostForm />
  </div>
</template>

<script>
import AdminPostForm from '../components/Admin/AdminPostForm.vue';

  export default {
    // asyncData(context, callback) { //this function can only run on a PAGE!! //we can't use 'this' properties in this function because this function runs before the components are created//instead we can use context for all of that //after the first rendering, this methods runs on the server
    //   //console.log(context)
    //   setTimeout(() => {
    //     callback(null, { //the first argument is error
    //       loadedPosts: [
    //         {
    //           id: 1,
    //           thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
    //           title: 'Hello there!',
    //           previewText: 'This is the post with id 1',
    //         },
    //         {
    //           id: 2,
    //           thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
    //           title: 'Hi!',
    //           previewText: 'This is the post with id 2',
    //         },
    //         {
    //           id: 3,
    //           thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
    //           title: 'Heyah!',
    //           previewText: 'This is the post with id 3',
    //         }
    //       ]
    //     })
    //   }, 1500)
    // }
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts
      }
    }
  }
</script>

<style scoped>
  .intro {
    height: 300px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-position: center;
    background-size: cover;
    background-image: url("~assets/img/main-page-background.jpg"); /*using static assets */
  }

  .intro h1 {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 90%;
    font-size: 1.5rem;
    color: black;
    background-color: rgb(211, 211, 211);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px black;
    box-sizing: border-box;
    border: 1px solid black;
  }

  @media (min-width: 768px) {
    .intro h1 {
      font-size: 2rem;
    }
  }
</style>
