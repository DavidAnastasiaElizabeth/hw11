var hermit = {};

var userView = new UserView();
$(document.body).append(userView.render().$el);

var createPostView = new CreatePostView();
$('#user-view').append(createPostView.render().$el);

var recentPosts = new RecentPosts();
var usersPosts = new UsersPosts();

var recentPostsView = new RecentPostsView({ collection: recentPosts });
var usersPostsView = new UsersPostsView({ collection: usersPosts });
$('#user-view').append(recentPostsView.render().$el);
$('#user-view').append(usersPostsView.render().$el);
