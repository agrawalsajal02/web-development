function grader(arr){
	var r=0;
	var t=arr.length;
	for(var i = 0;i < t;i++){
	r=r+arr[i];				
					}
	console.log(Math.ceil(r/t));				
					
}
					
					var scores=[90,98,89,100,100,86,94];
					grader(scores);

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
grader(scores2);