from flask import Flask, render_template, request, redirect, flash
import dataset

app = Flask(__name__)
app.secret_key = "Shhhhh!! Something Secret"
db = dataset.connect('sqlite:///database.db')

# Assign vars for our database tables
todo_item_table = db['todo_items']
todo_lists = db['todo_lists']

@app.route('/')
def index():
    return render_template('index.html', lists=todo_lists)

@app.route('/', methods=['POST'])
def index_post():
    # create a new list
    list_name = request.form.get('todo_list_name')

    # ASK WHAT IS HAPPENING.
    todo_lists.insert(dict(list_name=list_name))

    # return all of the lists (including our new one)
    results = todo_lists.all()
    lists = [l for l in results]
    return render_template("todo_list_partial.html", lists=lists)


    # FLASHING AND AJAX DOESN'T WORK.

    # if not list_name:
    #     flash("Please specify a list name.")
    #     return render_template("todo_list_partial.html", lists=lists)
    # else:
    #     # ASK WHAT IS HAPPENING.
    #     todo_lists.insert(dict(list_name=list_name))

    #     # return all of the lists (including our new one)
    #     results = todo_lists.all()
    #     lists = [l for l in results]
    #     flash('Todo list %s created' % list_name)
    #     return render_template("todo_list_partial.html", lists=lists)

@app.route('/todo_lists/<int:id>')
def todo_list_show(id):
    results = todo_item_table.find(todo_list_id=id)
    items = [x for x in results]
    return render_template("todo_list.html", items=items)

@app.route('/todo_lists/<int:id>', methods=["POST"])
def todo_item_create(id):
    # create a new todo_item, insert into database
    todo_item_table.insert(dict(task=request.form.get("task"), todo_list_id=id, done=False))

    # return all of the items for a given list
    # ASK WHAT IS THIS MAGIC OF .find? 
    results = todo_item_table.find(todo_list_id=id)
    items = [x for x in results]
    return render_template("todo_items_partial.html", items=items)

    # return redirect("/todo_lists/%d" % id)


@app.route('/todo_lists/poll')
def poll_for_lists():
    results = todo_lists.all()
    lists = [l for l in results]
    return render_template("todo_list_partial.html", lists=lists)


# handler for asynchronous request
# @app.route('/ajax/todo_list', methods=['POST'])
# def ajax_todo_list():
#     results = todo_lists.all()
#     lists = [l for l in results]
#     return render_template("todo_list_partial.html", lists=lists)


if __name__ == '__main__':
    app.run(debug=True)
