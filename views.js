var GUI = (function() { //IIFE for all Views

//Twitter Clone

  //////////////////////////////////////////////////////////////////////////////
  //NOTES FOR postView:
  //Postview displays the created posts in the AllPostsView

  //////////////////////////////////////////////////////////////////////////////

  var postView = Backbone.View.extend({

    render: function() {
      console.log('COLLECTION: ' + app.posts);
      var Tweet = this.model.get("Tweet");
      var author = this.model.get("author");
      var statusDropdown = '<select class="poststatusDropDown" name="status"><<option value="">  </option><option value="done">Done</option></select>';
      this.$el.html('<b>' + "Tweet: " + '</b>' + Tweet + '<br>' + "author: " + '</b>' + author + '<br>' + 'Status: ' + statusDropdown + " " + '<br></br>');
    },

    initialize: function(opts) {
      this.listenTo(app.posts, 'update', this.render);
      this.render();
      this.parent = opts.parent;
    },

    events: {
      "change .poststatusDropDown": "viewUpdate"
    },

    viewUpdate: function(e) {
      console.log('status changed');

      var newStatus = $(this.$el.children(".poststatusDropDown")[0]).val();
      //      console.log('newStatus is: ' + newStatus);
      //      console.log('This element is : ', this.parent.$el);

      if (newStatus === "assigned") {
        this.model.set("assignee", app.currentUser);
        this.model.set("status", "");
        var newAllPostView = new AllPostsView();
        //        console.log('created new UTView');
        var newuserpostsView = new userpostsView();
        $("#unassignedposts").empty();
        newAllPostView.render();
        $("#unassignedposts").append(newAllPostView.$el);
        //console.log('rendered new UTView');
        $("#myposts").empty();
        newuserpostsView.render();
        $("#myposts").append(newuserpostsView.$el);

      } else if (newStatus === "done") {
        //remove model from collection
        this.model.destroy();
        // refresh unassigned post view
        // var newAllPostView = new AllPostsView();
        // $("#unassignedposts").empty();
        // newAllPostView.render();
        // $("#unassignedposts").append(newAllPostView.$el);
        // refresh my post view
        // var newuserpostsView = new userpostsView();
        // $("#myposts").empty();
        // newuserpostsView.render();
        // $("#myposts").append(newuserpostsView.$el);

      } else if (newStatus === "unassigned") {
        this.model.set("assignee", "");
        this.model.set("status", "unassigned");
        // refresh unassigned post view
        // var newAllPostView = new AllPostsView();
        // $("#unassignedposts").empty();
        // newAllPostView.render();
        // $("#unassignedposts").append(newAllPostView.$el);
        // refresh my post view
        // var newuserpostsView = new userpostsView();
        // $("#myposts").empty();
        // newuserpostsView.render();
        // $("#myposts").append(newuserpostsView.$el);
      }
    },
  });

  //////////////////////////////////////////////////////////////////////////////
  //NOTES FOR CreatepostView:
  // -Creates a view that you can create a post in once you click the "Create post"
  //btn
  //-The "save" function pushed the created post to the "AllPostsView"

  //////////////////////////////////////////////////////////////////////////////

  var CreatepostView = Backbone.View.extend({

    render: function(user) {
      var createpostViewContainer = '<div id="createpostViewContainer">';

      var descrInput = '<textarea id="Tweet"></textarea>'; //text area
      //var assignee = this.model.get("assignee");
      var savepost = '<button id="savepost">Save post</button>';
      var closeDiv = '</div>';
      this.$el.html(createpostViewContainer + "</div>" +
        "Tweet" + "<br><div>" + descrInput + "</div><div>" + savepost + "</div>" + closeDiv);
    },

    events: {
      "click #savepost": "save",
    },

    save: function() {
      console.log('click heard on savepost button : ' + app.currentUser);
      var newDesc = $("#Tweet").val();
      var newAssignee = app.currentUser;
      var post = {
        author: app.currentUser,
        Tweet: newDesc,
        id: app.posts.length
      };
      app.posts.add(post);
      this.remove();
      var newAllPostView = new AllPostsView();
      var newMypostView = new userpostsView();
      newAllPostView.render();
      $("#unassignedposts").empty();
      $("#unassignedposts").append(newAllPostView.$el);
      $("#myposts").append(newMypostView.$el);
      $("#createpostViewContainer").remove();
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  //NOTES FOR AllPostsView:
  // -This is where the posts display that have the status 'unassigned'
  // -A for loop goes through app.posts.length and looks for whether or not
  // 'status' is === 'unassigned'. If it is, the post that is 'unassigned' displays
  //in the AllPostsView

  //////////////////////////////////////////////////////////////////////////////

  var AllPostsView = Backbone.View.extend({
    className: 'AllPostsView',


    initalize: function() {
      this.listenTo(app.posts, 'change', this.render);
      this.listenTo(app.posts, 'update', this.render);

    },

    testFunction: function() {
      console.log("testFunction is running");
    },

    render: function() {
      var self = this;
      app.posts.fetch().done(function(){
        console.log("done");

      console.log("AllPostsView is rendering!!!");
      var label = '<h2>All Posts</h2>';
      console.log("app.posts", app.posts);
      self.$el.html(label);
      for (var i = 0; i < app.posts.length; i++) {
        if (app.posts.at(i).get("status") === 'unassigned') {
          var postView1 = new postView({
            "model": app.posts.at(i),
            "index": i,
            parent: self
          });
          // console.log(postView1.get("index"));
          self.$el.append(postView1.$el);
        }
      }
      });
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  //NOTES FOR userpostsView:
  // -This is where the posts display that are assigned to the person that is logged in
  // -A for loop goes through app.posts.length (main.js) and looks for whether or not
  // 'assignee' is === 'app.currentUser' (user currently logged in) .
  //If it is, the post that has an 'assignee' displays in their userpostsView
  //////////////////////////////////////////////////////////////////////////////

  var userpostsView = Backbone.View.extend({
    className: 'myposts',
    initalize: function() {
      this.listenTo(app.posts, 'update', this.render);
    },

    render: function() {
      console.log("Userposts is renderig");
      var label = '<h2>My posts</h2>';
      this.$el.html(label);
      for (var i = 0; i < app.posts.length; i++) {
        if (app.posts.at(i).get("assignee") === app.currentUser) {
          var postView2 = new postView({
            "model": app.posts.at(i),
            "index": i,
            parent: this
          });
          this.$el.append(postView2.$el);
        }
      }
    },
  });

  //////////////////////////////////////////////////////////////////////////////
  ////NOTES FOR userpostsView:
  // -This is the view that holds the 'userpostsView', 'userpostsView',the display
  //where you create your post, the logout button and it shouws you who is logged in
  //-When you click 'logout', the view changes back to the 'loginView'
  //-RIGHT NOW - When you enter text into the textbox titled "post Title", I am able
  //to see that app.posts is now longer then the test info that we have in main.js,
  //but for some reason it's not displaying in 'AllPostsView'
  //////////////////////////////////////////////////////////////////////////////

  var UserView = Backbone.View.extend({
    render: function(user) {
      console.log("UserView is rendering!!!");
      var userViewContainer = '<div id="userViewContainer">';
      var userHeader = '<h2>Team DAE Twitter</h2><h3>User: ' + user + '</h3>';
      var unassignedposts = '<div id="unassignedposts"></div>';
      var myposts = '<div id="myposts"></div>';
      var buttons = '<button id="createpost">Create post</button><button id="logout">Logout</button>';
      var closeDiv = '</div>';
      this.$el.html(userViewContainer + userHeader + unassignedposts + myposts + buttons + closeDiv);
    },

    events: {
      "click #logout": "logout",
      "change #newpostTitle": "createpost",
      "click #createpost": "createpost"
    },

    initialize: function() {
      // this.listenTo(app.posts, 'update', this.render);

    },

    logout: function() {
      console.log('click heard on logout button');
      var loginView = new LoginView();
      loginView.render();
      $("#app").empty();
      $("#app").append(loginView.$el);
    },

    createpost: function() {
      console.log('click heard on createpost button');
      var createpostView = new CreatepostView({model: app.posts});
      createpostView.render();
      $("#app").append(createpostView.$el);
    },
  });

  //////////////////////////////////////////////////////////////////////////////
  ////NOTES FOR LoginView:
  // -This is where the magic happens. This is the first view you see in the app
  //when you select a name from the dropdown menu, this is the event that logs you
  //into the app.  It's also the event that does the following:
  //*Creates UserView
  //*Creates AllPostsView
  //*Creates userpostsView
  //*Tells the app that the name selected upon log-in is the name associated with the
  //posts in userpostsView
  //*Tells the app that the name selected upon log-in is the name displaying at the
  //top of userpostsView

  //////////////////////////////////////////////////////////////////////////////

  var LoginView = Backbone.View.extend({
    id: "loginViewContainer",
    render: function() {
      var label = '<h2>Team DAE Twitter</h2><h3>Please choose your name below to log in...</h3>';
      var users = app.users.pluck('username');
      console.log(users);
      var dropdown = '<select id = "dropDown">';
      users.forEach(function(element){dropdown += "<option>"+element+"</option>";});
      dropdown += ('</select>');
      this.$el.html(label + dropdown);
    },

    initialize: function() {
      var self = this;
      app.users.fetch().done(function(){
        self.render();
      });
      this.listenTo(app.posts, 'update', this.render);
    },

    events: {
      "change #dropDown": "login"
    },

    login: function() {
      var user = $("#dropDown").val();
      app.currentUser = user;
      var userModel = app.users.findWhere({
        username: user
      });

      var userpostsModel = app.users.where({
        assignee: user
      });
      //returns the first model that it matches
      var newUserView = new UserView({
        model: userModel
      });
      var newAllPostView = new AllPostsView();
      var newuserpostsView = new userpostsView();
      newUserView.render(user);
      newAllPostView.render();
      newuserpostsView.render();
      $("#app").empty();
      $("#app").append(newUserView.$el);
      $("#unassignedposts").append(newAllPostView.$el);
      $("#myposts").append(newuserpostsView.$el);
    }
  });


  function GUI(users, posts, el) {
    var firstView = new LoginView();
    // firstView.render();
    $("#app").append(firstView.$el);
  }

  return GUI;
}());
