/*
  We'll have Matches and Comments (a comment is made by an user).
  Each Match will have:
    local: String representing the name of the team
    visitor: String representing the foreign team
    localScore: The current 
    visitorScore: The current 
    status: plan, start, extra, penalties, finish
    time: at what moment of the match is it now.

  Each comment will have:
  	owner: user id
  	body: description String
  	likes: List of user id's who voted it as like.
  	dislikes: List of use id's who voted it as dislike.
  	timestamp: when the comment was done
    match: String. Match identifier.
*/

Matches = new Meteor.Collection("matches")
Comments = new Meteor.Collection("comments")
