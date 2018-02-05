'use strict'
const Posts = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt:  DataTypes.DATE,
    deleteAt: DataTypes.DATE,
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
    },
  })
  return Post
}

export default Posts
