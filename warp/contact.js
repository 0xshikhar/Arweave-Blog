// export function handle(state, action) {
//     // create 
//     // update
//     // delete

//     if (action.input.function === 'initialize') {
//         state.author = action.caller
//     }

//     // we are only doing state update when caller is same as author
//     if (action.input.function === 'createPost' && action.caller === state.author) {
//         const posts = state.posts
//         posts[action.input.post.id] = action.input.post
//         state.posts = posts
//     }
//     // posts = {"1": {// post data} }

//     if (action.input.function === 'updatePost' && action.caller === state.author) {
//         const posts = state.posts // get ref to the post 
//         const postToUpdate = action.input.post // ref to the post that are coming in
//         posts[postToUpdate.id] = postToUpdate // updating post id that are coming in
//         state.posts = posts // resetting the state
//     }

//     if (action.input.function === 'delete Post' && action.caller === state.author) {
//         const posts = state.posts
//         delete posts[action.input.post.id]
//         state.posts = posts
//     }


//     return {
//         state
//     }
// }