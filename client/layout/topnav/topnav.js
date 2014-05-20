'use strict';

Handlebars.registerHelper('activeTime', function(time) {
  if (Session.equals('sortTime', time)) {
    return 'active';
  } else {
    return null;
  }
});

Handlebars.registerHelper('activeSort', function(sort) {
  if (Session.equals('sortType', sort)) {
    return 'active';
  } else {
    return 'inactive';
  }
});

Template.topnav.helpers({
  'isSortTop' : function () {
    if (Session.equals('sortType', 'top')) {
      return true;
    } else {
      return false;
    }
  },
  'sortType' : function () {
    return Session.get('sortType');
  },
  'showBack' : function () {
    // only show a back button on comment/user pages, where sortType is unset
    if (Session.equals('sortType', null)) {
      return true;
    } else {
      return false;
    }
  },
  'backLink' : function () {
    return '/';
  }
});
