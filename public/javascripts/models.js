var UserModel = Backbone.Model.extend({
  defaults:{
    username:'',
    bio:'Not Provided',
    password:''
  }
});

var PostModel = Backbone.Model.extend({
  defaults:{
    timestamp: Date.now(),
    title:'',
    body:'',
    author:''
  }
});

var RecentPosts = Backbone.Collection.extend({
  model: PostModel,
  url: '/posts/recent'
});

var UsersPosts = Backbone.Collection.extend({
  model: PostModel,
  url:'posts/:username'
});
