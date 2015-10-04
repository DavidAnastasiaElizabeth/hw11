var UserModel = Backbone.Model.extend({
  defaults: {
    username:'',
    postsCreated: [],
    assignedposts: []
  },
    addUser : function (str) {
      this.set("username", str);
  }
});

var IssueModel = Backbone.Model.extend({
  defaults: {
    Tweet:'',
    author:'',
    status:'unassigned'
  },
  newpost : function (desc, user) {
    this.set("desc", desc);
    this.set("author", user);
  },
  assignpost : function (user) {
    this.set("assignee", user);
  },
  status : function (user, status) {
    this.set("assignee", user);
    this.set("status", status);
  }
});

var UserCollection = Backbone.Collection.extend({
  model : UserModel, url:"/users"
});

var IssueCollection = Backbone.Collection.extend({
  model : IssueModel, url:"/tweets"
});
