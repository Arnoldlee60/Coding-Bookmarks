var counter = 0; //moving the array
var holdLink = "";
var holdStackLink = "";
let savedArray = [];
//let savedObject = {};
var savedLinks = [];
var savedList = document.querySelector("#savedList");

function search(){ //(description, tag) input and dropdown use onclick() to search on submit button
var inputtedSearch = document.querySelector('#input').value; //searching term w/ input
var inputtedTag = document.querySelector('#menuOptions').value; //searching tags w/ dropdown
const spaceFixer = function(inputtedSearch){return inputtedSearch.trim().split(' ').join('%20');} //function that fixes spaces
var inputtedSearchFinal = spaceFixer(inputtedSearch); //search with spaces finished

var createLink =  'https://api.stackexchange.com/2.2/search?order=desc&sort=relevance&tagged=' + inputtedTag + '&intitle=' + inputtedSearchFinal + '&site=stackoverflow';
holdLink = createLink;
    clear(); clear //when already searched
    fetchLinks(createLink); //moved original to fetchLinks
    }

    function fetchLinks(link){
      fetch(link,
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
              //console.log(data);
                //console.log(data);
                //console.log("Link preview link = " + data.items[counter].link)
                var stacklink = 'https://api.linkpreview.net/?key=6183f2f21f3a5da93aa0c053ff2a7356&q=' + data.items[counter].link;
                holdStackLink = stacklink;
                //console.log("Link Preview Starts here ");
                //console.log("hold link = " + holdLink);
                linkPreviewCreation(stacklink);
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
          //console.log(data); //console.log(data.url) //console.log(data.description)
          putInBox(data);
        }); //link preview creator 
      }

      function linkPreviewSave(){
        console.log(holdStackLink)
        fetch(holdStackLink, 
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
            //console.log(data.url); //console.log(data.description); //console.log(data.image);

           addLinks(data);
            //console.log("array = url = " + savedArray[0].url);
            //putInBox(data);
          }); //link preview creator 
        }

    fetch('https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow', 
    {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); //when called too many times
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
        //console.log(this.holdLink) //use hold to use global variable
        fetchLinks(this.holdLink);
      }
      function backLink(holdLink){
        counter--;
        if(counter >= 0)
        {
        clear();
        fetchLinks(this.holdLink);
        }
        else
        {
          counter = 0; //dont go negative
        }
      }

      function clear(){
        var str1 = document.getElementById("desc").innerHTML; 
        var res1 = str1.replace(str1, ""); //1st para use str
        document.getElementById("content").innerHTML = res1;

        var str2 = document.getElementById("url").innerHTML; 
        var res2 = str2.replace(str2, ""); //1st para use str
        document.getElementById("url").innerHTML = res2;

        var str3 = document.getElementById("footer").innerHTML; 
        var res3 = str3.replace(str3, ""); //1st para use str
        document.getElementById("footer").innerHTML = res3;
      }

//======================= Saved stuff ==================================
//todoForm.addEventListener("submit", function(event) {
function addLinks(data){ //saving
 
let savedObject = {
  url: data.url,
  description: data.description,
  image: data.image
}

  savedArray.push(savedObject);
  // Store updated Links in localStorage, re-render the list
  storeLinks();
  renderLinks();
}
function storeLinks() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("savedArray", JSON.stringify(savedArray));
  //console.log(savedArray.length);
}

function renderLinks(){
  savedList.innerHTML = "";
  //todoCountSpan.textContent = savedLinks.length;
  // Render a new li for each link
  console.log(savedArray);
  for (var i = 0; i < savedArray.length; i++) {
    var hold = savedArray[i].url;
    var li = document.createElement("li");
    li.textContent = hold; //savedArray
    li.setAttribute("data-index", 0);
    var button = document.createElement("button"); //maybe another button to go to link
    button.textContent = "Delete ❌";
    li.appendChild(button);
    savedList.appendChild(li);
}
}


function init() {
  // Get stored todos from localStorage
  var storedLinks = JSON.parse(localStorage.getItem("savedArray"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedLinks !== null) {
    savedArray = storedLinks;
  }

  // This is a helper function that will render todos to the DOM
  renderLinks();
}
init();


// Add click event to todoList element
savedList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    savedArray.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeLinks();
    renderLinks();
  }
});
/*
todo:
1. logic is good we have all we need from the api's but now we need to make the functions work with inputs
2. make data come out on the page pretty
*/