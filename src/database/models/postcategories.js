module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {},
  {
    timestamps: false,
    tableName: 'PostCategories',
  });

  PostCategories.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'postID',
      otherKey: 'categoryId',
    });

    Category.belongsToMany(BlogPost, {
      as: 'blogPost',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postID',
    });
  };

  return PostCategories;
};
