var numTerminals=6;
var numProbs=4;

var http = require("http");
var url = require("url");
var querystring = require("querystring");

http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	var query = url.parse(request.url,true).query;
	//console.log(query);
	var terminal=query.terminal;
	var guess   =query.guess;
	var correct;
	if(terminal&&guess)
	{
		//console.log("About to check "+terminal + ": "+guess);
		correct=check(terminal,guess);
	}
	if(correct=="")
		response.write(guess+" is incorrect.\nPlease try again.");
	else
	{
		response.write("Congratulations, hacker.\nYou are correct.");
	
	}


	response.end();
}).listen(8888);
function Problem(name,complete,solution)
{
	this.name = name;
	this.complete=complete;
	this.solution=solution;
}

function Terminal()
{
	this.probs = new Array();
}

var terminals= new Array();

//console.log("Hey");
init();
function init()
{
	for(var i=0; i< numTerminals; i++)
	{
		terminals.push(new Terminal());
		
		
		
		for(var j=0;j<numProbs;j++)
		{
			//console.log(terminals);
			terminals[i].probs.push(new Problem("P"+j,false,numProbs*i+j));
		}
	
	}

//	console.log(terminals);

	printStatuses();



}
function clearScreen(){ console.log("\033[2J");}
function red(str)
{
	return "\033[31m"+str+"\033[m";
}



function green(str)
{
	return "\033[32m"+str+"\033[m";
}

function check(terminal,guess)
{
	var ret="";
	for(var i=0; i<terminals[terminal].probs.length; i++)
	{
	//	console.log("Checking problem number "+i+ ",which has solution "+terminals[terminal].probs[i].solution);
		if(guess==terminals[terminal].probs[i].solution)
		{
	//		console.log("Hey I found an equals!!");
			terminals[terminal].probs[i].complete=true;			
			printStatuses();
			ret=terminals[terminal].probs[i].name;
		}



	}
	return ret;

}

function printStatuses()
{
	clearScreen();
	var str="";

	for(var i=0; i< numTerminals; i++)
	{
		str+="Terminal "+i+"\t";
		
		for(var j=0;j<numProbs;j++)
		{
			var p = terminals[i].probs[j];
			str+=color( p.name, p.complete) + "\t";
		}
		str+="\n";
	}

	console.log(str);

}

function color(str,gr)
{
	if(gr) return green(str);
	return red(str);
}








