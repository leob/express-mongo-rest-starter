# A boilerplate providing structure and best practices for a larger Node/Express apps (with focus on Mongo and REST)

This project provides a "template"/boilerplate to help you started set up a CRUD backend with a REST API on top of
MongoDB. This combination of requirements (node.js/express.js, CRUD functionality, MongoDB, REST API) is fairly common,
so this basic "template" should be helpful in many cases.

## Table of contents

[Intro and overview](#intro-and-overview)<br>
[Work in progress](#work-in-progress)<br>
[Installation and usage](#installation-and-usage)<br>
[Roadmap](#roadmap)<br>
[Mongoose models and relationships](#mongoose-models-and-relationships)<br>
[References](#references)

## Intro and overview

There are many "starters" available for building Express apps, some big and complicated, others simplistic and "hello
world" style. This 'starter' tries to find a middle ground - provide some structure and tools, not too much and not too
little (which is entirely subjective, of course). Keeping it fairly lightweight and simple.

And (inevitably) it makes a number of choices for you:

* it's based on ES6 (also known as ECMAScript 2015), so using Arrow functions, Promises and so on (but not ES6 style
import/export). This means it will work only with newer node.js versions (I'm using and recommending node.js v.6.9)
* it uses Mongoose as the MongoDB library. This is the most popular Javascript library for MongoDB with an extensive
community and ecosystem around it, and with substantial advantages for more complex apps (e.g. model validation and
client-side joins)
* it uses ABSOLUTE paths for importing modules, so instead of ```Project = require('../models/project')``` we simply
use Project = require('models/project') - simpler and less error-prone (and it allows you to more easily move modules to
a different directory as part of a refactoring); the absolute paths are made possible by setting the NODE_PATH variable
in the startup scripts
* it uses Morgan and Winston for logging, and has error-handling middleware
* it uses a standard directory structure, I chose a layout that seems to be popular in "Express land"
* finally, I have NOT yet chosen a test tool and framework, this will be the hardest part because there are so many ...
but probably I will end up choosing Mocha, Chai and Supertest (because they seem the most popular)

## Work in progress

This starter/template, and its documentation, is a WORK IN PROGRESS. It's still lacking a few essential things e.g.
unit/integration testing, authentication (probably with JWT - Javascript Web Tokens), how to do file uploads,
etc.

Controller/model examples are also rudimentary. See [below](#roadmap) for some ideas for improvements.

### Credits

This starter is, to a large extent, a mix (with tweaks and additions to satisfy my personal tastes and needs) of the
following great projects:

[express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api) - A great Node/Express
starter which I discovered after I made the first version of my starter. It turned out that it met already 80% of my
needs, however my starter has a few simplifications:

It does not use Babel, hence it can't use ES6 'import', instead I'm using "require"; also I'm not using "Bluebird" for
promises but plain ES6 promises; and there's some other stuff which I've omitted.

However I've copied/pasted the excellent router/controller/model structure (including the naming convention) almost
literally, because the structure looked more or less perfect to me.

[Express Generator](https://github.com/expressjs/generator) - the official Expressjs application generator, this gave
me the idea to use the 'bin/www.js' startup script which does the connection/networking stuff, isolated frm 'app.js'
which is the application proper an can be unit-tested isolated from the networking

[Hackathon Starter](https://github.com/sahat/hackathon-starter) - Another great starter

## Installation and usage

### Prerequisites

Make sure you've got ```node``` installed, preferably a newer version which supports ES6 (ECMAScript 2015). I use and
recommend ```node``` version ```6.9.x``` which is currently (as of January 2017) the LTS (Long Term Support) version of
```node```, hence it's "new" but "stable".

***Note:*** node 6.x provides most of the ES6 features but it does not support ES6 style module import/export, instead
I'm using CommonJS style "require/module.exports". If you want ES6 import/export then you would need to use Babel,
however this is not generally recommended, see [this](http://vancelucas.com/blog/dont-transpile-javascript-for-node-js)
article.

To run the app (while in development, not in production), I recommend ```nodemon``` which will automatically restart
your app when you change the source. To install it, run (from a terminal):

<pre>
npm install -g nodemon
</pre>

The start scripts (in ```package.json```) are configured to use ```nodemon```.

Next, make sure you have MongoDB installed. On OSX you can install it like this (assuming you have ```homebrew```
installed):

<pre>
sudo brew update
brew install mongodb
# To have launchd start mongodb now, and restart it at login, execute:
brew services start mongodb
# Open a database in the mongo shell (in the example below we used the "test" database) to try out some Mongo commands:
mongo test
</pre>

### Installing the app

Run the following commands to download and install the app:

<pre>
git clone https://github.com/leob6/express-mongo-crud-api-example
# rename it to whatever you want, I chose "myapp" here:
mv express-mongo-crud-api-example myapp
cd myapp
rm -rf .git
git init
</pre>

Finish the installation by entering the following commands:

<pre>
npm install
</pre>

### Configuring and running the app

First check and edit the configuration variables for the application. To do this copy the ".env.example" file:

<pre>
cp .env.example .env.development
# Look at the environment variables and modify them where necessaary:
cat .env.development
</pre>

The variables should work "out of the box" with their default values but if you want you can edit the .env.development
file and make some changes, for instance you can change the MONGODB_URI to point to a different Mongo database.

'''Notes:''':

* For security reasons the .env.development file is NOT committed to source control. For the same reason you would not
commit an ".env.test" or ".env.production" file to source control (this is enforced automatically by the
```.gitignore``` file).

* Instead of (or in addition to) putting environment variables in .env files, you can set these variables directly on
the command line (see the ```scripts``` section in ```package.json```), this is also how the ```NODE_PATH``` and
```NODE_ENV``` variables get set.

Now you can run the app (in "development" mode) by executing this command:

<pre>
npm start
</pre>

Watch the logs in the terminal to see if the app starts up successfully.

To test the app, you can either open it in a browser or you can use the ```curl``` program from the command line.

Browser: open the following URL in a web browser: ```http://localhost:3000/api/projects```

You should see just this ```[]``` which means an empty collection was returned (because the MongoDB database is still
empty, no projects).

### Testing with ```curl```

It's more efficient to test with a command line tool like ```curl``` which allows you to easily script your tests.

Here are examples of ```curl``` commands you can use:

<pre>
# Get all projects:
curl -X GET http://localhost:3000/api/projects

# Get a project by ID (the ID is made up, replace this with an existing ID)
curl -X GET http://localhost:3000/api/projects/585111468222960eee4d3fff

# create project
curl -H "Content-Type: application/json" -X POST -d '{"title":"bla"}' http://localhost:3000/api/projects
#curl --data "title=bla" http://localhost:3000/api/projects

# update project
curl -v -H "Content-Type: application/json" -X PUT -d '{"title":"bla upd"}' \
    http://localhost:3000/api/projects/586b3edbd9a8640c606da451

$ delete project
curl --request DELETE http://localhost:3000/api/projects/585005468907560e9d4d377f
</pre>

## Roadmap

The following improvements are planned for the 'starter':

* unit/integration testing (probably with Mocha, Chai and Supertest)
* authentication (using Passport or JWT - Javascript Web Tokens)
* file uploads (via JSON or via multipart/form-data?)
* tooling: add ESLint (with eslint-config-airbnb)
* the controllers have quite a lot of 'boilerplate' and code repitition - how can we avoid copy and past and make the
controllers more 'DRY' ?
* extending the Mongoose model examples, especially with more complex Mongodb models/relations (instead of the current
'Project' example I will probably switch to another example/use case, for instance a "To do" app with Tasks and Users)

The last point (modeling of MongoDB relations) is central to application architecture with MongoDB, so I will discuss
it separately in the [next](#mongoose-models-and-relationships) section.

## Mongoose models and relationships

The API/controller and Mongoose model examples are VERY rudimentary. There is only one Mongoose model (Project) with
one field ('title'). I would like to add more models, and then show how you can handle relationships between the models
in an non-relational database like MongoDB.

For instance, if a Task belongs to one User (person), or conversely a User can have multiple Tasks, how do you model
that?

* Do you store a list of ObjectIDs of the Tasks in the User document?
* Or do you 'de-normalize' the data and store not only the Tasks' IDs but also the tasks' Descriptions in the User
document?

Both approaches have their pros and cons. The tradeoffs are:

* With the first solution (storing only the ObjectIDs), after fetching a User, you would need to do another client-side
query to fetch the Tasks for that user (so that you can show the task descriptions).

* With the second solution (de-normalized storage), you store the Task description redundantly in the User document, so
you don't need to perform an extra client-side query to fetch the Tasks. However if you update the description of a Task
you will need to update it in the User also.

Issues like these are well known and stem from the fact that MongoDB is a no-SQL database and therefore not relational.
Read this article for a good explanation of the various ways (and their tradeoffs) to model relationships in MongoDB:

[6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1?_ga=1.160035453.1913396526.1478489894)

Another example of "relational" issues is referential integrity - how do you prevent deleting a User who still has
Tasks? If the User is deleted and the user's Tasks are not then the result will be that the tasks are "orphaned".

Now there are several ways to deal with these issues:

* handle it completely client-side: this means that the client of the REST API (for instance an Angular or React web
app) needs to do 2 API calls, first to retrieve the User(s) and then to retrieve the Task(s) of the User(s); this is
clearly quite inefficient (two client-server roundtrips)
* perform two MongoDB/Mongoose queries but perform them 'server side' and also do the join 'server side'. This would
mean adding more code/logic to the Controllers, or adding another object/abstraction layer for instance 'repositories'
or 'services' (see for instance [this](http://adrian-philipp.com/post/function-factory-getters-hot-reloading) article)
* a very advanced and cutting-edge approach is to use GraphQL, which allows you to compose queries/requests flexibly at
the client side. This is very interesting and currently "hot" technology, however it means a complete departure from
the REST model (you can see it as a REST competitor), so I did not consider it for this project/starter since the scope
of this starter is "REST API", however I'm considering this for another 'starter' project. There is even a tool/library
called [Graffiti](https://github.com/risingstack/graffiti) which aims to "automagically" do the interfacing between
Mongoose and GraphQL.
* the final solution, and the one I prefer, is to shift this problem to Mongoose - since Mongoose is an "ORM" it
already has facilities to model relationships and make MongoDB behave a bit more like a "relational database".

So, to summarize all of this: I'm planning to add more 'realistic' Mongoose models (with relationships between them) to
the starter, and to show how to use Mongoose facilities to manage the relationships. The Mongoose features which make
this possible are the following:

* [Query Population](http://mongoosejs.com/docs/populate.html) - this facility lets Mongoose do the "client side joins"
for you
* [Mongoose Middleware](http://mongoosejs.com/docs/middleware.html) - this is a way to centralize application logic
(for instance, checking for duplicate keys, and other error handling) so that we can keep the Controllers simple;
see the section 'Error Handling Middleware' on that page
* [Mongoose Plugins](http://mongoosejs.com/docs/plugins.html) - another way to centralize application logic and keep
your controllers etcetera simple. We could use [this](https://github.com/getlackey/mongoose-ref-validator) Mongoose
plugin to enforce 'referential integrity' (prevent deleting a document which still refers to other documents)

Even when using these Mongoose facilities it might be a good idea to introduce a Services layer next to the Controllers
layer (I've already created a 'services' directory but it is currently empty). This way we can keep the controllers
simple, maybe it turns out that the 'controllers' are not needed anymore (it might be that we end up with only routing
boilerplate) and we can get rid of them (replace them with a generic module).

## References

This starter/template was developed "standing on the shoulders of giants". Here is a selection of the most valuable
resources that I've used for inspiration, and which I recommend for reading:

[Introduction to Node & Express](https://medium.com/javascript-scene/introduction-to-node-express-90c431f9e6fd#.m4lssrqsl) -
the article that really got me started on my Node/Express journey

[Easily Develop Node.js and MongoDB Apps with Mongoose](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications) -
Prefect intro tutorial to Mongoose

[Switching out callbacks with promises in Mongoose](http://eddywashere.com/blog/switching-out-callbacks-with-promises-in-mongoose/) -
How to use Mongoose with Promises

[6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1?_ga=1.160035453.1913396526.1478489894) -
MongoDB database modeling guidelines

[Mongoose plugins](https://www.npmjs.com/search?q=mongoose+plugin) - an NPM query which shows the Mongoose plugins
available via NPM

[How to Get Node.js Logging Right](https://blog.risingstack.com/node-js-logging-tutorial/) - Showed me the "right" way
to do logging

[Best practices for Express app structure](https://www.terlici.com/2014/08/25/best-practices-express-structure.html) -
this one got me thinking on how to structure a (larger) Express app, using subdirectories instead of dumping everything
into one large JS file

[A Quick Tour Of ES6 (Or, The Bits You’ll Actually Use)](http://jamesknelson.com/es6-the-bits-youll-actually-use/) -
Handy overview of the most useful ES6 features

[Don’t Transpile JavaScript for Node.js](http://vancelucas.com/blog/dont-transpile-javascript-for-node-js) - To use (or
not) transpilers like Babel for node/express apps

[Enabling ES6 Syntax Support in WebStorm](https://medium.com/@brandonaaskov/enabling-es6-syntax-support-in-webstorm-48e22956ecfd#.xkfdhuqil) -
Good to know if WebStorm is your IDE

[Keeping API Routing Clean Using Express Routers](https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers) -
an advanced way to organize your routes, a bit more sophisticated than how I did it in my starter

[NodeJS: Factory Function Pattern, Dependency Registry and Hot Reloading](http://adrian-philipp.com/post/function-factory-getters-hot-reloading) -
yet an other (and quite advanced) way to organize your Express app and manage the dependencies between components;
looks suitable for big apps

[Hackathon Starter](https://github.com/sahat/hackathon-starter) - A fantastic Node/Express starter and one of the big
sources of inspiration for my starter (to a large extent my starter is a greatly stripped down version of the Hackaton
Starter with numerous little tweaks to make it meet my tastes and requirements); maybe the greatest thing about the
Hackaton Starter is the README which is on genius level and an absolute goldmine of information

[express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api) - Another great starter,
I "borrowed" (among other things) the directory/file naming conventions from this starter

[How To Start Unit Testing Your Express Apps](http://alexanderpaterson.com/posts/how-to-start-unit-testing-your-express-apps) -
Testing with Mocha and Chai

[How to test your MongoDB models under Node & Express](https://www.terlici.com/2014/09/15/node-testing.html) -
Testing with Mocha and "Should.js"

[Testing Express APIs with Supertest](https://www.codementor.io/nodejs/tutorial/testing-express-apis-with-supertest) -
Yes another testing option, "Tape" and Supertext