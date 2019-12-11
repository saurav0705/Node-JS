var rect = {
    perimiter: (x,y) => (2*(x+y)),
    area: (x,y) => (x*y)
};

var solve = function(l,b){
    console.log(l+" "+b);
    if(l>=0 || b>=0){
    console.log("perimeter :: "+rect.perimiter(l,b));
    console.log("area :: "+rect.area(l,b)+"\n");}
    else{
        console.log("no value is taken less than zero.");
    }
}

solve(2,3);
solve(0,0);
solve(-2,2);