
var HermitViews = (function() {
  var UserView = Backbone.View.extend({
    id:'user-view',
    render: function(){
      var usernameSection = '<p id="username">Welcome  '+ user +'!</p>';
      var bioSection = '<div id="userbio">bio: '+ bio +'</div>';
      var logoutButton = '<button id="Logout">Logout</button>';
      this.$el.html('<div id="user-section">' +usernameSection + bioSection + '<div>' + logoutButton + '</div>'+'</div>');
      return this;
    },

    events: {
      'click #Logout': 'logout',
    },

    logout: function() {
       $.ajax({
         method: "DELETE",
         url: '/logout'
       }).done(function(data) {
         console.log('Successfully Logged Out');
       });
       window.location = '/';
       user = '';
       bio = '';
     }
  });

  var PostView = Backbone.View.extend({
    render: function() {
      this.listenTo(this.collection, 'update', this.render);
      var postEdit = '<textarea id="post-Edit"></textarea>';
      var titleContent = $('#title').html();
      var bodyContent = $('#content').html();
      var title = '<h4 id="title">' + this.model.get('title') + '</h4>';
      var contentBody = '<h5 id="content">' + this.model.get('content') + '</h5>';
      this.$el.html(title + '<div>' + contentBody + '</div>');
      return this;
    },

    events: {
      'click #title': 'edit',
      'click #content': 'edit'
    },

    edit: function() {
      console.log("heard click on post");
      var postEdited = this.model({
        title: $('#post-title').html(),
        content: $('#post-body').val(),
      });
      var editTitle = '<input type="text" value=' + this.model.get('title') + '>';
      var editContent = '<input type="text" value=' + this.model.get('content') + '>';
      this.collection.each(function(post) {
        var postView = new PostView({ model: post });
        this.$el.append(postView.render().$el);
      }, this);
      return this;
    }
  });

var EditView = Backbone.View.extend({
  render: function() {

  },

  events: {
    'click #title': 'edit',
    'click #content': 'edit'
  },

  update: function() {
    this.model.set('title', $('#title').html());
    this.model.set('content', $('#content').html());
    this.model.save();
  }
});

  var CreatePostView = Backbone.View.extend({
    id: 'create-view',
    render: function() {
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
      $('#post-title').val('');
      $('#post-body').val('');
      Hermit.recentPostsView.collection.fetch();
      Hermit.usersPostsView.collection.fetch();
    }
   });

  var RecentPostsView = Backbone.View.extend({
    className: 'RecentPostsView',
    initialize: function() {
      this.listenTo(this.collection, 'update', this.render);
    },

    render: function() {
      var label = '<h2>Recent Posts</h2>';
      this.$el.html(label);
      this.collection.each(function(post) {
        var postView = new PostView({ model: post });
        this.$el.append(postView.render().$el);
      }, this);
      return this;
   }
  });

  var UsersPostsView = Backbone.View.extend({
    className: 'MyPostsView',
    initialize: function() {
      this.listenTo(this.collection, 'update', this.render);
    },

    render: function() {
      var label = '<h2>Users Posts</h2>';
      this.$el.html(label);
      this.collection.each(function(post) {
        var postView = new PostView({ model: post });
        this.$el.append(postView.render().$el);
      }, this);
      return this;
    }
  });

  return {
    UserView: UserView,
    PostView: PostView,
    CreatePostView: CreatePostView,
    RecentPostsView: RecentPostsView,
    UsersPostsView: UsersPostsView
  };

})();
