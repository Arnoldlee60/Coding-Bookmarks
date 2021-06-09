fetch('http://api.stackexchange.com/2.2/tags/{tags}/related?site=stackoverflow', 
    {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for(var i = 0 ; i < 30; i++)
        {
        //console.log(data.items[i].name);
        }
      });//languages


fetch('http://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow', 
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
        for(var i = 0 ; i < 30; i++)
        {
        //console.log(data);
        }
      }); //
      
fetch('http://api.linkpreview.net/?key=6183f2f21f3a5da93aa0c053ff2a7356 &q=https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon', 
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
      }); //link preview creator 


var url = "https://www.youtube.com/watch?v=jNQXAC9IVRw"; //placeholder
function createYouTubeEmbedLink (url) {
    return url.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
    }


    fetch('http://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=javascript&intitle=how do you make a for loop&site=stackoverflow', 
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
        //console.log(data.url)
       // console.log(data.description)
      }); 
/*


*/

