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