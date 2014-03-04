### Polling
#### Where we ask if we're there yet...a lot

### Helpful functions
`window.setInterval`[https://developer.mozilla.org/en-US/docs/Web/API/Window.setInterval]


### Getting started
Greetings weary travelers.  At this point you've posted your data to the server but would like to have it update the page, not just alert us.

Let's write a function that sends an ajax get request to our backend and log the response out to the console. This should go into `static/js/app.js` in the document.ready function.


````javascript

var getListsFromServer = function() {
    $.ajax({
            url:'/todo_lists/poll',
            method: "GET"
        }).done(function(data){
            console.log(data);
        });
}

````

Now, let's setup our interval timer to poll the server for our todo lists every 20 seconds. This code should go right after our getListsFromServer function.

````javascript
// Poll the server every 20 seconds
setInterval(getListsFromServer, 20000); 

````

Save your files and reload the browser. Now every 20 seconds, you will get a console.log with a bunch of html for the lists.  

Mini Assignment:
Modify the getListsFromServer function to add the list names to the list of lists instead of logging the output.

Save your files, refresh your browser. Open a new browser window to the list app side-by-side with your first window. Start creating a bunch of new lists in one window. Every 20 seconds, you'll see the other windows todo lists update. Awesome!
