function search(){ //(description, tag) input and dropdown use onclick() to search on submit button
  var inputtedSearch = document.querySelector('#input').value;
  var inputtedTag = document.querySelector('#tags').value;
    //var tag = 'javascript'; //change to dropdown menu value
    //var description = 'Uncaught TypeError' //change to input value
    var createLink =  'http://api.stackexchange.com/2.2/search?order=desc&sort=relevance&tagged=' + inputtedSearch + '&intitle=' + inputtedTag + '&site=stackoverflow'
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
          for(var i = 0; i < 5; i++) //data.items.length
          {
            console.log(data);
            //console.log(data.items[i].link)
            //var stacklink = 'http://api.linkpreview.net/?key=6183f2f21f3a5da93aa0c053ff2a7356 &q=' + data.items[i].link;
            //console.log("Link Preview Starts here ")
            //linkPreviewCreation(stacklink)
            //onsole.log(data.description)
          }
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
  
          //console.log(data);
          console.log(data.url)
          console.log(data.description)
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



/*
todo:
1. logic is good we have all we need from the api's but now we need to make the functions work with inputs
2. make data come out on the page pretty
*/