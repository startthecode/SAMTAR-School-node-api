**SAMTAR school**
The School API is designed to facilitate easy management of student, teacher, principals, posts and course information within a school environment. 
It allows for easy retrieval, updating, and deletion of data related to the school's operations.

**Installation**
To get started with the SAMTAR school API, follow the steps below:
1. git clone https://github.com/startthecode/SAMTAR-School-node-api.git
2. npm install

**Usage**
Once the installation is complete, start the server using the following command:
4. npm run dev / npm start


**Routes**
List of available routes and their functionalities:

1. Posts Routes:
- GET /posts/all: Get all posts.
- POST /posts/add: Create a new post.
- PATCH /posts/edit: Edit an existing post.

2. Owners Routes:
- GET /owners/all: Get all owners.
- GET /owners/alluser/:user_type: Get all unverified users by type.
- PATCH /owners/updateuser: Update user verification status.

4. Teachers Routes:
- GET /teachers: Get all teachers.

5. Login Routes:
- GET /login/google: Initiate a Google login.
- GET /login/google/callback: Handle the Google login callback.

6. Logout Routes:
- GET /logout/google: Logout the user.

7. Courses Routes:
- GET /courses/all: Get all courses.
- POST /courses/add: Create a new course.
- PATCH /courses/edit: Edit an existing course.

8. Logged-In User Information Routes:
- GET /userInfo: Get the logged-in user information.


**Middleware**
1. Auth Middleware
The isAuthenticated middleware function checks if the user is logged in. If the user is not logged in, it returns a 401 Unauthorized status.

2. Check User Role Middleware
The checkUserRole middleware function verifies if the user's role is valid. It allows access to certain routes based on the user's role. If the user's role does not match the specified roles, it returns a 403 Forbidden status.

3. Redirect If Logged In Middleware
The redirectIfLoggedIn middleware function redirects the user to the home page if they are already logged in. If the user is not logged in, the middleware allows them to continue.

4. Redirect If Not Logged In Middleware
The redirectIfLoggedOut middleware function redirects the user to the login page if they are not logged in. If the user is already logged in, the middleware allows them to continue.


**Extra Info**
- server - Render
- Database - google clould




