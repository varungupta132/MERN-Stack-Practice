const express =  require('express');
const app = express(); 
app.set('view engine' , 'ejs');


app.use( express.urlencoded( { extended: true } ) );
app.get('/' , ( req , res ) => {
    res.render('home page');
});
app.get('/about' , ( req , res ) => {
    res.render('about page');
});



app.get('/signup' , ( req , res ) => {
    data = req.query;
    console.log(data);
    res.render('signup page');
});



app.post('/login' , ( req , res ) => {
    
    
    data= req.body ;
    console.log(data);
    // res.send("ok");
    res.render('login page');
});







app.listen(3000, () => {
    console.log('Server started on port 3000');
});