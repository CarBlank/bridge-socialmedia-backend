module.exports = {
    components: {
      schemas: {
        post: {
          type: 'object',
          properties: {
            namepost: {
              type: 'string',
              description: "Post name ",
              example: 'Make an excelent post',
            },
            _id: {
              type: 'objectId',
              description: 'An id of a Post',
              example: '6470da3ba50d0ed22dd4ef96',
            },
          },
        },
      }
    }
  }     