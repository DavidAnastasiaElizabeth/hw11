var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection(

	);

	app.posts = new IssueCollection();

	app.gui = new GUI(app.users,
						app.posts,
						'#app');// selector of main div
});
