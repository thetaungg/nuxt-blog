// import Vuex from 'vuex'; //this is classic way of creating store //this is deprecated
//
// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       loadedPosts: []
//     },
//     mutations: { //this is where we change the state // we don't change it directly from actions // we use mutations to avoid errors
//       setPosts (state, posts) {
//         state.loadedPosts = posts;
//       }
//     },
//     actions: {
//       nuxtServerInit(vuexContext, context) { //dispatched by next as the server starts
//
//         return new Promise((resolve, reject) => { //we need to return promise if we're executing async function
//           setTimeout(() => {
//             vuexContext.commit('setPosts', [
//               {
//                 id: 1,
//                 thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
//                 title: 'Hello there!',
//                 previewText: 'This is the post with id 1',
//               },
//               {
//                 id: 2,
//                 thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
//                 title: 'Hi!',
//                 previewText: 'This is the post with id 2',
//               },
//               {
//                 id: 3,
//                 thumbnailUrl: "https://www.tececorp.com/wp-content/uploads/2019/05/050318_LRR_MEN_WomenTech-1-1.jpg",
//                 title: 'Heyah!',
//                 previewText: 'This is the post with id 3',
//               }
//             ]);
//             resolve();
//           }, 1000)
//         });
//       },
//       setPosts(vuexContext, posts) {
//         vuexContext.commit('setPosts', posts) //the first argument is type and the second is payload just like Redux
//       }
//     },
//     getters: { //like selectors in Redux
//       loadedPosts(state) {
//         return state.loadedPosts
//       }
//     }
//   })
// };
//
// export default createStore;

import axios from 'axios';
import Cookie from 'js-cookie'; //we need to use cookie inside the server since we're not able access localStorage in the server //so we store the data inside the cookie and send it through the frontend

//this is modules mode of create store //need to be careful of naming conventions //we can also use separate file to each functions //state.js for state
export const state = () => ({
  loadedPosts: [],
  token: null
});

export const mutations = {
  setPosts (state, posts) {
    state.loadedPosts = posts;
  },
  addPost(state, post) {
    state.loadedPosts.push(post)
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id); // findIndex is like filter but it is more suited for finding a single item //eg. filter tries to find all the items that matches with the condition but findIndex only finds the first one which is perfect for filtering with id
    state.loadedPosts[postIndex] = editedPost;
  },
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  },
  isAuthenticated(state) {
    return state.token != null
  }
};

export const actions = {
  // nuxtServerInit(vuexContext, context) { //dispatched by next as the server starts //this only run one time as the server starts
  //
  //   return new Promise((resolve, reject) => { //we need to return promise if we're executing async function
  //     setTimeout(() => {
  //       vuexContext.commit('setPosts', [ //the first argument is mutations name
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
  //       ]);
  //       resolve();
  //     }, 1000)
  //   });

  nuxtServerInit(vuexContext, context) {
    return axios.get('https://nuxt-blog-368f7.firebaseio.com/posts.json') //fetching a collection from firebase
      .then(res => { //firebase returns an object with data as one of the properties
        const postArray = [];
        //console.log(res)
        // for(const key in res.data) { //we want the object under id property and we want to add that property as part of that post object
        //   postArray.push({
        //     ...res.data[key], id: key
        //   })
        // }
        Object.keys(res.data).map(postID => postArray.push({...res.data[postID], id: postID}));
        vuexContext.commit('setPosts', postArray)
      })
      .catch(error => context.error(error))
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts) //the first argument is type of mutation(which is the mutation name) and the second is payload just like Redux
    // vuexContext.commit({ //we can also do it like this
    //   type: 'setPosts',
    //   posts: posts
    // })
  },
  addPost(vuexContext, post) {
    const createdPost = {
      ...post,
      updatedDate: new Date()
    };
    return axios.post('https://nuxt-blog-368f7.firebaseio.com/posts.json?auth=' + vuexContext.state.token,
      createdPost)
      .then(res => {
        vuexContext.commit('addPost', {
          ...createdPost,
          id: res.data.name //data.name is the id
        });
      })
      .catch(e => console.log(e))
  },

  editPost(vuexContext, editedPost) {
    return axios.put(process.env.baseUrl + '/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token,  //authenticating with login token
      editedPost)
      .then(res => {
        vuexContext.commit('editPost', editedPost)
      })
      .catch(e => console.log(e))
  },

  authenticateUser (vuexContext, authData) {
    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.firebaseAPIKey; //signIn url

    if(!authData.isLogin) {
      authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.firebaseAPIKey; //signup url
    }

    return this.$axios.$post(authUrl, //we always return async code so that we can access this with .then when running is action
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }).then(res => {
      vuexContext.commit('setToken', res.idToken);//this token is only valid for 1 hour

      const expiration = new Date().getTime() + res.expiresIn * 1000;

      localStorage.setItem('token', res.idToken); //storing to token in local storage so that we can access it even after refresh
      localStorage.setItem('tokenExpiration', expiration); //we want a date //.getTIme convert the date into millisecond

      //these cookies will be created on the client side and sent back inside the header every time the browser send a GET req
      Cookie.set('jwt', res.idToken); //cookies are attach to every get requests ,so, it's easy to access them in the server side
      Cookie.set('expirationDate', expiration); //checkout the cookies section under application tab of dev tools to see these cookies

      vuexContext.dispatch('setLogoutTimer', res.expiresIn * 1000);//***dispatch runs an action and commit runs a mutation ***
      })
      .catch(error => console.log(error))
  },

  setLogoutTimer (vuexContext, duration) {
    setTimeout(() => {
      vuexContext.commit('clearToken')
    }, duration)
  },

  initAuth(vuexContext, req) {
    let token;
    let expirationDate;
    //with cookies ,even though the user refreshes, the app can still access to the token because it is stored as cookie on the server
    if(req) {
      if (!req.headers.cookie) { //if the cookie is created, every time the browser send a GET req to the server, it adds cookie inside the header // so we can access the data that stored in the browser in our server
        return;
      }
      const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt=')); //cookies store data like this// split splits a string into two part and add them both inside an array, but we want the only part that starts with our key// trim is for deleting white space between the letters inside the string

      if(!jwtCookie) {
        return;
      }
      token = jwtCookie.split('=')[1]; //again we don't need the key, we just want our data , so, we split again
      expirationDate = req.headers.cookie.split(';')
        .find(c => c.trim().startsWith('expirationDate=')).split('=')[1];

    } else {//if there is no req then we are on the client, so, we can access localStorage
      token = localStorage.getItem('token');
      expirationDate = localStorage.getItem('tokenExpiration');

      if(new Date().getTime() > +expirationDate || !token) { //because expirationDate is a string and we want to convert it to number
        return;
      }
    }

    vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime()); //***dispatch runs an action and commit runs a mutation ***
    vuexContext.commit('setToken', token); //setting the token we got from localStorage to the state
  }

};

