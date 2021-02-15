# Ghibli-films-site-project

## TODO:
1) ~~can use aggregation for sorting films by director's name; (maybe unnecessary)~~
2) once the user click like-btn, we should insert user's id as well as film's id into both likedBy(for review) and likedReview (for user), before doing that, we need to check if that id already existed in the list, so that we can render out filled heart to indicate that the user has already liked this review.
3) Need to store jwt in cookie
4) user's email needs to be verified

```
await Film.aggregation([{
  $group:{
    _id: '$name',
    //some data...
  }
}])
```

## DONE:
1) make sure data can upload to db;
2) route /model/ controller (get for now) for films;
3) set up virtual part for reviews and users;
4) add slug for each film
5) authentication (signup / login / logout / forgotpassword / resetpassword / send welcome letter (via pug) / )
6) virtual reviews for each film;
7) fixed `email.js` template for react render page
8) Login/ Register works
## RUN
```
# Run frontend (:3000) & backend (:8080) development mode
`yarn start` or `npm start`

# Run production mode
`yarn start:prod`

# Import data to DB
`yarn data:import`

# Destroy data from DB
`yarn data:destroy`
```

## Client
`yarn add react-player`

[react-player](https://github.com/CookPete/react-player)
```js
import React from 'react'
import ReactPlayer from 'react-player'

// Render a YouTube video player
<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
```

