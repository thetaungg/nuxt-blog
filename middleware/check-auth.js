export default function (context) {
  console.log('[Middleware] check-auth');
  // if(process.client) { //because localStorage isn't accessible from the server
  //   context.store.dispatch('initAuth'); //we want to run this whenever a page loads
  // }
  context.store.dispatch('initAuth', context.req)
}
