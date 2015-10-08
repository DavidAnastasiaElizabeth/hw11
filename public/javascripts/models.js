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

var Posts = Backbone.Model.extend({
  nodel: PostModel,
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
  url:'posts/' + user,
  initialize: function (){
    this.fetch();
  }
});
