//listen for form submit
document.getElementById('myform').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('sitename').value;
    //console.log(siteName);
    var siteUrl = document.getElementById('siteurl').value;
    //console.log(siteUrl);
    if(!siteName || ! siteUrl){
      alert('Please fill in the box!');
      return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
      alert('Please use a valid url');
      return false;
    }
    var bookmark={
      name: siteName,
      url: siteUrl
    }
    //console.log(bookmark);

    /*
    //local storage
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    //Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
      //Init array
      var bookmarks = [];
      // Add to array
      bookmarks.push(bookmark);
      //Set to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
      //fetch from local storage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      //Add bookmark to array
      bookmarks.push(bookmark);
      //Reset back to local storage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
    document.getElementById('myform').reset();
    fetchBookmarks();
    //Prevent form from submitting
    e.preventDefault();
}
  //Delete bookmarks
function deleteBookmark(url){
    //Get bookmarks from local
    console.log(url);
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i< bookmarks.length;i++){
      if(bookmarks[i].url == url)
      {
        bookmarks.splice(i,1);
      }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

  //fetch bookmarks
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Get ouput id
  var bookmarkResults = document.getElementById('bookmarksResults');
  //Build output
  bookmarkResults.innerHTML = '';
  for(var i = 0; i< bookmarks.length;i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="well">'+
                                '<h3>'+name+
                                ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                '</h3>'+
                                '</div>';
  }
  }
