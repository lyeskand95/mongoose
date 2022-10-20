const morgan=require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();
var Mongoose=require('mongoose');
let port=8000 || env.PORT ;
var Person=require('./Person');


app.listen(port,()=>{
    Mongoose.connect("mongodb+srv://mern1:****@cluster0.uronpyl.mongodb.net/test")
    .then(()=>{
        console.log("serveur connected successfully")
    })
    .catch((error)=>{
        console.log(error.message)
    });
    console.log('the server has started');
})

let arrayOfPeople=[
    {name:"zaki",age:18, favoriteFoods:["rechta","","hmiss","pizza"]},
    {name:"moh",age:43, favoriteFoods:["spaghetti","bourek"]},
   ]

//Create and Save a Record of a Model:
let haroune=new Person({name:'haroune',age:24,favoriteFoods:['loubia','pates']})

app.post('/addPerson',(req,res)=>{
    console.log("new person");
    
    haroune.save((err,person)=>{
        if(err) res.status(400).send(" error adding");
        else res.status(200).json(person);
    })
})
/*****************************************************************************************************/
//Create Many Records with model.create()
app.post('/addPeople',(req,res)=>{
    console.log("Add people");
    Person.create(arrayOfPeople)
    .then(people=>res.send(people))

})
//*****************************************************************************************************/
//Use model.find() to Search Your Database
app.get('/people',(req,res)=>{
    console.log("list people")
    Person.find().exec((err,people)=>{
        if(err) res.status(400).send(err);
        else res.status(200).json(people);
    })
}) 
//****************************************************************************************************/
//Use model.find() to Search Your Database
app.get('/findharoune',(req,res)=>{
    console.log("people with name'haroune'")
    Person.find({name : "haroune" }).exec((err,person)=>{
        if(err) res.status(400).send(err);
        else res.status(200).json(person);
    })
})
//*****************************************************************************************************/
//Use model.findOne() to Return a Single Matching Document from Your Database
app.get('/pizza',(req,res)=>{
    console.log("person who love pizza")
    Person.findOne({favoriteFoods : "pizza" }).exec((err,persons)=>{
        if(err) res.status(400).send(err);
        else res.status(200).json(persons);
    })
})
//******************************************************************************************************/
//Create Many Records with model.create()
app.get('/findById',(req,res)=>{
    console.log(" by ID")
    Person.findById("63503f07a68c2c307d183ea4").exec((err,person)=>{
        if(err) res.status(400).send(err);
        else res.status(200).json(person);
    })
})
//*******************************************************************************************************/
//Perform Classic Updates by Running Find, Edit, then Save
app.put('/updateById',(req,res)=>{
    console.log("update person by ID..")
    Person.findById("63503f07a68c2c307d183ea4")
    .then(person=>{
        person.favoriteFood.push('sardine')
        person.save().then(pers=>res.send(pers))
    })
})
//********************************************************************************************************/
//Perform New Updates on a Document Using model.findOneAndUpdate()
app.put('/findOneAndUpdate',(req,res)=>{
    console.log("find by name and update age to 50")
    
    Person.findOneAndUpdate({name:'lyes'},{age:50}, {new:true})
    .then(person=>{
        person.save().then(pers=>res.send(pers))
    })
})
//*********************************************************************************************************/
//Delete One Document Using model.findByIdAndRemove
app.delete('/findOneAndRemove',(req,res)=>{
    console.log("find person by id and remove")
    
    Person.findOneAndRemove({_id:'63503e68cb661254dd30ebb8'}).exec((err,person)=>{
        if(err) res.status(400).send(err);
        else res.status(200).json(person);
    })
    
})
//************************************************************************************************************/
//MongoDB and Mongoose - Delete Many Documents with model.remove()
app.delete('/removeMany',(req,res)=>{
    console.log("remove people with name is moh ..")
    
    Person.deleteMany({name:'moh'}).exec((err,person)=>{
        if(err) res.status(400).send(err);
        else res.status(200).json(person);
    })
    
})
//****************************************************************************************************************/
//Chain Search Query Helpers to Narrow Search Results  
app.get('/chainSearch',(req,res)=>{
    console.log("search query")
    Person.find({favoriteFoods : "pizza" })
        .select({age:0})                
        .limit(2)              
        .sort({name: 1})     
        .select({age:0}) 
        .exec((err,person)=>{
            if(err) res.status(400).send(err);
            else res.status(200).json(person);
        })                    
            
})  

app.get('/', (req,res)=>{
    res.send("hello");
})

