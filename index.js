const { boolean, func } = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log('Connected to Error', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean

});

const Course = mongoose.model('Course', courseSchema);
async function createCourse(){
    const course = new Course({
        name:'Java',
        author:'max',
        tags:['Java','max'],
        isPublished:true
    
    });
    const result = await course.save();

    console.log(result);
}
//createCourse()
async function getCourses(){

    const cs =await Course
    .find({author:'max'})
    .limit(2)
    .sort({name:1})
    .select({name:1});
    console.log(cs);
}

getCourses();


