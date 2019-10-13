var express=        require("express"),
 app=               express(),
 bodyparser=        require("body-parser"),
passport=           require("passport"),
localstrategy =     require("passport-local"),
passportlocalmongoose=require("passport-local-mongoose"),  
 mongoose=          require("mongoose"),
 user=              require("./models/user");
mongoose.connect("mongodb://localhost/auth_demo",function(err){
if(err){
    console.log("db is not connected");
}
else{
    console.log("db is connected");
}
});

app.use(require("express-session")({
secret:"Rusty is the  best dog in world",
    saveUninitialized:false,
resave:false
}));

//important lines
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.urlencoded({extended:true}));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/secret",function(req,res){
res.render("secret.ejs");
});

app.get("/register",function(req,res){
res.render("register.ejs");
});

app.post("/register",function(req,res){

    var username=req.body.username;
var password=req.body.password;
//var obj={username:username,password:password};
user.register(new user({username:username}),   password , function(err,user){
    if(err){
        console.log(err);
    return res.render("/register");
    }
    passport.authenticate("local")(    req     ,    res     , function(){
   res.redirect("/secret");
    });
}  );
//res.send("register post route");
});
app.listen(5000,function(){
    console.log("server is started");
})