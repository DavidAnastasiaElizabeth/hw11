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

CreatePostView = Backbone.View.extend({
  render: function(user) {
    console.log('CreatePostView am rendering');
    var createpostViewContainer = '<div id="createpostViewContainer">';
    var postInput = '<textarea id="Tweet"></textarea>';
    var savePost = '<button id="savepost">Post</button>';
    return (createpostViewContainer + '<br><div>' + postInput + '</div><div>' + savePost + '</div>');
  },

  events: {
    'click #savepost': 'save',
  },

  save: function() {
    console.log('click heard on savepost button');
    },
 });

var RecentPostsView = Backbone.View.extend({
  className: 'RecentPostsView',
    initalize: function() {
      this.listenTo(database.posts, 'change', this.render);
      this.listenTo(database.posts, 'update', this.render);
    },

    render: function() {
      var self = this;
      database.posts.fetch().done(function(){
      console.log("RecentPostsView is rendering!!!");
      var label = '<h2>All Posts</h2>';
      console.log("database.posts", database.posts);
      self.$el.html(label);
      // "model": app.posts.at(i),
      // "index": i,
      // parent: self
    });

   self.$el.append(postView1.$el);
   }
});


// MyPostsView = Backbone.View.extend({
//
// });
