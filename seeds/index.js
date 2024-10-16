const cities = require('./cities');
const mongoose = require('mongoose');
const Campground = require('../models/campground')
const {places, descriptors} = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array =>  array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author:'670fbd9786f335556953b8a6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            description:'to be added',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude],
            },
            images:[
                
                    {
                        url: 'https://res.cloudinary.com/dusxr06zh/image/upload/v1729000111/YelpCamp/lpjpvpvy0zjem8q2xome.jpg',
                        filename: 'YelpCamp/lpjpvpvy0zjem8q2xome'
                       
                    },
                    {
                        url: 'https://res.cloudinary.com/dusxr06zh/image/upload/v1729000121/YelpCamp/uo394fqljocoqwqbv7p5.jpg',
                        filename: 'YelpCamp/uo394fqljocoqwqbv7p5'
                    
                    }
                
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})