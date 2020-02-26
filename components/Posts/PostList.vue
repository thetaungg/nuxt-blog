<template>
  <section class="featured-posts" >
    <PostPreview  v-for="post in posts"
                  :is-admin="isAdmin"
                  :key="post.id"
                  :id="post.id"
                  :thumbnail="post.thumbnail"
                  :title="post.title"
                  :previewText="post.previewText"/>
<!--    <PostPreview-->
<!--      id="1" thumbnail="https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg"-->
<!--      title="Hello there" previewText="This is my post"/>-->
<!--    <PostPreview-->
<!--      id="2" thumbnail="https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg"-->
<!--      title="Hi" previewText="This is second post"/>-->
<!--    <PostPreview-->
<!--      id="3" thumbnail="https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg"-->
<!--      title="Heyah" previewText="This is third post"/>-->
  </section>
</template>

<script>
  import PostPreview from '~/components/Posts/PostPreview';

  export default {
    name: 'PostList',
    components: {
      PostPreview
    },
    props: {
      posts: {
        type: Array,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .featured-posts {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    flex-basis: 100%;
  }
</style>
