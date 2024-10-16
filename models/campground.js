const mongoose = require('mongoose');
const Review = require('./review');
const { coordinates } = require('@maptiler/client');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String,

 })

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/uploads', '/upload/w_200')
 })

const opts = { toJSON: {virtuals: true}}

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    location: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p>`
})

CampgroundSchema.post('findOneAndDelete', async (doc) => {
    if(doc){
        await Review.deleteMany({
            _id: { $in: doc.review }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);