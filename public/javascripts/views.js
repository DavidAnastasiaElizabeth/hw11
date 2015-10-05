var UserView = Backbone.View.extend({
  id:'user-view',
  render: function(){
   var usernameSection = '<p id="username">Welcome  '+ user +'!</p>';
   var bioSection = '<div id="userbio">bio: '+ bio +'</div>';
   this.$el.html(usernameSection + bioSection);
   return this;
  }
})
