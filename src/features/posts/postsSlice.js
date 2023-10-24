import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";


const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", // idle ,  | loading | succeded | failed
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return  response.data;
});


export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },

      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder){
    builder // swith case statement

    //promise coukd be pending and then we set status to loading
    .addCase(fetchPosts.pending,(state,action)=>{
        state.status="loading"
    })
    //promise coukd be succeeded and appended some information  and set status loading = succeeded
    .addCase(fetchPosts.fulfilled,(state,action)=>{
        state.status="suceeded"
        //adding date and reactions
        let min = 1; 
        const loadedPosts = action.payload.map(post =>{
            post.date =sub(new Date(),{minutes:min++}).toISOString();
            post.reactions={
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0

            }
            return post;

        });
          // add any fetched posts to the array 
        state.posts = state.posts.concat(loadedPosts)
    })
    .addCase(fetchPosts.rejected,(state,action)=>{
        state.status ="failed"
        state.error = action.error.message
    })
  }
});

export const selectAllPost = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;
export const getPostsStatus  =(state) => state.posts.status;
export const getPostError =(state)=>state.posts.error;
export default postsSlice.reducer;
