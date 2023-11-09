SAMTAR School API
The SAMTAR School API simplifies the management of student, teacher, principal, posts, and course information within a school environment. This API allows easy access to various functionalities necessary for efficient school operations.

Installation
To begin using the SAMTAR School API, follow these steps:

Clone the repository: git clone https://github.com/startthecode/SAMTAR-School-node-api.git
Install the necessary dependencies: npm install
Usage
After completing the installation, start the server using the command: npm run dev or npm start

Routes
Here is a list of the available routes along with their functionalities:

Posts Routes:

GET /posts/all: Retrieve all posts.
POST /posts/add: Create a new post.
PATCH /posts/edit: Modify an existing post.
Owners Routes:

GET /owners/all: Retrieve all owners.
GET /owners/alluser/:user_type: Obtain all unverified users by type.
PATCH /owners/updateuser: Update user verification status.
Teachers Routes:

GET /teachers: Retrieve all teachers.
Login Routes:

GET /login/google: Initiate a Google login.
GET /login/google/callback: Handle the Google login callback.
Logout Routes:

GET /logout/google: Logout the user.
Courses Routes:

GET /courses/all: Retrieve all courses.
POST /courses/add: Create a new course.
PATCH /courses/edit: Modify an existing course.
Logged-In User Information Routes:

GET /userInfo: Retrieve information about the logged-in user.
Middleware
The SAMTAR School API uses the following middleware to ensure secure and controlled access:

Auth Middleware:

The isAuthenticated middleware function checks if the user is logged in and returns a 401 Unauthorized status if the user is not logged in.
Check User Role Middleware:

The checkUserRole middleware function verifies the user's role and allows access to specific routes based on the user's role. It returns a 403 Forbidden status if the user's role does not match the specified roles.
Redirect If Logged In Middleware:

The redirectIfLoggedIn middleware function redirects the user to the home page if they are already logged in. It allows users to continue if they are not logged in.
Redirect If Not Logged In Middleware:

The redirectIfLoggedOut middleware function redirects the user to the login page if they are not logged in. If the user is already logged in, the middleware allows them to continue.
