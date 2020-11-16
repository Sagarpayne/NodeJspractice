const { boolean, func, equal } = require('joi');
const mongoose = require('mongoose').set('debug', true);
const ObjectId = mongoose.Types.ObjectId();
mongoose.connect('mongodb://localhost:27017/playground',{useNewUrlParser:true,useCreateIndex: true, 
useUnifiedTopology: true})
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

    const pn =1;
    const ps=10;

    const cs =await Course
    //.find()
    //.or([{author:'max'},{isPublished:true}])//.and([])
    //.find({author :  /^s/i })

    .find({author :  /.*a.*/i })
    .skip((pn - 1)*ps)
    .limit(ps)
    .sort({name:-1});
   
    console.log(cs);
}

//getCourses();

async function updateCourseQueryFirst(id){

    try{
    const cs = await Course.findById(id);
    console.log(id);
    console.log(cs);

    cs.name ='new Name for';
    // cs.set({
    //     name:'new Name for'
    // });
     const res = await cs.save();

    
     console.log(res);
    }
    catch(err)
    {
        console.log(err);
    }
}
async function updateCourse(id){

    try{
        // const result = await Course.update({_id :id},{

        //     $set :{
        //         name: 'very new name3',
               
        //     }
        // });
     
        const result = await Course.findByIdAndUpdate(id,{

            $set :{
                name: 'very new name44',
               
            }
        },{new:false});
    
     console.log(result);
    }
    catch(err)
    {
        console.log(err);
    }
}
updateCourse('5fab1cf1628a2db3b0c2cdbd');


