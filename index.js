const { boolean, func, equal } = require('joi');
const mongoose = require('mongoose').set('debug', true);
const ObjectId = mongoose.Types.ObjectId();
mongoose.connect('mongodb://localhost:27057/playground', {
    useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log('Connected to Error', err));


const courseSchema = new mongoose.Schema({

    name: String,
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0
            },
            message: 'Atleast one tag is needed'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean

});
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {

    try {
        const course = new Course({

            name: 'Java',
            author: 'max',
            tags: null,
            isPublished: true

        });
        const result = await course.save();

        console.log(result);
    }
    catch(ex){

        for(f in ex.errors)
        {
            console.log(ex.errors[f].message)
        }
    }
}
createCourse()



