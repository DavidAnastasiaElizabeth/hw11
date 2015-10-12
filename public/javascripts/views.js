
var HermitViews = (function() {
  var UserView = Backbone.View.extend({
    id:'user-view',
    render: function(){
      var usernameSection = '<p id="username">Welcome  '+ user +'!</p>';
      var bioSection = '<div id="userbio">About Me: '+ bio +'</div>';
      var editUser = '<button id="EditUser"><a href="/users/' + key + '/edit">Edit User</a></button>'
      var logoutButton = '<button id="Logout">Logout</button>';
      this.$el.html('<div id="user-section">' +usernameSection + bioSection + '<div>' + editUser + logoutButton + '</div>'+'</div>');
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
    className: 'post-view',
    render: function() {
      this.listenTo(this.collection, 'update', this.render);
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
        var editView = new EditView({model: this.model});
        this.$el.append(editView.render().$el);
    }
  });

var EditView = Backbone.View.extend({
  render: function() {
  var createEditViewContainer = '<div id="createEditViewContainer">';
  var editTitle = '<input id= "editTitle" type="text" value="" />';
  var editContent = '<textarea id="editContent"></textarea>';
  var editChirp = '<button id="saveEdit">Edit Chirp</button>';
  var closeDiv = '</div>';
  this.$el.html(createEditViewContainer + "New Chirp Title" + "<div>" + editTitle + "</div>" +
    "New Chirp" + "<br><div>" + editContent + "</div><div>" + editChirp + "</div>" + closeDiv);
    return this;
  },

  events: {
    'click #saveEdit': 'update',
  },

  update: function() {
   console.log("heard button edit click");

    // var postEdited = this.model({
    //   title: $('#post-title').html(),
    //   content: $('#post-body').val(),
    // });
    // var editTitle = '<input type="text" value=' + this.model.get('title') + '>';
    // var editContent = '<input type="text" value=' + this.model.get('content') + '>';
    //
    // this.collection.each(function(post) {
    //   var revisedTitle = new title({ model: post });
    //   this.$el.append(revisedTitle.render().$el);
    // }, this);
    //
    // this.collection.each(function(post) {
    //   var revisedContent  = new content({ model: post });
    //   this.$el.append(revisedContent.render().$el);
    // }, this);
    //
    // return this;
    this.model.set('title', $('#title').html());
    this.model.set('content', $('#content').html());
    this.model.save();
    this.remove();
  }
});

  var CreatePostView = Backbone.View.extend({
    id: 'create-view',
    render: function() {
      var createpostViewContainer = '<div id="createpostViewContainer">';
      var postTitle = '<input type="text" id="post-title">';
      var postBody = '<textarea id="post-body"></textarea>';
      var savePost = '<button id="savepost">Chirp</button>';
      this.$el.html(createpostViewContainer + '<div>' + 'Chirp Title' + '</div>' + postTitle + '</div><div>' + '<br><div id="chirptext">' + 'Chirp' + '</div>' + postBody + '</div><div>' + savePost + '</div>');
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
      var label = '<h2>Recent Chirps</h2>';
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
      var label = '<h2>User Chirps</h2>';
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
