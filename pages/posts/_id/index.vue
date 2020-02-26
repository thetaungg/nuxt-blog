<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{loadedPost.title}}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on {{loadedPost.updatedDate | date}}</div> <!--this is how we use filter-->
        <div class="post-detail">Written by {{loadedPost.author}}</div>
      </div>
      <p class="post-content">{{loadedPost.content}}</p>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the post, send me email to
        <a href="mailto:feedback@my-domain.com">feedback@my-domain.com</a>
      </p>
    </section>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        loadedPost: {}
      }
    },
    // asyncData(context, callback) {//this function can only run on a PAGE!! //we can't use 'this' properties in this function because this function runs before the components are created//instead we can use context for all of that //after the first rendering, this methods runs on the server
    // //asyncData is deprecated
    //   // setTimeout(() => {
    //   //   callback(null, {//the first argument is error
    //   //     loadedPost: {
    //   //       id: 1,
    //   //       title: 'First Post (ID: ' + context.route.params.id + ")",
    //   //       thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
    //   //       previewText: 'This is the post with id ' + context.route.params.id,
    //   //       author: 'Thet Aung',
    //   //       updateDate: new Date(),
    //   //       content: 'Some dummy text that are definitely not preview text'
    //   //     }
    //   //   })
    //   // }, 1000)
    //   // return axios.get('https://nuxt-blog-368f7.firebaseio.com/posts/' + context.route.params.id + '.json')
    //   // .then(res => {
    //   //   return {
    //   //     loadedPost: res.data
    //   //   }
    //   // })
    //   // .catch(error => context.error(error))
    // },
    mounted() {
      axios.get('https://nuxt-blog-368f7.firebaseio.com/posts/' + this.$route.params.id + '.json')
      .then(res => this.loadedPost = res.data)
      .catch(error => console.log(error))
    }
  }
</script>

<style>
  .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
  }

  .post {
    width: 100%;
  }

  @media (min-width: 768px) {
    .post {
      width: 600px;
      margin: auto;
    }
  }

  .post-title {
    margin: 0;
  }

  .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .post-details {
      flex-direction: row;
    }
  }

  .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
  }

  .post-feedback a {
    color: red;
    text-decoration: none;
  }

  .post-feedback a:hover,
  .post-feedback a:active {
    color: salmon;
  }
</style>
