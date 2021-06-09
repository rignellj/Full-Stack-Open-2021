const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog
		.find({})
		.populate('userId', { username: 1, name: 1, id: 1 });
	res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
	const { body, user } = req;
	let { title, author, url, likes } = body;

	likes = !likes ? 0 : likes;
	if (!title || !url) {
		return res.status(400).end();
	}
	try {
		const blog = new Blog({ title, author, url, likes, user: user._id });
		const result = await blog.save();

		user.blogs = user.blogs.concat(result._id);
		await user.save();

		res.status(201).json(result);

	} catch (error) {
		next(error);
	}
});

blogsRouter.delete('/:id', async (req, res) => {
	const { params, user } = req;
	const { userId } = await Blog.findById(params.id).populate('userId');
	const { _id: blogId } = userId;

	if (user._id.toString() === blogId.toString()) {
		await Blog.findOneAndDelete(params.id);
	}
	res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
	const { body, params } = req;
	const { likes, title, author, url } = body;

	const blog = {
		likes: likes + 1,
		title,
		author,
		url
	};
	const updatedBlog = await Blog.findByIdAndUpdate(params.id, blog, { new: true });
	res.json(updatedBlog);
});

module.exports = blogsRouter;
