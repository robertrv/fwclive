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
