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
(see Sequelize's documentation for more information on the options available to you)

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