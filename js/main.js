                      
 
//listenfor from Sub,it
document.getElementById('myForm').addEventListener('submit', saveBookMark)

// save Bookmark
function saveBookMark(e){

    console.log(e.target.id);
    
    //Get form values
     var siteName = document.getElementById('siteName').value
     var siteUrl = document.getElementById('siteUrl').value


     if(!validateForm(siteUrl, siteName)){
         return false;
     }
     var bookmark = {
         name: siteName,
         url: siteUrl
     }
/*
     //Local Storage Test
     localStorage.setItem('test', "Hello World")
     console.log(localStorage.getItem('test'));
     localStorage.removeItem('test')
     console.log(LocalStorage.getItem('test'));
     */
    
    
     if(localStorage.getItem('bookmarks') === null){
       //Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
           // set to localStorage
           localStorage.setItem('bookmarks', JSON.stringify(bookmarks))  
           
     }else{
         //Get boolmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    //Add bookmark to Array
    bookmarks.push(bookmark);
    //Re-set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
     }

        //Clear form
        document.getElementById('myForm').reset();


     //Re-fetch bookmarks
     fetchBookmarks();


    //Prevent from from submitting
    e.preventDefault(); 
}

//Delete book mark
function deleteBookmark(url){
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through Bookmarks
    for(var i = 0; i< bookmarks.length; i++){
        if(bookmarks[i].url == url){
              //Remove from array
              bookmarks.splice(i,1);

        }
    }
    //Re-set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

     //Clear form
     document.getElementById('myForm').reset();


    //ReFetch bookmarks
    fetchBookmarks();
}

//Fetch bookmark
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   //Get output id
   var bookmarksResult = document.getElementById('bookmarksResults');

   //Bulid Output
   bookmarksResults.innerHTML = '' 
   for(var i = 0; i< bookmarks.length; i++){
   var name = bookmarks[i].name
   var url = bookmarks[i].url

   bookmarksResult.innerHTML += '<div class = "well">'+
                                '<h3>'+name+
                                '<a class= "btn btn-default "target="_blank" href ="'+url+'">Visit</a> '+
                                '<a onclick = "deleteBookmark(\''+url+'\')"  class= "btn btn-danger " href ="#">Delete</a> '
                                '</h3>'+
                                '</div>'

   } 
}

function validateForm(siteUrl, siteName){
    if(!siteName || !siteUrl){
        alert('Please fill the form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Use a valid Url')
        return false;
    }
    return true;
}