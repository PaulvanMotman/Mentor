// Container object
var db = {
	mod: {}
}

// Set up sql
var Sequelize = require( 'sequelize' )
db.sequelize = Sequelize
db.conn = new Sequelize('mentor', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
});


//// Models
// Users
db.mentee = db.conn.define( 'mentee', {
	lnkid: Sequelize.STRING,
	firstname: Sequelize.STRING,
	lastname: Sequelize.STRING,
	jobsummary: Sequelize.TEXT,
	companyname: Sequelize.STRING,
	companyindustry: Sequelize.STRING,
	jobtitle: Sequelize.STRING,
	email: Sequelize.STRING,
	workfield: Sequelize.STRING,
	headline: Sequelize.STRING,
	location: Sequelize.STRING,
	picture: Sequelize.STRING,
	summary: Sequelize.TEXT,
	profileurl: Sequelize.STRING
})

db.mentor = db.conn.define( 'mentor', {
	lnkid: Sequelize.STRING,
	firstname: Sequelize.STRING,
	reposurl: Sequelize.STRING,
	jobsummary: Sequelize.TEXT,
	companyname: Sequelize.STRING,
	companyindustry: Sequelize.STRING,
	jobtitle: Sequelize.STRING,
	email: Sequelize.STRING,
	workfield: Sequelize.STRING,
	headline: Sequelize.STRING,
	location: Sequelize.STRING,
	picture: Sequelize.STRING,
	summary: Sequelize.TEXT,
	profileurl: Sequelize.STRING
})


/// Declaring the relationships between tables



// Synchronise with database
db.conn.sync( {'force': true} ).then( 
	() => { 
		console.log ( 'Sync succeeded' )
		db.mentee.create({
			lnkid: 'yvthyfhgyh',
			firstname: 'Menteeeeeeee',
			lastname: 'hjnm',
			jobsummary: 'Sequelize.TEXT',
			companyname: 'Sequelize.STRING',
			companyindustry: 'Sequelize.STRING',
			jobtitle: 'Sequelize.STRING',
			email: 'Sequelize.STRING',
			workfield: 'Sequelize.STRING',
			headline: 'Sequelize.STRING',
			location: 'Sequelize.STRING',
			picture: 'Sequelize.STRING',
			summary: 'Sequelize.TEXT',
			profileurl: 'Sequelize.STRING'
		}).then(() => {
			console.log('Made a mentee')
		})
		db.mentor.create({
			lnkid: 'yvthyfhgyh',
			firstname: 'Mentoooooooor',
			lastname: 'hjnm',
			jobsummary: 'Sequelize.TEXT',
			companyname: 'Sequelize.STRING',
			companyindustry: 'Sequelize.STRING',
			jobtitle: 'Sequelize.STRING',
			email: 'Sequelize.STRING',
			workfield: 'Sequelize.STRING',
			headline: 'Sequelize.STRING',
			location: 'Sequelize.STRING',
			picture: 'Sequelize.STRING',
			summary: 'Sequelize.TEXT',
			profileurl: 'Sequelize.STRING'
		}).then(()=>{
			console.log('Made a mentor')
		})
	},
	( err ) => { console.log('sync failed: ' + err) } 
	)

module.exports = db
