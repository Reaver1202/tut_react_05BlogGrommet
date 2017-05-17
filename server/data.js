
const posts = [
  {
    "id": 1,
    "title": "Titel 1",
    "categories": "cat 1",
    "content": "content 1"
  },
  {
    "id": 2,
    "title": "Titel 2",
    "categories": "cat 2",
    "content": "content 2"
  },
  {
    "id": 3,
    "title": "Titel 3",
    "categories": "cat 3",
    "content": "content 3"
  },
  {
    "id": 40,
    "title": "Ein toller Titel",
    "categories": "tests",
    "content": "Ein toller Titel zur Kategorie tests"
  },
  {
    "id": 50,
    "title": "Titel 5",
    "categories": "cat 5",
    "content": "content 5"
  },
  {
    "id": 6,
    "title": "Titel 6",
    "categories": "cat 6",
    "content": "content 6"
  },
  {
    "id": 70,
    "title": "Titel 7",
    "categories": "cat 7",
    "content": "content 7"
  },
  {
    "id": 8,
    "title": "Titel 8",
    "categories": "cat 8",
    "content": "content 8"
  },
  {
    "id": 9,
    "title": "Titel 9",
    "categories": "cat 9",
    "content": "content 9"
  },
  {
    "id": 100,
    "title": "Letzter Titel",
    "categories": "Letzte Kategorie",
    "content": "Letzter Content"
  }
];

export function getPosts() {
  return Promise.resolve({ posts });
}

export function getPost(id) {
  let post;
  posts.some((p) => {
    if (p.id+"" === id) {
      post = p;
      return true;
    }
    return false;
  });
  return Promise.resolve({ post });
}

/* quick and dirty */
function createNewId(){
  let newId;
  // not more than 200 Blog Posts possible
  for (let i = 1; i<=200; i++){
    let found = false;
    posts.some((p) => {
      if (p.id == i) {
        found = true;
        return true; // abbruch
      }
    });
    if (!found) {
      newId = i;
      break;
    }
  }
  return newId;
}

export function addPost (title,categories,content) {
  // TODO what happens when all 200 IDs are in use --> replace one?
  let newId = createNewId();
  console.log("New Id: " + newId)

  let newPost = new Object();
  newPost.id = newId;
  newPost.title = title;
  newPost.categories = categories;
  newPost.content = content;
  console.log(newPost);

  posts.push(newPost);

  return newPost;
}


export function removePost(id) {
  let post;
  let deleted = false;
  let position = 0;
  posts.some((p) => {
    console.log(p)
    console.log("position: " + position)
    if (p.id+"" === id) {
      post = p;
      // remove item from array and shorten the array
      posts.splice(position, 1);
      deleted = true;
      return true;
    } else {
      position++;
    }
  });

  return Promise.resolve({ deleted, post });
}

export default {  getPost, getPosts, removePost, posts };
