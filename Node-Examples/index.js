var rect = require("./rectangle")

var solve = function(l,b){
    console.log("for length: and breadth:  "+l+" "+b);
    rect(l,b,(err,rectangle) => {
        if(err){ console.log(err.message) }
        else{
            console.log("perimeter :: "+rectangle.perimeter());
            console.log("area :: "+rectangle.area());
        }
    });
}

solve(2,3);
solve(0,0);
solve(-2,2);