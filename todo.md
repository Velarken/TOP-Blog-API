# To Do
### Authentication and Authorization
- Implement passport with LocalStrategy for user authentication
    * Store user session in database with prisma-session-store
- Create a JWT with user info
    * Store this token in localStorage
    * Have token expire in 2 hours

### Routes
*** Site for reading blog posts and commenting ***
- GET '/' send JSON with all info for home page
- GET '/login' send form for existing user to log in
- POST '/login' receive form data to be authenticated via passport & signs new JWT
- GET '/signup' send form to create a new user
- POST '/signup' receive form data to be validated via express-validator, ensure unique, adds valid info to database (bcrypt password), redirects to '/login'
- GET '/posts' shows all posts by all users
- GET '/posts/:userId' shows all posts by specific user

*** Site for CRUD operations for blog posts and comments ***
- POST '/posts/new' creates a new post by the logged in user

# Completed