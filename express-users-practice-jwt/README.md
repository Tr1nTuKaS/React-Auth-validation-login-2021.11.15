## install

1. npm i

# Todo

1. Padaryti login mehanizma su grazinamu jwt
1. padaryti front forma loginui ir kad veiktu, issaugodama token
1. padaryti kad prisilogines vartotojas butu prisilogines ir po perkrovimo(localstorage )
1. padaryti user posts page front ir back kad matytume tik to vartotojo postus
1. padatyti bendra posts page kuriame matosi visi postai ir user email
1. hide login and reg if user is logged in
1. Delete button on user posts page
1. index.html show posts of current user in different color/style
1. make single post page to load post details dynamically from qurery params
1. make timeStamp look nice
1. add posts form too add a post
1. add posts form only awailable to logged in user requests verified using jwt

## practice tasks

1. Add ability to add image url and display image on the card
2. Create comments table and connect it to posts. Post can have many comments.
3. In single-post.html add commenting form with 2 inputs, author and text
4. if user is logged in do not show author input and use email
5. modify posts table. add column 'archived' boolean. Default value is false.
   4.1 When we try to delete post, instead of deleting make 'archived' value true
   4.2 in all posts page show only posts that are not 'archived'
