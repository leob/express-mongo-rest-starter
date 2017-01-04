# A boilerplate providing structure and best practices for a larger Node/Express apps (with focus on Mongo and REST)

This project provides a "template"/boilerplate to help you started set up a CRUD backend with a REST API on top of
MongoDB. This combination of requirements (node.js/express.js, CRUD functionality, MongoDB, REST API) is fairly common,
so this basic "template" should be helpful in many cases.

## Intro and overview

There are many "starters" available for building Express apps, some big and complicated, others simplistic and "hello
world" style. This 'starter' tries to find a middle ground - provide some structure and tools, not too much and not too
little (which is entirely subjective, of course). Keeping it fairly lightweight and simple.

And (inevitably) it makes a number of choices for you:

* it's based on ES6 (also known as ECMAScript 2015), so using Arrow functions, Promises and so on (but not ES6 style
import/export). This means it will work only with newer node.js versions (I'm using and recommending node.js v.6.9)
* it uses Mongoose as the MongoDB library (I looked at other options but Mongoose is by far the most popular)
* it uses Morgan and Winston for logging
* it uses a standard directory structure, I chose a layout that seems to be popular in "Express land"
* finally, I have NOT yet chosen a test tool and framework, this will be the hardest part because there are so many ...
but probably I will end up choosing Mocha and Supertest (because they seem the most popular)

### Work in progress

This starter/template, and its documentation, is a WORK IN PROGRESS. It's still lacking a few essential things e.g.
unit/integration testing, authentication (I'll probably go for JWT - Javascript Web Tokens), how to do file uploads,
and so on.

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
cp .env.example .env
# Look at the environment variables:
cat .env
</pre>

The variables should work "out of the box" with their default values but if you want you can edit the .env file and
make some changes, for instance you can change the MONGODB_URI to point to a different Mongo database.

Now you can run the app (in "development" mode) by executing this command:

<pre>
npm run start
</pre>

or simply (equivalent):

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

## References

This starter/template was developed "standing on the shoulders of giants". Here is a selection of the most valuable
resources that I've used for inspiration, and which I recommend for reading:

[Introduction to Node & Express](https://medium.com/javascript-scene/introduction-to-node-express-90c431f9e6fd#.m4lssrqsl) -
the article that really got me started on my Node/Express journey

[Easily Develop Node.js and MongoDB Apps with Mongoose](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications) -
Prefect intro tutorial to Mongoose

[Switching out callbacks with promises in Mongoose](http://eddywashere.com/blog/switching-out-callbacks-with-promises-in-mongoose/) -
How to use Mongoose with Promises

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

[How To Start Unit Testing Your Express Apps](http://alexanderpaterson.com/posts/how-to-start-unit-testing-your-express-apps) -
Testing with Mocha and Chai

[How to test your MongoDB models under Node & Express](https://www.terlici.com/2014/09/15/node-testing.html) -
Testing with Mocha and "Should.js"

[Testing Express APIs with Supertest](https://www.codementor.io/nodejs/tutorial/testing-express-apis-with-supertest) -
Yes another testing option, "Tape" and Supertext