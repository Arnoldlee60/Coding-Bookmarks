fetch('http://api.linkpreview.net/?key=123456&q=https://www.google.com', 
    {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.description);
      });