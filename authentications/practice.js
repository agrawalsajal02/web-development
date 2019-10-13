var express=            require("express"),
    app     =           express(),
    mongoose=              require("mongoose"),
    passportlocalmongoose=            require("passport-local-mongoose"),
    passport =              require("passport"),
    passportlocal      =       require("passport-local"),
    bodyparser  = require("body-parser");


app.use(bodyparser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret:"hello my girl",
    saveUninitialized:false,
    resave:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
passport.use(new localstrategy(user.authn))