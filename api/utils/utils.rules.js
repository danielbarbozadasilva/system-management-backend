module.exports = [
  {
    type: 1,
    description: 'admin',
    permission: [
      'CLIENT_SEARCH',
      'CHANGE_STATUS_PROVIDER',
      'CREATE_CATEGORY',
      'UPDATE_CATEGORY',
      'REMOVE_CATEGORY'
    ]
  },
  {
    type: 2,
    description: 'provider',
    permission: [
      'SEARCH_PRODUCT',
      'SEARCH_PRODUCT_ID',
      'CREATE_PRODUCT',
      'REMOVE_PRODUCT',
      'UPDATE_PRODUCT',
      'CREATE_LIKE_PRODUCT',
      'REMOVE_LIKE_PRODUCT'
    ]
  },
  {
    type: 3,
    description: 'client',
    permission: ['CLIENT_SEARCH_ID', 'CLIENT_LIKE_CREATE', 'CLIENT_LIKE_REMOVE']
  }
]
