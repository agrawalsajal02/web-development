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

app.use(bodyparser.urlencoded({extended:true}));


app.use(require("express-session")({
secret:"Rusty is the  best dog in world",
    saveUninitialized:false,
resave:false
}));

//important lines
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
passport.use(new localstrategy(user.authenticate()));


app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/secret",isloggedin,function(req,res){
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

//we uses middleware here , which means that a code uns before staring of post or get route
///it can run and end also
//we can stack many middlywhere function
app.post("/login", passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}), function(req,res){
    //res.send("this is login page");
});
app.get("/login",function(req,res){
    res.render("login.ejs");

   // res.send("this is post route");
});

app.get("/logout",function(req,res){
//res.send("ok i will log you out");
//it will destroy username and password in current active session so that session is unable to track user
req.logout();
res.redirect("/");
});

function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(5000,function(){
    console.log("server is started");
})