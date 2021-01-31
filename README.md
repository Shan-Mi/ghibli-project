# Ghibli-films-site-project

## TODO:
1) virtual reviews for each film;
2) make sure data can upload to db;
3) give film 'slug' field on db;
4) can use aggregation for sorting films by director's name;
```
await Film.aggregation([{
  $group:{
    _id: '$name',
    //some data...
  }
}])
```


- add likedReview on userSchema, so that we can control which 

## DONE:
1) route /model/ controller (get for now) for films;
2) set up virtual part for reviews and users;
3) 

## RUN
```
# Run frontend (:3000) & backend (:8080)
npm run dev

# Run backend only
npm run server
```