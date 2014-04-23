/*
// gets just the domain of a title
var getDomain = function (uri) {
  "use strict";
  return uri.replace('http://','').replace('https://','').split(/[/?#]/)[0];
};
*/

// http://stackoverflow.com/a/3177838
var timeSince = function (date) {
  "use strict";
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

Template.post.helpers({
  previousVote: function () {
    "use strict";

    var post = this._id;
    var voteQuery = {
      'user' : Meteor.userId(),
      'obj'  : post
    };

    var voteResult = Votes.findOne(voteQuery);
    if (typeof voteResult !== 'undefined') {
      var vote = voteResult.vote;
      if (vote > 0) {
        Session.set('vote.' + post, 1);
        return 'upvoted';
      } else if (vote < 0) {
        Session.set('vote.' + post, -1);
        return 'downvoted';
      } else {
        Session.set('vote.' + post, 0);
        return 'nonvoted';
      }
    } else {
      Session.set('vote.' + post, 0);
      return 'nonvoted';
    }
  },
  timeCopy: function () {
    "use strict";
    return timeSince(this.createdAt);
  },
  totalPoints: function () {
    "use strict";
    return this.oldPoints + Session.get('vote.' + this._id);
  },
  authorLink: function() {
    "use strict";
    return 'https://news.ycombinator.com/user?id=' + this.author;
  },
  commentLink: function () {
    "use strict";
    return 'https://news.ycombinator.com/item?id=' + this.oldId;
  }
});