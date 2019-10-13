var express=require("express");
var router=express.Router();  
var Campground=require("../models/campground");
router.get("/",function(req,res){
    //we need to get all campground form dbs
    
    Campground.find({},function(err,allcampa){
        if(err){
            console.log("error in page");
        }
        else{
            console.log("campgrounds are");
            res.render("campground/index.ejs",{camp:allcampa,currentuser:req.user});
        }
    });
        
        //res.render("campground.ejs",{camp:camp});
    });
        
    
    
    router.get("/new",function(req,res){
    
    //	res.send("hi sajal");
                res.render("campground/new.ejs");
        });
    
    
    
        
        router.post("/",function(req,res){
        var name=req.body.name;
        var image=req.body.image;
        var desc=req.body.description;
        var newcampgr={name:name,image:image,description:desc};
        Campground.create(newcampgr,function(err,campa){
            if(err){
                console.log("error "+err);
            }
            else{
                console.log("new campaa is created ");
                console.log(campa);
        
        res.redirect("/campground");		
            }
        });
        
        
        
        //by default is get request campgroud
    });
    
    
    router.get("/:id",function(req,res){
            //find the campgroud with required id and 
                //render the show template with that campground
                //res.send("this weill be show page one day");
            console.log("inside");
                var thing=req.params.id;
            Campground.findById(thing).populate("comment").exec(function(err,found){
                if(err){
                    console.log("there is an error"+err);
                }
                else{
                console.log("we hav found the camp "+found);
                    res.render("campground/show.ejs",{camp:found});
                }
            });  
            });
            
    
    function isauth(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
        }

        module.exports=router;