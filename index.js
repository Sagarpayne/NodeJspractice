const { boolean, func, equal } = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log('Connected to Error', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price:Number

});

const Course = mongoose.model('Course', courseSchema);
async function getCourses(){

    const pn =2;
    const ps=1;

    const cs =await Course
    //.find()
    //.or([{author:'max'},{isPublished:true}])//.and([])
    //.find({author :  /^s/i })

    .find()
.or([{price : {$gte :15} },{name: /.*by.*/i}])
    .sort({name:1})
    
    console.log(cs);
}

getCourses();


