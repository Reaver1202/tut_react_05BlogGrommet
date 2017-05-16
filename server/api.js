import express from 'express';
import { addPost, getPosts, getPost } from './data';

const router = express.Router();

router.get('/posts', (req, res) => {
  console.log("/api/posts call")
  getPosts().then(data => {
    // >>> working with direct browser call, but not with App:
    console.log("Response:")
    console.log(data.posts)
    res.json(data.posts)

    // >>> trial&error:
    // res.json({posts: posts.posts})
    // console.log(res)
    // res(posts)
    // return posts
  });
});


module.exports = router;
