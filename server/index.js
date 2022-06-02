const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');
const SchoolModel = require('./models/School');

app.use(cors());
app.use(express.json())

/// DATABASE CONNECTION
mongoose.connect("mongodb+srv://Jepps:password12345@js3.ohibqqu.mongodb.net/js3mern?retryWrites=true&w=majority", {useNewUrlParser: true});

//Post Route
app.post('/addfriend', async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const courseId = req.body.courseId;
    
    const friend = new FriendModel({name: name, age: age, courseId: courseId});
    await friend.save()
    res.send(friend); 
});

//Read Route
app.get('/read', async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

//Update Route
app.put('/update', async (req, res) => {
    const newAge = req.body.newAge
    const id = req.body.id

    try {
        await FriendModel.findById(id, (error, friendToUpdate) => {
            friendToUpdate.age = Number(newAge);
            friendToUpdate.save();
        });
    } catch(err) {
        console.log(err);
    }

    res.send('updated');
});

//Delete Route
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await FriendModel.findByIdAndRemove(id).exec();
    res.send("itemdeleted");
});

//

//Post Route
app.post('/addschool', async (req, res) => {
    const location = req.body.location;
    const students = req.body.students;
    const courseId = req.body.courseId;
    console.log(req.body);
    
    const School = new SchoolModel({location: location, students: students, courseId: courseId});
    await School.save()
    res.send(School);
    
});

//Read Route
app.get('/readschools', async (req, res) => {
    SchoolModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
});

//what port the server is listening to
app.listen(3001, ()=> {
    console.log('Server running on port 3001...');
});
