# Ghibli-films-site-project
# Understructure 👩🏻‍💻

## TODO:
1) refactor private header token part, since cookie works fine now.
2) update password (on frontend profile page)
3) create admin panel for updating and creating films data
- ~~can use aggregation for sorting films by director's name; (maybe unnecessary)~~

## DONE:
1) make sure data can upload to db;
2) route /model/ controller (get for now) for films;
3) set up virtual part for reviews and users;
4) add slug for each film
5) authentication (signup / login / logout / forgotpassword / resetpassword / send welcome letter (via pug) / )
6) virtual reviews for each film;
7) fixed `email.js` template for react render page
8) Login/ Register works
9) each user can create one review for each film
10) cookie works fine now
11) frontend error handling, e.g. mongoError duplicated index
12) backend: restrict edit access to creator, from frontend, user cannot send and edit review if they are not creator for that review.
13) once a user click like-btn, likesCount increase by 1 (only once) by inserting user's id into likedBy array on reviewsModel, and populate likedCount
14) Remove unused components, use ErrorMessage and error/setError from context for errorHandling globally.
15) LikedBy heart shows different color, if the user has liked, then it's red-400, otherwise it is red-200; once been liked by currUser, it will become red-400
16) user's email needs to be verified to login
## RUN
```
# Run frontend (:3000) & backend (:8080) development mode
`yarn start` or `npm start`

# Run production mode
`yarn start:prod`

# Import data to DB (delete this for now, will fix this later)
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
## SOS
- `sudo lsof -i :8080`
- `kill -9 {PID}`
> this is for server is running on 8080 already error. Maybe need to set some setting for error, will try to fix this if possible.

## BUG
if we `edit` - `update` (successful) - `edit` - `cancel` then we will get back the previous review before successfully updated one
