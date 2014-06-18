var okCancelEvents = function (selector, callbacks) {
  var ok = callbacks.ok || function () {};
  var cancel = callbacks.cancel || function () {};

  var events = {};
  events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
    function (evt) {
      if (evt.type === "keydown" && evt.which === 27) {
        // escape = cancel
        cancel.call(this, evt);

      } else if (evt.type === "keyup" && evt.which === 13 ||
                 evt.type === "focusout") {
        // blur/return/enter = ok/submit if non-empty
        var value = String(evt.target.value || "");
        if (value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };

  return events;
};

Template.listMatches.matches = function () {
  return Matches.find({}, {sort: {status: 1}})
};
Template.match.isStarted = function () {
  return this.status == "start";
};
Template.match.selected = function () {
  return Session.equals("selected_match", this._id) ? "selected" : '';
};
Template.match.events({
  'click': function () {
    Session.set("selected_match", this._id);
  }
});
Template.match.commentsCount = function () {
    return Comments.find({match:this._id}).count();
}
Template.comments.hasComments = function () {
  return Comments.find({match:Session.get("selected_match")}).count() > 0;
};
Template.comments.commentsForSelectedMatch = function () {
  return Comments.find({match:Session.get("selected_match")});	
};
Template.comments.events(okCancelEvents(
  '#new-comment',
  {
    ok: function (text, evt) {
      var id = Comments.insert({
      	owner: Meteor.userId(),
      	body: text,
      	timestamp: Date.now(),
      	match: Session.get("selected_match")
      });
      Deps.flush();
      evt.target.value = "";
    }
}));

Template.comment.prettyDate = function () {
	date = new Date(this.timestamp)
	return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
Template.comment.userName = function () {

    return Meteor.call('get_user_name', this.owner);
}