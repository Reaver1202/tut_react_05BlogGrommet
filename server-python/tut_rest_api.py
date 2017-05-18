#!/usr/bin/python

# >>> imitates the API from http://reduxblog.herokuapp.com/
# TODO Start the server with this command:
# PYTHONPATH=/root/slacontrol/slagui-tut/src/server-python-apache/ twistd -n web --port 4000 --wsgi tut_rest_api.app

import six, os, shutil, sys, re, optparse, ConfigParser, pwd, grp
from flask import Flask, json, jsonify, abort, request, make_response, url_for
from flask_httpauth import HTTPBasicAuth

from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper

app = Flask(__name__, static_url_path="")
auth = HTTPBasicAuth()

# >>> enable CORS on flask
# to be able to answer to client from another domain
# e.g. client localhost:3000 requests server on localhost:4000
# see http://flask.pocoo.org/snippets/56/
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


# base data when server starts
postsList=[
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
]


# >>> Fetches all Blog Posts
#Example Response
#[
#  { id: 1,
#    title: 'Hi!',
#    categories: 'Computer, Friends',
#    content: 'Post about Friends'
#  },
#  {
#    id: 2,
#    title: 'New Post',
#    categories: 'Candy',
#    content: 'Post about Candy'
#  }
#]
@app.route('/api/posts', methods=['GET' ])
@crossdomain(origin='*')
def getPosts():
    print("Response GET all:")
    print(postsList)
    return jsonify(postsList)


# >>> Fetches a single blog post with the given ID. Includes the blog's content.
# Example Resposne:
# {
#   id: 1,
#   title: 'Hi!',
#   categories: 'Computer, Friends',
#   content: 'Blog post content'
# }
@app.route('/api/posts/<id>', methods=['GET'])
@crossdomain(origin='*')
def getPost(id):
    for p in postsList:
        if (str(p['id']) == id):
            print("Response GET id %s:" % id)
            print(p)
            return jsonify(p)
    print("Error: could not find report %s" % id)
    abort(404)


# >>> helper to get new ID in postsList
#  - quick and dirty
#  - returns an unique id within the current posts to create a new post
def createNewId():
    # not more than 200 Blog Posts possible
    for i in range(1,200):
        found = False
        for p in postsList:
            if (p['id'] == i):
                found=True
                break # abort for-loop
        if(found==False):
            #if found is still false, the current i value is not already used as id
            return i


# >>> adds a new post
# Example Response:
# {
#   id: 1,
#   title: 'Hi!',
#   categories: 'Computer, Friends',
#   content: 'Blog post content'
# }
@app.route('/api/posts', methods=['POST', 'OPTIONS' ])
@crossdomain(origin='*')
def addPost():
    newPost = request.json
    newPost["id"] = createNewId();
    postsList.append(newPost)
    print("Response POST new:")
    print(newPost)
    return jsonify(postsList)


# >>> Deletes a single blog post with the given ID. Returns the post
# Example Resposne:
# {
#   id: 1,
#   title: 'Hi!',
#   categories: 'Computer, Friends',
#   content: 'Blog post content'
# }
@app.route('/api/posts/<id>', methods=['DELETE', 'OPTIONS'])
@crossdomain(origin='*')
def removePost(id):
    print("remove")
    for p in postsList:
        if (str(p['id']) == id):
            postsList.remove(p)
            print("Response DELETE id %s:" % id)
            print(p)
            return jsonify(p)
    print("Error: could not find report %s to delete it" % id)
    abort(404)


# >>> Error Code handlers for abort() method
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run()

# twistd -n web --port 5000 --wsgi sla_rest_api.app
# twistd web --pidfile /tmp/hugo.twisted.pid --port 5000 --wsgi sla_rest_api.app
# PYTHONPATH=/root/slacontrol/sla-rest-api/src/ twistd -n web --port 5000 --wsgi sla_rest_api.app
