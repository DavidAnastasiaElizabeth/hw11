var Hermit = {
  Models: HermitModels,
  Views: HermitViews
};

$(function() {

  Hermit.userView = new Hermit.Views.UserView();
  $(document.body).append(Hermit.userView.render().$el);

  Hermit.recentPosts = new Hermit.Models.RecentPosts();
  Hermit.usersPosts = new Hermit.Models.UsersPosts();
  Hermit.posts = new Hermit.Models.Posts();

  Hermit.createPostView = new Hermit.Views.CreatePostView({ collection: Hermit.posts });
  Hermit.recentPostsView = new Hermit.Views.RecentPostsView({ collection: Hermit.recentPosts });
  Hermit.usersPostsView = new Hermit.Views.UsersPostsView({ collection: Hermit.usersPosts });

  $('#user-view').append(Hermit.createPostView.render().$el);
  $('#user-view').append(Hermit.recentPostsView.render().$el);
  $('#user-view').append(Hermit.usersPostsView.render().$el);
});
