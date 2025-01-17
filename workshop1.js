const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", (80));
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "attendees",
	password: "abc123",
	database: "workshop1"
};

const pool = new Pool(config);

app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
});

app.post("/api", async (req, res) => {
	const workshop = req.body.workshop;
	const attendee = req.body.attendee;
	if(!workshop || !attendee){
		res.json({error: 'parameters not given'});
	}
	else{
		try {
			const template = "SELECT attendee FROM attendees WHERE attendee = $1 and workshop = $2";
			const response = await pool.query(template, [ attendee, workshop ]);
			if(response.rowCount == 1){
				res.json({error: 'attendee already enrolled'});
			} else {
				const template =
					"INSERT INTO attendees (workshop, attendee) VALUES ($1, $2)";
				const response = await pool.query(template, [ workshop, attendee ]);
				res.json({ attendee: attendee, workshop: workshop } );
			}
		} catch (err) {
			res.json({ status: "not added: duplicate entry ", attendee: attendee, workshop: workshop });
			console.log(err);
		}
	}
});

app.get("/api", async (req, res) => {
	const name = req.query.workshop;
	try {
		if(!name){
			const template = "SELECT distinct workshop FROM attendees";
			const response = await pool.query(template);
			if (response.rowCount == 0) {
				res.json({status: "error 1" });
			} else {
				const workshop = response.rows.map(function(item) {
					return item.workshop;
				})
				res.json({
					workshops: workshop
				});
			}
		} else {
			const template = "SELECT attendee FROM attendees WHERE workshop = $1";
			const response = await pool.query(template, [ name ]);
			if (response.rowCount == 0) {
				res.json({error: "workshop not found"});
			} else {
				const attendee = response.rows.map(function(item) {
					return item.attendee;
				})
				res.json({
					attendees: attendee
				});
			}
		}

	} catch (err) {
		console.log(err);
		res.json({ status: "error 2"});
	}
});
