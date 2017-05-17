// imitates the API from http://reduxblog.herokuapp.com/

import express from 'express';
import { addPost, getPosts, getPost, removePost } from './data';

const router = express.Router();

/* Fetches all Blog Posts
Example Response
[
  { id: 1,
    title: 'Hi!',
    categories: 'Computer, Friends',
    content: 'Post about Friends'
  },
  {
    id: 2,
    title: 'New Post',
    categories: 'Candy',
    content: 'Post about Candy'
  }
]
*/
router.get('/posts', (req, res) => {
  console.log("/api/posts call")
  getPosts().then( (data) => {
    console.log("Response:")
    console.log(data.posts)
    res.json(data.posts)
  });
});

/* Fetches a single blog post with the given ID. Includes the blog's content.
Example Resposne:
{
  id: 1,
  title: 'Hi!',
  categories: 'Computer, Friends',
  content: 'Blog post content'
}
*/
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

/* Creates a new blog post entry. Returns the created blog post with the ID
Example Resposne:
{
  id: 1,
  title: 'Hi!',
  categories: 'Computer, Friends',
  content: 'Blog post content'
}
*/
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

/* Deletes a single blog post with the given ID. Returns the post
Example Resposne:
{
  id: 1,
  title: 'Hi!',
  categories: 'Computer, Friends',
  content: 'Blog post content'
}
*/
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
