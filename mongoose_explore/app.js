const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/personsDB", {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 37
})


Person.deleteMany({name: "John"}, function(err){
    if (err)
    {
        console.log("failed to delete");
    } else {
        console.log("deleted entries");
    }

});