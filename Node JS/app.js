// const express = require('express');
// const app = express();
// // app.get('', (req, res) => {
// //     res.redirect('/');
// // });

// // Home route
// app.get('/', (req, res) => {
//     res.send('Home page');
// });

// // About route
// app.get('/about', (req, res) => {
//     res.send('about page');
// });

// // Contact route
// app.get('/contact', (req, res) => {
//     res.send('This is contact page');
// });

// // Cat route (1)
// app.get('/cat', (req, res) => {
//     res.send('Meowww!! 1');
// });

// // Cat route (2) ❌ (this will never run)
// app.get('/cat', (req, res) => {
//     res.send('Meowww!! 2');
// });


// // not work in express 5 version but work in 4 version
// // app.get('*', (req, res) => {
// //     res.send('404 page not found');
// // })


// app.use((req, res) => {
//     res.send('Page Not Found');
// });



// // Server
// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });



const express = require('express');
const app = express();
const path = require('path');
const loc = path.join(__dirname, 'index.html');
app.get('/', (req , res) =>{
    // res.send('Home Page');
    res.sendFile(loc);
})


app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( __dirname, 'views' ) );
app.get( '/profile', ( req, res ) => {
    const user = {
        name: 'John Doe',
        age: 30,
        city: 'New York'
    };
    // res.send(user.name);
    res.render('profile');
});





const todos = [ 'coding' , 'reading' , 'working out' , 'sleeping' ];



app.get( '/todos' , ( req , res ) => {
    res.render( 'todos' , { todos } );
});




app.get("/products/:id", (req, res) => {
    res.send(`Product ID is ${req.params.id}`);
});





app.get("/product/:id", (req, res) => {
    const { id } = req.params;
    const { getname } = req.query;

    res.send(`ID: ${id}, Name: ${getname}`);
});



app.use(/.*/, (req, res) => {
    res.status(404).send("404 Page Not Found");
});
 





// ------------------------------------------------------>

//  dynamic css and files serving

app.use(express.static('public'));

// app.get('/shop' , (req, res) => {
//     res.sendFile(path.join(__dirname, 'index2.html'));
// });



// ------------------------------------------------------>
app.listen(3000, () => {
    console.log("Server running on port 3000");
});




// app.listen(3000, () => {console.log('Server running on port 3000');});


// cammands of expresss js 
// send status , json , file  
//  routes handleing  - fix , dynamic, query vala route -> request.aparm , request.query 
// tamplete engine - ejs , view engine , render , set views ,
//  public folder - static files , css js image ,
//  get post put delete requests 
// send data into ejs file - loops , conditionals , includes <%= "----------"%>
// rest apis , CURD operations ,
//  object stating  --->>>   {name , age , city , email } = req.body
//  Method override npm i method-override
// making fullly complete REST API with express and Array data as a database
// makeing server using http(Node js) and express both 
// intro to mongodb , mongoose , makeinng projects , store data in db instead of array
// SSR and CSR , and project , show all products to the user

