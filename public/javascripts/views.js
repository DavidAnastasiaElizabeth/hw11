var UserView = Backbone.View.extend({
  id:'user-view',
  render: function(){
   var usernameSection = '<p id="username">Welcome  '+ user +'!</p>';
   var bioSection = '<div id="userbio">bio: '+ bio +'</div>';
   var logoutButton = '<button id="Logout">Logout</button>';
   this.$el.html(usernameSection + bioSection + '<div>' + logoutButton + '</div>');
   return this;
 },

 events: {
      'click #Logout': 'logout',
    },

logout: function() {
          console.log('click heard on logout button');
 },
});

var PostView = Backbone.View.extend({
  render: function() {
    var title = '<h4>' + this.model.get('title') + '</h4>';
    this.$el.html(title);
    return this;
  }
})

var CreatePostView = Backbone.View.extend({
  render: function(user) {
    console.log('CreatePostView am rendering');
    var createpostViewContainer = '<div id="createpostViewContainer">';
    var postTitle = '<input type="text" id="post-title">';
    var postBody = '<textarea id="post-body"></textarea>';
    var savePost = '<button id="savepost">Post</button>';
    this.$el.html(createpostViewContainer + '<br><div>' + postTitle + '</div><div>' + postBody + '</div><div>' + savePost + '</div>');
    return this;
  },

  events: {
    'click #savepost': 'savePost',
  },

  savePost: function() {
    var postAdded = this.collection.add({
      title: $('#post-title').val(),
      content: $('#post-body').val(),
      author: user,
      timestamp: Date.now()
    });
    postAdded.save();
    // var newUserPostsView = new UserPostsView();
    // var newRecentPostsView = new RecentPostsView();
    // newUserPostsView.render();
    // newRecentPostsView.render();
    },
 });

var RecentPostsView = Backbone.View.extend({
  className: 'RecentPostsView',
  initialize: function() {
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function() {
    console.log('RecentPostsView is rendering!!!');
    var label = '<h2>Recent Posts</h2>';
    this.$el.html(label);
    this.collection.each(function(post) {
      console.log('test');
      var postView = new PostView({ model: post });
      this.$el.append(postView.render().$el);
    }, this);
    return this;
    // console.log("database.posts", database.posts);
    // "model": app.posts.at(i),
    // "index": i,
    // parent: self

    // self.$el.append(postView1.$el);
 }
});

var UsersPostsView = Backbone.View.extend({
  className: 'MyPostsView',
  initialize: function() {
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function() {
    console.log('RecentPostsView is rendering!!!');
    var label = '<h2>Users Posts</h2>';
    this.$el.html(label);
    this.collection.each(function(post) {
      console.log('test');
      var postView = new PostView({ model: post });
      this.$el.append(postView.render().$el);
    }, this);
    return this;
    // console.log("database.posts", database.posts);
    // "model": app.posts.at(i),
    // "index": i,
    // parent: self

    // self.$el.append(postView1.$el);
 }
});


// MyPostsView = Backbone.View.extend({
//
// });
