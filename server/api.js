import express from 'express';
import { addPost, getPosts, getPost, removePost } from './data';

const router = express.Router();

router.get('/posts', (req, res) => {
  console.log("/api/posts call")
  getPosts().then( (data) => {
    console.log("Response:")
    console.log(data.posts)
    res.json(data.posts)
  });
});

router.get('/posts/:id', (req, res) => {
  console.log("/api/posts:id call")
  getPost(req.params.id).then( (data) => {
    if (!data.post) {
      console.log("Nothing found for id: " + req.params.id)
      res.status(404).end();
    } else {
      console.log("Response:")
      console.log(data.post)
      res.json(data.post)
    }
  });
});


router.post('/posts', (req, res) => {
  const { title, categories, content } = req.body;
  if (!title || !categories || !content) {
    res.statusMessage = 'title, categories or content is missing';
    res.status(401).end();
  } else {
    let newPost = addPost(title,categories,content);
    res.json(newPost);
  }
});


router.delete('/posts/:id', (req, res) => {
  removePost(req.params.id).then((data) => {
    if (data.deleted) {
      console.log("Response:")
      console.log(data.post)
      res.json(data.post)
    } else {
      res.status(404).end();
    }
  });
});

module.exports = router;
