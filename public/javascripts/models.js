var HermitModels = (function() {
  var UserModel = Backbone.Model.extend({
    defaults:{
      username:'',
      bio:'Not Provided',
      password:''
    }
  });

  var PostModel = Backbone.Model.extend({
    idAttribute: 'key',
    defaults:{
      timestamp: '',
      title:'',
      content:'',
      author:''
    }
  });

  var Posts = Backbone.Collection.extend({
    model: PostModel,
    url:'/posts',
    initialize: function (){
      this.fetch();
    }
  });

  var RecentPosts = Backbone.Collection.extend({
    model: PostModel,
    url: '/posts/recent',
    initialize: function (){
      this.fetch();
    }
  });

  var UsersPosts = Backbone.Collection.extend({
    model: PostModel,
    url:'/posts/' + user,
    initialize: function (){
      this.fetch();
    }
  });

  return {
    UserModel: UserModel,
    PostModel: PostModel,
    Posts: Posts,
    RecentPosts: RecentPosts,
    UsersPosts: UsersPosts
  }

})();
