const dummy = () => {
	return 1;
};

const totalLikes = (arrayOfBlogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes;
	};
	if (arrayOfBlogs.length === 0) {
		return 0;
	}
	return arrayOfBlogs.reduce(reducer, 0);
};

const favoriteBlog = (arrayOfBlogs) => {
	const reducer = (favorite, item) => {
		return favorite.likes > item.likes ? favorite : item;
	};
	return arrayOfBlogs.reduce(reducer);
};

module.exports = { dummy, totalLikes, favoriteBlog };
