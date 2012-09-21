Note:
--
This example app uses an older version of the Rigging library from August.  Many things are the same, but the way that subcomponents work is undergoing a dramatic change.  
There is also a lot more coming as far as rapid development-- we're implementing Meteor-like direct-from-client database CRUD, as well as some easier ways to get going with bindings.
See the issues page for more details.


Installing the app
--

To install this demo app, first install Node.js and npm.  Then clone this repo and cd into it:

```
git clone git@github.com:balderdashy/sails-example.git sails-example && cd sails-example
```

Install Sails (uses package.json):

```
npm install
```

Finally, copy and rename the example config.ex.js file:

```
cp config.js.ex config.js
```

And customize it accordingly for your datasource:
(see Sequelize's documentation for more information on the options available to you.  At the time of this writing, Sequelize support mySQL, SQLite, and Postgres)

```
exports.datasource = {
        database: 'nameOfYourDatabaseForLocalTelefonicaPrototype',
        username: 'yourDBUser',
        password: 'yourDBPassword'
}
```

Finally, run the app with:
```
node sails.js
```

or, to automatically restart the app when you change things-
```
forever -w sails.js
```