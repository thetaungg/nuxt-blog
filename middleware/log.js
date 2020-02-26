export default function (context) { //middleware functions receives a context object // when running async code you have to return the async code running inside of this function//eg. return fetch()
  console.log('[Middleware] the log middleware is running')
}//this function can run both on the server and the browser //this function have to be exported as default //middleware can only used on pages or layout as middleware property of export default object
