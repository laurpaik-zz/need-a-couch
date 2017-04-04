# Need-A-Couch
A web app that allows users to post when they need to crash for a night. Other users can
see these posts so they will know who to contact if they want to be a good Samaritan.

## Links
- [DEPLOYED APP](https://laurpaik.github.io/need-a-couch/)
- [BACK-END REPO](https://github.com/laurpaik/need-a-couch-api)
- [DEPLOYED BACK-END](https://salty-earth-68321.herokuapp.com/)

## Technologies Used:
- Ember
- JavaScript
- Handlebars
- Bootstrap

# Development
1. Fork and clone this repository.
1. Install with `npm install && bower install`
1. Run the front-end server with `ember server`
## Dependencies
  - [Webpack](https://webpack.github.io)
  - [Bootstrap](http://getbootstrap.com)
  - [Handlebars.js](http://handlebarsjs.com)
  - [Moment.js](https://momentjs.com/)

# Concept
Whether it's for a pre-planned trip or for a reckless night, everybody goes through a
moment when they need to crash somewhere. I always see posts on Facebook asking for
help from friends for their vacations, and back in college I had a couple friends who
would crash at my place for a night if they weren't good to drive. I'm a big fan of
safety first, so why not create an app to focus on these short term (or long term)
couch needs? Originally, I wanted to implement friendships because I feel safer going
to a friend's house than not. This is still a goal, but one I could not meet within
one week.

# Planning and General Approach
I had an idea of what I wanted the back-end to look like with friendships, but
after thinking seriously about the scope of this project, I simplified it to
something managable with Ember. I made several ERDs to plan out the
friendships, which I plan to use later, but for this project I settled on a
simple user `has_one` profile, profile `has_many` couchposts, and user
`has_many` couchposts `through` profile.

This was my first Ember App, so I had concerns about structure on the
front-end. I used General Assembly's talk on Ember as a reference to create a
paper prototype. While we see everything on a two-dimentional screen, Ember
seemed like a three-dimensional framework, so I needed a visual explanation of
everything Ember does. Images of the paper prototype are below.

After figuring out all my components, I began my project with a
small list of to-dos on the projects tab on GitHub. I filed some
issues directly into my project repo, but for the most part my
issues went into General Assembly's capstone repo, and I'd
reference those resolved issues on the app repo. I used my issues to structure
each day, so I kept to a fairly straightforward schedule. I spent a longer time
on the front-end than I usually do because I'm not familiar with Ember, but
ultimately I'm pleased with how this project went.

## Limitations and Complications
I had an adventure learning Ember. I had to frequently reference my paper
prototype just to figure out how Ember wants components named, which direction
was "up" vs. "down" when sending data down, actions up, and keeping track of
what components did what. My biggest complications came with connecting models
to the API, as my requests were declaring certain attributes as `nil`, such as
`profile_id` even though I thought attributes such as foreign keys would
persist. I learned a lot more about the serializer's relationship and role
between the front-end and back-end, and ultimately defining everything clearly
in the back-end serializer helped me point my data in the right direction.

Some of my biggest difficulties came with the date. My back-end was
saving dates on my local timezone, but Ember was converting them to GMT. I
learned that I could solve this by creating a transformer that takes the data
from the back-end serializer and deserializes it into something that the
front-end can display. I utilized Moment.js' `moment.utc` to convert the
dateNeeded to my time-zone and reformatted it to something more appealing for
users.

## Unsolved problems and Future Goals
I definitely want to implement some kind of friendship feature. I need to take
some time and study friendships on both the back-end and the front-end. I got
close to figuring this out on the back-end, but again, I decided to prioritize
making a complete product over making something with friendships.

## Paper Prototype

*Sign-Up View*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/sign-up.jpg" height=300px/>

*User Interface for Sign-Up*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/sign-up-closed.jpg" height=300px/>

*Path to Ember files for Sign-Up*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/sign-up-open.jpg" height=300px/>

*Closer Look at Nav-Bar*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/nav-bar.jpg" height=300px/>

*New Couchpost View*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/new-form-component.jpg" height=300px/>

*Edit Couchpost View*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/edit-form-component.jpg" height=300px/>

*User Interface for New and Edit Couchpost*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/new-form-closed.jpg" height=300px/>

*Path to Ember files for New and Edit Couchpost*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/new-form-open.jpg" height=300px/>

*Couchpost List View*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/couchpost-component.jpg" height=300px/>

*User Interface for Couchpost List*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/couchpost-component-closed.jpg" height=300px/>

*Path to Ember Files for Individual Couchpost*

<img src="https://s3.amazonaws.com/laurpaik/paper-prototype/couchpost-component-open.jpg" height=300px/>

#### User can:
##### Auth
- Create account
- Create profile
- Sign in
- Change password
- Sign out

##### Interaction
- Send post `need a couch`
- See other users' posts
- Update their post
- Delete their post

#### Pitch Deck User Stories
- User can update their profile
- User can search for friend (have them search by id first)
- User can add friend
- User can accept friend request
- User(in need) can specify “emergency” or “future trip”
- User(with couch) can respond to alert
- User(in need) can request Lyft to user(with couch)’s house
- User(all) can see how many times a friend has responded to an alert
    - The idea is you’re more likely to be accepted to a couch if you offer your couch a lot
- User(all) can direct-message a friend (with details of trip or something)
- User can receive “emergency” push notifications
    - Good for drunk friends or friends who don’t feel safe at home
- If “future trip”, then user can specify dates the couch is needed

**Couchpost Page**

<img src="https://s3.amazonaws.com/laurpaik/Screen+Shot+2017-03-30+at+7.21.02+PM.png" height=300px/>

**New and Edit Couchpost Forms**

<img src="https://s3.amazonaws.com/laurpaik/Screen+Shot+2017-03-30+at+7.24.23+PM.png" height=300px/>

**Pitch Deck Wireframe**

<img src="https://s3.amazonaws.com/laurpaik/wireframe.jpg" height=300px/>


#### Shout outs
- [Rachel](https://github.com/raq929), who helped me understand the structure with Ember and taught me about adapters and fielded most of my issues
- [Jeff](https://github.com/jrhorn424), who helped me understand what Ember actually does for us
- [Bernard](https://github.com/bernardlee), who helped me with the timezone issue
- [Sam](https://github.com/Sofistication), who helped me with form clearing and binding issues
