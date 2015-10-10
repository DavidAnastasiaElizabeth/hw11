var hermit = {};

$(function() {

  hermit.userView = new UserView();
  $(document.body).append(hermit.userView.render().$el);

  hermit.createPostView = new CreatePostView();
  $('#user-view').append(hermit.createPostView.render().$el);

  hermit.recentPosts = new RecentPosts();
  hermit.usersPosts = new UsersPosts();
  hermit.posts = new Posts();

  hermit.recentPostsView = new RecentPostsView({ collection: hermit.recentPosts });
  hermit.usersPostsView = new UsersPostsView({ collection: hermit.usersPosts });
  $('#user-view').append(hermit.recentPostsView.render().$el);
  $('#user-view').append(hermit.usersPostsView.render().$el);
});
