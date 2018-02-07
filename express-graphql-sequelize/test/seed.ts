export default function seed(models) {
    return models.create({
        title: 'Posts title demo',
        content: 'Post content demo',
        createdAt: new Date(2013, 11, 24),
        updatedAt: new Date(2013, 11, 24),
    })
    .catch((e) => e)
}
