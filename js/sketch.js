/*
http://api.giphy.com/v1/gifs/search?q=coding%20train&api_key=dc6zaTOxFJmzC&limit=5
*/
var api = "http://api.giphy.com/v1/";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var links = [];

function setup(){
	noCanvas();
}

function addImage(title, preview, giflink){
	var newImage = document.createElement("IMG");
		newImage.src = preview;
		newImage.title = title;
		newImage.textContent = links.length;
		newImage.onclick = function(e){
			var url = links[e.path[0].textContent].giphy;
			window.open(url);
		};
		newImage.onmouseover = function(e){

		}
	document.body.appendChild(newImage);
	links.push({"image":preview, "giphy":giflink});
}

function setBg(bg){
	var b = document.getElementsByTagName('body')[0];
	b.style.backgroundImage = "url("+bg+")";
}

function searchGiphy(giphyName){
	var query = "&q="+giphyName;
	var limit = "&limit=" + 25;
	var url = api+"gifs/search?"+apiKey+limit+query;
	loadJSON(url, function(giphys){
		console.log(giphys);
		if(giphys.data.length < 1){
			window.alert("dont have data for this giphy name");
		
		} else {
			deleteImage();
			for(var i = 0; i < giphys.data.length; i++){
				addImage(giphys.data[i].title,
						giphys.data[i].images.fixed_width_small.url,
						giphys.data[i].images.original.url);
			}
		}
	});
}

function changeImage(){
	var x = document.getElementsByTagName("input")[0].value;
	if(x != "") searchGiphy(x);
}

function deleteImage(){
	links = [];
	var imas = document.getElementsByTagName('img');
	for(var i = imas.length-1; i >= 0 ; i--){
		imas[i].parentNode.removeChild(imas[i]);
	}
}

// (function(){
	// 	var allImage = document.getElementsByClassName("rg_ic rg_i");
	// 	var myWindow = window.open("", "MsgWindow", "width=400,height=500");
	// 	var firstLink = true;
	// 	for(var i = 0; i < allImage.length; i++){
	// 		if(allImage[i].attributes.src.textContent && myWindow){
	// 			if(allImage[i].attributes.src.textContent.substring(0, 4) == 'http'){
	// 				myWindow.document.write("<p>"+(firstLink==true?"":",")+"\""+(allImage[i].attributes.src.textContent)+"\"</p>");
	// 				firstLink = false;
	// 			}
	// 		}
	// 	}
	// })();