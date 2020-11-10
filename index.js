const { boolean, func, equal } = require('joi');
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

// eq (equal)
// ne
// gt
// gte 
// lt 
// lte 
// in 
// nin 

//.find(price:{$gte:10,$lte:20})
//.find(price : {$in : [10,20,30]})

async function getCourses(){

    const pn =2;
    const ps=1;

    const cs =await Course
    //.find()
    //.or([{author:'max'},{isPublished:true}])//.and([])
    //.find({author :  /^s/i })

    .find({author :  /.*a.*/i })
    .skip((pn - 1)*ps)
    .limit(ps)
    .sort({name:-1})
    .count()
    // .select({name:1});
    console.log(cs);
}

getCourses();


