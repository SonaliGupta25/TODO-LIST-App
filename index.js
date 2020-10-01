const express  =require('express');
const path = require('path');
const port = process.env.PORT|| 3000;

 const db = require('./config/mongoose');
 const ToDo = require('./models/todoList');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));


app.get('/', function(req, res){
     
    ToDo.find({}, function(err, todolists){
       if(err){
           console.log('Error in fetching data from db');
           return;
       }
    return res.render('home',{
        title: "TODO List",
        todo_list : todolists
    });
    });
  });


app.post('/create-list',function(req, res){
  
    if(req.body.submit_buttons=="Add-Task")
{
    ToDo.create({
        description: req.body.description,
        category:req.body.category,
        date:req.body.date
    },function(err,newToDo){
        if(err){
            console.log('Error in creating the list'); return ;
        }
        console.log('******',newToDo);
        return res.redirect('back');
    });
}  
else if(req.body.submit_buttons=="Delete-Tasks")
{
    let idArray = req.body.delete_tasks ;
    console.log(idArray) ;
    ToDo.deleteMany({_id:{$in:idArray}},function(err){
        if(err){
            console.log('Error in deleting a task from database');
            return;
        }
        return res.redirect('back');
    });
        
}   
});



app.listen(port, function(err){
    
    if(err){
        console.log('Error!! There is an error in running the server',err);
    }

    console.log('Successful!! Server running on port',port);
});
