# JS, the DOM, and AJAX

Requires:
- Javascript
- dom manipulation
- jQuery

Covers:
- AJAX w/ jQuery
- callbacks
- form serialization


## Getting Setup
Clone this repo from Github. Once you have the code, you can bootstrap your environment by creating a python virtual environment and installing the required packages in requirements.txt. 

````bash
virtualenv env
source env/bin/activate
pip install -r requirements.txt
python api.py
````

##  Prework
Before we get started on the assignment, there are a couple of concepts to work on first. 

Let's start by exploring how to send data to the server. Take a look at `post.md`

https://github.com/hackbrightacademy/Javascript3/blob/master/post.md

Now that we've started sending data to our server, we want to have the page update the list of lists. We can accomplish this with a technique called polling.

https://github.com/hackbrightacademy/Javascript3/blob/master/polling.md


## Assignment:

Delete the setInterval function. We aren't going to be polling the server anymore.

Currently our POST handlers will redirect a user after they create a new record. Instead we want to return rendered html to the browser. Replace the handler code for creating a new todo item (/todo_lists/<int:id>) with the below handler.

````python

@app.route('/todo_lists/<int:id>', methods=["POST"])
def todo_item_create(id):
    # Create a new todo_item
    todo_item_table.insert(dict(task=request.form.get("task"), todo_list_id=id, done=False))    

    # return all of the items for a given list
    items = todo_item_table.find(todo_list_id=id)
    items = [x for x in items]
    return render_template("todo_items_partial.html", items=items)
    
````

Also replace the handler for creating a new list.

````python

@app.route('/', methods=['POST'])
def index_post():
    # create a new list
    list_name = request.form.get('todo_list_name')
    todo_lists.insert(dict(list_name=list_name))
    
    # return all of the lists (including our new one)
    results = todo_lists.all()
    lists = [l for l in results]
    return render_template("todo_list_partial.html", lists=lists)
````

Create Todo lists using the jquery ajax function
- Clicking the submit button should post a new todo list to the server using `$.ajax`.  
- update the list of lists using the ajax done event
- the page should not reload

Create Todo items using the jquery ajax function
- Clicking the submit button should post a new todo item to the server using `$.ajax`.  
- update the list of items using the ajax done event
- the page should not reload

Remove the page refresh that happens when clicking on a list name.
- clicking on a list name should clear the list of lists and replace it with the list of todo items.
- Add a button for the user to go back to the list of lists

For these next two, you'll need to write some python in addition to javascript. Feel free to modify the html at this point to finish this assignment.

Add the ability to mark a todo item as done.
- add an event to the checkboxes so clicking a checkbox marks that item as done(via an ajax request)
- write a flask handler that accepts post requests
- the route should be `/todo_lists/<int:list_id>/todo_item/<int:item_id>/done`
- the flask handler should return the list of items rendered in `todo_items_partial.html`.
- the ajax `done` event should update the list

To handle the database update, you will find https://dataset.readthedocs.org/en/latest/api.html#dataset.Table.update to be helpful.

Add the ability to delete todo lists and todo items.
- add a button next to each item / list that triggers a click event to send a post request to the server
- write two more flask handlers that accept post requests
- the routes should be `/todo_lists/<int:list_id>/delete` and `/todo_lists/<int:list_id>/todo_item/<int:item_id>/delete` respectively. 
- after deleting the list or item, the handler should the relevant rendered *_partial.html tempalte to the browser so it can update the page.
- the ajax `done` event should update the list


To handle the database delete, you will find https://dataset.readthedocs.org/en/latest/api.html#dataset.Table.delete helpful.





## Bonus:
- make the lists sortable(by id or alphabetically)
- add support to reorder items in the todo list
- add bootstrap / styling

