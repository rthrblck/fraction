Router.route('hot', {
  path:     '/hot',
  template: 'listPosts',
  waitOn: function () {
    return Meteor.subscribe('hotPosts');
  },
  onAfterAction: function () {
    Session.set('sortType', 'hot');
    Session.set('currentView', 'Hot News');
    Session.set('posts', Posts.find({}, {
      reactive: false,
      sort: {
        heat: -1
      }
    }).fetch());
  }
});
