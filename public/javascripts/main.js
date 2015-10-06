var hermit = {};

var userView = new UserView();
$(document.body).append(userView.render().$el);

var createPostView = new CreatePostView();
$('#user-view').append(createPostView.render());

var recentPostsView = new RecentPostsView();
$('#user-view').append(recentPostsView.render());
