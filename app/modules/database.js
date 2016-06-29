// Container object
var db = {
	mod: {}
}

// Set up sql
var Sequelize = require( 'sequelize' )
db.conn = new Sequelize('mentor', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
});


//// Models
// Users
db.mentee = db.conn.define( 'mentee', {
	lnkid: Sequelize.STRING,
	firstname: Sequelize.STRING,
	lastname: Sequelize.STRING
})

db.mentor = db.conn.define( 'mentor', {
	lnkid: Sequelize.STRING,
	firstname: Sequelize.STRING,
	reposurl: Sequelize.STRING
})


/// Declaring the relationships between tables



// Synchronise with database
db.conn.sync( {'force': true} ).then( 
	() => { 
		console.log ( 'Sync succeeded' )
	},
	( err ) => { console.log('sync failed: ' + err) } 
	)

module.exports = db
