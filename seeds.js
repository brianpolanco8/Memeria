var mongoose    = require("mongoose");
var Pizza       = require("./models/meme");
var Comment     = require("./models/comment")

var data = [
    {
        name:"Pepperoni's pizza",
        image: "http://www.91x.com/wp-content/uploads/2015/10/Pepperoni-pizza-3.jpg",
        description: "Bacon ipsum dolor amet jowl short loin venison kielbasa ham landjaeger. Tongue turkey hamburger short ribs filet mignon corned beef venison fatback strip steak buffalo ham beef ribs swine. Drumstick pork turducken, shoulder ball tip shankle flank swine ground round. Pancetta spare ribs tri-tip salami."
    },
    {
        name:"Hawaiian Pizza",
        image: "http://lh5.ggpht.com/_OaYG005JPDs/TD5BX0cPgMI/AAAAAAAABhk/j7HBTyhbaV0/s640/Spicy%20Hawaiian%20Pizza.jpg",
        description: "Bacon ipsum dolor amet jowl short loin venison kielbasa ham landjaeger. Tongue turkey hamburger short ribs filet mignon corned beef venison fatback strip steak buffalo ham beef ribs swine. Drumstick pork turducken, shoulder ball tip shankle flank swine ground round. Pancetta spare ribs tri-tip salami."
    },
    {
        name: "Vegan pizza",
        image: "http://ourfourforks.com/wp-content/uploads/2014/05/Quinoa-Pizza-Final-ourfourforks.com_.jpg",
        description: "Bacon ipsum dolor amet jowl short loin venison kielbasa ham landjaeger. Tongue turkey hamburger short ribs filet mignon corned beef venison fatback strip steak buffalo ham beef ribs swine. Drumstick pork turducken, shoulder ball tip shankle flank swine ground round. Pancetta spare ribs tri-tip salami."
    }
]

function seedDB(){
    //REMOVE all PIZZAS
    Pizza.remove({}, function(err){
    if (err){
        console.log(err)
    } else {
        console.log("Removed")
    }
})

    // //ADD A FEW PIZZAS
    // data.forEach(function(seed){
    //     Pizza.create(seed, function(err, pizza){
    //         if (err){
    //             console.log(err)
    //         } else{
    //             console.log("added a Pizza")
    //             //CREATE COMMENT
    //             Comment.create(
    //                 {
    //                 text:"The best pizza in town",
    //                 author:"Brian"
    //                 }, function(err, comment){
    //                     if (err){
    //                         console.log(err)
    //                     } else{
    //                         pizza.comments.push(comment)
    //                         pizza.save();
    //                         console.log("Created a new comment")
    //                     }
                        
    //                 }
    //             )
    //         }
    //     })
    // })
//     //ADD A FEW COMMENTS
}




module.exports = seedDB;


