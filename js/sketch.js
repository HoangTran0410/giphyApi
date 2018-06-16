/*
http://api.giphy.com/v1/gifs/search?q=coding%20train&api_key=dc6zaTOxFJmzC&limit=5
*/
var api = "https://api.giphy.com/v1/";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var links = [];
var w,h;

function loadJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(xhr.response, null);
      } else {
        callback(xhr.response, status);
      }
    };
    xhr.send();
};

function addImage(title, preview, giflink){
	var newImage = document.createElement("IMG");
		newImage.src = preview;
		newImage.title = title;
		newImage.textContent = links.length;
		newImage.onclick = function(e){
			var url = links[e.path[0].textContent].giphy;
			window.open(url);
		};
		newImage.onmouseover = function(e){}
	
	var addTo = getMinHeightElement(["col1", "col2", "col3", "col4"]);
	document.getElementById(addTo.id).appendChild(newImage);

	links.push({"image":preview, "giphy":giflink});
}

function getMinHeightElement(arr){
	var min = document.getElementById(arr[0]).offsetHeight;
	var result = arr[0];
	for(var i = 1; i < arr.length; i++){
		var h = document.getElementById(arr[i]).offsetHeight;
		if(h < min) {
			min = h;
			result = arr[i];
		}
	}
	return {id:result, value:min};
}

function searchType(){
	return document.getElementById('sType').selectedOptions[0].value;
}

function searchGiphy(giphyName){
	var query = "&q="+giphyName;
	var limit = "&limit=" + 25;
	var url = api+searchType()+apiKey+limit+query;
	loadJSON(url, function(giphys, status){
		if(status === null){
			if(giphys.data.length < 1){
				window.alert("Dont have data for this giphy name");
			
			} else {
				deleteImages();
				for(var i = 0; i < giphys.data.length; i++){
					addImage(giphys.data[i].title,
							giphys.data[i].images.fixed_height_small.url,
							giphys.data[i].images.original.url);
				}
			}
		}
	});

	if(searchType() == "gifs/search?")
		for(var i = 25; i < h/20; i++){
			addRandom(giphyName, "gifs");
		}
}

function addRandom(giphyName, type){
	var tag = "&tag="+giphyName;
	var url = api+type+"/random?"+apiKey+tag;
	loadJSON(url, function(giphys, status){
		if(status === null)
			addImage(giphys.data.title,
				giphys.data.fixed_height_small_url,
				giphys.data.image_original_url);
	});
}

function changeImage(){
	var x = document.getElementById('inputS').value;
	if((x != ""&&searchType()!="gifs/trending?"&&searchType()!="stickers/trending?")
		|| searchType()=="gifs/trending?"||searchType()=="stickers/trending?") 
		searchGiphy(x);
}

function deleteImages(){
	links = [];
	var imas = document.getElementsByTagName('img');
	for(var i = imas.length-1; i >= 0 ; i--){
		imas[i].parentNode.removeChild(imas[i]);
	}
}

function about(){
	window.open('https://www.facebook.com/people/Hoang-Tran/100004848287494');
}

window.onload = function(){
	//get width height
	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	// add more gifs when scroll
	var imgArea = document.getElementById('imgArea');
	imgArea.addEventListener('scroll', function(event){
	    var element = event.target;
	    if (element.scrollHeight - element.scrollTop <= element.clientHeight+h/4){
	    	var x = document.getElementById('inputS').value;
	    	if(searchType() == "gifs/search?") addRandom(x, "gifs");
	    }
	});

	//home bar
	var searchArea = document.getElementById('searchArea');
		searchArea.style.setProperty("height", Math.floor(1/15*h)+"px");
	var child = searchArea.children;
	for(var i = 0; i < child.length; i++){
		child[i].style.setProperty("font-size", Math.max(16, Math.floor(1/40*w))+"px");
		child[i].style.setProperty("height", Math.floor(1/15*h)+"px");
	}

	//image bar
	imgArea = document.getElementById('imgArea');
	imgArea.style.setProperty("top", Math.floor(1/15*h+10)+"px");

	console.log("load " + h/20 + " firt image");
	for(var i = 0; i < h/20; i++){
		addRandom("", "gifs");
	}
}
