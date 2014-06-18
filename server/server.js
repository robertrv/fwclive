Meteor.startup(function () {
  if (Matches.find().count() === 0) {
    var matches = [
                {local:"Brazil", visitor:"Croatia",localScore:3,visitorScore:1,status:"finish",time:90},
                {local:"Spain", visitor:"Netherland",localScore:1,visitorScore:5,status:"finish",time:90},
                {local:"Colombia", visitor:"Greece",localScore:0,visitorScore:0,status:"start",time:30},
                {local:"Spain", visitor:"Colombia",localScore:0,visitorScore:0,status:"plan",time:0}
                ];
    for (var i = 0; i < matches.length; i++)
      Matches.insert(matches[i]);
  }
});

Accounts.onCreateUser(function(options, user) {
    if (!user.name)
        user.name = user.emails[0].address
    if (options.profile)
        user.profile = options.profile;
    return user;
});

Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: { emails: 1, profile: 1, name: 1 } });
});