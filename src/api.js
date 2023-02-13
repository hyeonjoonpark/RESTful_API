// @ts-nocheck

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {GegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matches: string[], body: Object.<string, *> | undefined) => Promise} callback
 */

/**
 * @typedef CreatePostBody
 * @property {string} title
 * @property {string} content
 */

const fs = require('fs')
const DB_JSON_FILENAME = 'database.json'

/** @returns {Promise<Post[]>} */
async function getPosts() {
  const json = fs.promises.readFile(DB_JSON_FILENAME, 'utf-8')
  return JSON.parse(json).posts
}

/**
 * @param {post[]} posts
 */
async function savePosts() {
  const content = {
    posts,
  }
  return fs.promises.writeFile(
    DB_JSON_FILENAME,
    JSON.stringify(content),
    'utf-8'
  )
}

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: await getPosts(),
    }),
  },

  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (matches) => {
      const postId = matches[1]
      if (!postId) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }

      const posts = await getPosts()

      const post = posts.find((_post) => _post.id === postId)
      if (!post) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }

      return {
        statusCode: 200,
        body: post,
      }
    },
  },

  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
      if (!body) {
        return {
          statusCode: 400,
          body: 'Ill-formed request',
        }
      }
      /** @type {string} */
      /* eslint-disable-next-line prefer-destrictiring */
      const title = body.title
      const newPost = {
        id: title.replace(/\s/g, '_'),
        title,
        content: body.content,
      }

      const posts = await getPosts()
      savePosts(posts)

      posts.push(newPost)

      return {
        statusCode: 200,
        body: newPost,
      }
    },
  },
]

module.exports = {
  routes,
}
