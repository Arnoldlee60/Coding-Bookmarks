
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
    console.log(data);
    for (var i = 0; i < data.items.length; i++) {
      console.log(data.items[i].name);
    }
  }); //tags 
 
