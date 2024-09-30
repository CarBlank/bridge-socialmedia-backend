module.exports = {
    paths: {
 '/posts/create': {
    post: {
      description: 'Create Post',
      operationId: 'createPost',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/post',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Post created successfully',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },

  '/posts/getAllPages': {
    get: {
      tags: {
        Tasks: 'Get Posts',
      },
      description: 'Get posts',
      operationId: 'getPosts',
      parameters: [],
      responses: {
        200: {
          description: 'Post were obtained',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/post',
              },
            },
          },
        },
      },
    },
  },

  '/posts/update/{_id}': {
    put: {
      tags: { Post: 'Update a post'},
      description: 'Update Post',
      operationId: 'updatePost',
      parameters: [{
          name: '_id',
          in: 'path',
          schema: { $ref: '#/components/schemas/post/properties/_id'},
          description: 'Id of Task to be updated',
        }],
      requestBody: {
        content: {
          'application/json': { schema: {$ref: '#/components/schemas/post'},
          },
        },
      },
      responses: {
        200: { description: 'Task updated successfully' },
        404: { description: 'Task not found' },
        500: { description: 'Server error' },
      },
    },
  },
  '/posts/delete/{_id}': {
  delete: {
    tags: { Task: 'Delete a post'},
    description: 'Deleting a Post',
    operationId: 'deletePost',
    parameters: [
      {
        name: '_id',
        in: 'path',
        schema: {$ref: '#/components/schemas/_id'},
        description: 'Deleting a Post',
      },
    ],
    responses: {
      200: { description: 'Task deleted successfully' },
      404: { description: 'Task not found' },
      500: { description: 'Server error' },
    },
  },
},
}
}