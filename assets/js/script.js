var counter = 0; //moving the array
var holdLink;

function search(){ //(description, tag) input and dropdown use onclick() to search on submit button
  var inputtedSearch = document.querySelector('#input').value; //searching term w/ input
  var inputtedTag = document.querySelector('#menuOptions').value; //searching tags w/ dropdown
  const spaceFixer = function(inputtedSearch){
    return inputtedSearch.trim().split(' ').join('%20');
  } //function that fixes spaces
  var inputtedSearchFinal = spaceFixer(inputtedSearch); //search with spaces finished
  //document.write(inputtedSearch.replace(/ /g, '%20'));
    //var tag = 'javascript'; //change to dropdown menu value
    //var description = 'Uncaught TypeError' //change to input value
    //console.log(inputtedTag)
    var createLink =  'http://api.stackexchange.com/2.2/search?order=desc&sort=relevance&tagged=' + inputtedTag + '&intitle=' + inputtedSearchFinal + '&site=stackoverflow'
    holdLink = createLink;
    fetch(createLink,
    {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        if(data.items.length == 0)
        {
          console.log("No results found")
        }
        else{
          //console.log(createLink);
          console.log(data);
          //for(var i = 0; i < 1; i++) //data.items.length
          //{
            //console.log(data);
            console.log("Link preview link = " + data.items[counter].link)
            var stacklink = 'http://api.linkpreview.net/?key=6183f2f21f3a5da93aa0c053ff2a7356 &q=' + data.items[counter].link;
            console.log("Link Preview Starts here ");
            linkPreviewCreation(stacklink);
            //onsole.log(data.description)
          //}
        }
      }); 
    }

    function linkPreviewCreation(stacklink){
      fetch(stacklink, 
      {
        method: 'GET', //GET is the default.
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
  
          console.log(data);
          console.log(data.url)
          console.log(data.description)
          putInBox(data);
        }); //link preview creator 
      }

      var url = "https://www.youtube.com/watch?v=jNQXAC9IVRw"; //placeholder
function createYouTubeEmbedLink (url) {
    return url.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
    }


    fetch('http://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow', 
    {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        for(var i = 0 ; i < data.items.length; i++) //data.items.length
        {
        //console.log(data.items[i].name);
        var x = document.createElement("OPTION");
        x.setAttribute("id", "tags", data.items[i].name);
        var t = document.createTextNode(data.items[i].name);
        x.appendChild(t);
        document.getElementById("menuOptions").appendChild(x);
        }
      }); //get all the popular tags from stackoverflow

      function putInBox(data){
          var x = document.createElement("p");
          x.setAttribute("id", "desc", data.description);
          var t = document.createTextNode(data.description);
          x.appendChild(t);
          document.getElementById("content").appendChild(x);

          var x = document.createElement("a");
          x.setAttribute("href", data.url);
          x.innerHTML = (data.url);
          document.getElementById("url").appendChild(x);

          var x = document.createElement("IMG");
          x.setAttribute("id", "img")
          x.setAttribute("src", data.image);
          x.setAttribute("width", "50");
          x.setAttribute("height", "50");
       
         document.getElementById("footer").appendChild(x);
      }

      function fwdLink(holdLink){
        counter++;
        clear();
        //linkPreviewCreation(stacklink)

        var stacklink = 'http://api.linkpreview.net/?key=6183f2f21f3a5da93aa0c053ff2a7356 &q=' + data.items[counter].link;
        linkPreviewCreation(stacklink);
      }

      function clear(){
        var str = document.getElementById("content").innerHTML; 
        var res = str.replace(str, ""); //1st para use str
        document.getElementById("desc").innerHTML = res;

        var str2 = document.getElementById("url").innerHTML; 
        var res2 = str.replace(str2, ""); //1st para use str
        document.getElementById("url").innerHTML = res;

        var str3 = document.getElementById("url").innerHTML; 
        var res3 = str3.replace(str3, ""); //1st para use str
        document.getElementById("footer").innerHTML = res;
      }
      /*
      //works from an on click on a button
      var favArray = [];
      function favButton(urlExample, descriptionExample){
      //take in 2 parameters

      favArray.push({url: "google.com", description: "blah blah blah" }); 
      console.log(favArray)
      localStorage.setItem("favArray", JSON.stringify(favArray));
      
      }
      var storedNames = JSON.parse(localStorage.getItem("favArray"));
      console.log(storedNames[i])
      */


/*
todo:
1. logic is good we have all we need from the api's but now we need to make the functions work with inputs
2. make data come out on the page pretty
*/