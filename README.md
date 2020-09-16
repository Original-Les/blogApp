# blogApp

### README Resources
* https://www.tablesgenerator.com/markdown_tables
* Markdown Basics : https://markdown-guide.readthedocs.io/en/latest/basics.html


### Packages used(Stack) in Web Dev Bootcamp for this project:


* expressjs : https://expressjs.com/
* mongodb   : https://www.mongodb.com/
* mongoosejs : https://mongoosejs.com/
* express-sanitizer : https://www.npmjs.com/package/express-sanitizer
* body-parser : https://www.npmjs.com/package/body-parser
* method-override : https://www.npmjs.com/package/method-override

#### Initial commit contains code from the RESTful route section of Colt's Steele, Web Developer Bootcamp.
* Web Developer Bootcamp : https://www.udemy.com/course/the-web-developer-bootcamp/

## Blog App Routes

* Blogs Routes - 

|   Name   |      Path       | HTTP Verb  |             Purpose                     | Mongoose Method           |
|----------|-----------------|------------|-----------------------------------------|---------------------------|
| Index    | /blogs          | GET        | List all blogs                          | blog.find()               |
| New      | /blogs/new      | GET        | Show new blog form                      | N/A                       |
| Create   | /blogs          | POST       | Create a new blog, then redirect, index | Blog.create()             |
| Show     | /blogs/:id      | GET        | Show view of one blog                   | Blog.findById()           |
| Edit     | /blogs/:id/edit | GET        | Show edit form for one blog             | Blog.findById()           |
| Update   | /blogs/:id      | PUT        | Update one blog, redirect blog, show    | Blog.findByIdAndUpdate()  |
| Destroy  | /blogs/:id      | DELETE     | Delete the one blog, redirect, index    | Blog.findByIdAndRemove()  |

* Blog Comments Routes -      

|   Name   |      Path                            | HTTP Verb  |             Purpose                     | Mongoose  Method           |
|----------|--------------------------------------|------------|-----------------------------------------|---------------------------|
| Index    | /blogs/:id/comments                  | GET        | List all blogs                          | blog.find()               |
| New      | /blogs/:id/comments/new              | GET        | Show new blog form                      | N/A                       |
| Create   | /blogs/:id/comments                  | POST       | Create a new blog, then redirect, index | Blog.create()             |
| Show     | /blogs/:id                           | GET        | Show view of one blog                   | Blog.findById()           |
| Edit     | /blogs/:id/comments/:comment_id/edit | GET        | Show edit form for one blog             | Blog.findById()           |
| Update   | /blogs/:id/comments/comment_id       | PUT        | Update one blog, redirect blog, show    | Blog.findByIdAndUpdate()  |
| Destroy  | /blogs/:id/comments/comment_id       | DELETE     | Delete the one blog, redirect, index    | Blog.findByIdAndRemove()  |