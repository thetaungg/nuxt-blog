<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts"/> <!--we can dynamically choose how many posts we want to display-->
  </div>
</template>

<script>
  export default {
    //asyncData(context, callback) { //this function can only run on a PAGE!! //we can't use 'this' properties in this function because this function runs before the components are created//instead we can use context for all of that //after the first rendering, this methods runs on the server
      //fetch(context) { //we can use fetch instead of asyncData

    //   if (context.store.state.loadedPosts.length > 0) return; //we don't want to fetch again if we already got posts
    //
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve({ //this object is named data inside context object
    //         loadedPosts: [
    //           {
    //             id: 1,
    //             thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
    //             title: 'Hello there!',
    //             previewText: 'This is the post with id 1',
    //           },
    //           {
    //             id: 2,
    //             thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
    //             title: 'Hi!',
    //             previewText: 'This is the post with id 2',
    //           },
    //           {
    //             id: 3,
    //             thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
    //             title: 'Heyah!',
    //             previewText: 'This is the post with id 3',
    //           }
    //         ]
    //       });
    //     }, 1000);
    //   }).then(data => {
    //     //return data //setting the data in our instate with the object we got back from the async function

    //     context.store.commit('setPosts', data.loadedPosts); //changing the state of the store
    //   }).catch(e => context.error(new Error()))
    // },

    middleware: 'log', //middleware can only use in pages //log is the name of middleware file
    computed: { //because the state might always be changing it's a good idea to use computed properties
      loadedPosts() {
        return this.$store.getters.loadedPosts //accessing the store here to use loadedPosts in our app
      }
    },
    // created() { //life cycle hooks //just like React componentDidMount
    //   this.$store.dispatch('setPosts', this.loadedPosts)
    // }
  }
</script>

<style scoped>
  .posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
