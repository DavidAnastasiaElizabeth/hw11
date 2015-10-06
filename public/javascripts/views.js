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

// var RecentPostsView = Backbone.View.extend({

// });


// MyPostsView = Backbone.View.extend({
//
// });
