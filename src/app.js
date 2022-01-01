const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express() //initializing the application
const port = process.env.PORT || 8080;

//  NOTE -->   Defining paths for handlebars config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//  NOTE -->   setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set("views", viewsPath) //by default express expects "views" directory to root of the proj where we place .hbs files but when we wanna customize the folder name we must set its path
hbs.registerPartials(partialsPath);

//  NOTE -->   setup static directory to serve
app.use(express.static(publicDirectoryPath));


//it will hit when the example.com will hit
app.get("", (req, res) => {
    // res.send("Hello Express!");
    res.render('index', {
        title: 'Weather App',
        name: 'Fayez Kabir'
    })
});

//it will hit when example.com/help will hit
app.get("/help", (req, res) => {
    // res.send("Help page")
    res.render("help", {
        title: 'Help',
        helpMessage: 'get a fucking hot mal',
        name: 'Fayez Kabir'
    })
});

//it will hit when example.com/about will hit
app.get("/about", (req, res) => {
    // res.send("<h1>About</h1>");
    res.render('about', {
        title: 'About',
        name: 'Fayez Kabir'
    })
})

//it will hit when example.com/weather will hit
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an Address to fetch the Location."
        });
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }


        forecast(latitude, longitude, (error, { data }) => {
            if (error) {
                return res.send({
                    error: "Please provide a proper address"
                });
            }
            res.send({
                forecast: `${data.daily.data[0].summary} it is currently ${data.currently.temperature} degrees out there and there is ${data.currently.precipProbability}% of rain `,
                location,
                address: req.query.address
            });
        })

    })
});

app.get("/products", (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: "You must provide an Search term"
        })
    }

    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    // res.send("No help Article found!")
    res.render("404", {
        title: '404',
        name: 'Fayez Kabir',
        errorMsg: 'Help Article Not Found'
    })
})

app.get("*", (req, res) => {
    // res.send("No such pages found!😐😐😐😐😐")
    res.render("404", {
        title: '404',
        name: 'Fayez Kabir',
        errorMsg: 'Page Not Found'
    })
})

//creating the server
app.listen(port, () => {
    console.log("server is up and runing at - "+ port)
})