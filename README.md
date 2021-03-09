# Ghibli-films-site-project

**Backend RESTful api URL**
> https://ghibli-project-shan.herokuapp.com

**API documentation (super simple demonstration)**
> https://documenter.getpostman.com/view/10522951/Tz5m8zRd

**Client side page** *works fine on Firefox now*
> https://ghibli-project.netlify.app/

# Understructure 👩🏻‍💻

## TODO:
1) fix film page, maybe add some reviewsPage, and on film page, we list out several most liked reviews, and with a show all button. once clicked that button, we go to reviews page for this film. (if have time, will think about that.)
2 add pagination or lazy loading...(low priority)

- ~~can use aggregation for sorting films by director's name; (maybe unnecessary)~~

## DONE: (35)
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
17) Except for resetPassword, we need to manually set privateHeader, for other condition, we use cookie.jwt (10)
18) update password (on frontend profile page) and error handling
29) add loading status checking for all pages
31) replace the old ErrorMessage component with error toaster
33) add overlay and responsive video player for trailer on film detail page
34) add image galary for images on detail page
35) simple responsive layout for images & rating info on detail page (need to be improved)

---
### admin
19) simple admin styling: 
20) Edit films: images upload part hasn't done yet.
21) edit reviews: edit part not done
22) edit users: done.
23) All fields can be sorted once clicked title accordingly
24) delete one film/review/user functionality part is done
25) refactor components and styles to reuse repeated parts
26) refactor sort function, due to new condition (if a user has been deletet, user === null)
27) add loading status indicator
28) use react-toast for error messages/success messages (works fine, will update frontend part accordingly too)
30) redirect user to landing page if they are not logged in as 'admin'
32) create new film
33) upload film images/coverImage w/ multer

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
