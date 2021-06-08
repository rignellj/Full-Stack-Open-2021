const initialBlogs = [
	{
		title: '1',
		author: '1',
		url: 'www.com'
	},
	{
		title: '2',
		author: '2',
		url: 'www.com'
	},
	{
		title: '3',
		author: '3',
		url: 'www.com.www'
	},
]
const newBlog = {
	title: 'new blog can be added',
	author: '4',
	url: 'www.fi',
	likes: 7
};
const newBlogWithoutLikes = {
	title: 'blog without likes',
	author: '5',
	url: 'www.fi.www'
};

const blogWithoutUrl = {
	title: 'blog without likes',
	author: '6',
	likes: 1
};

const blogWithoutTitle = {
	author: '7',
	url: 'www.fi.www',
	likes: 1
};

const blogWithoutTitleOrUrl = {
	author: '8',
	likes: 1
};

const blogToBeDeleted = {
	title: 'blog to be deleted',
	author: '5',
	url: 'www.fi.www',
	likes: 2
}

const apiUrl = '/api/blogs';

module.exports = {
	initialBlogs,
	newBlog,
	newBlogWithoutLikes,
	blogWithoutUrl,
	blogWithoutTitle,
	blogWithoutTitleOrUrl,
	blogToBeDeleted,
	apiUrl
};
