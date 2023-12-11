import datetime
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    is_done = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow) 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    sort_by = request.args.get('sort_by')
    sort_direction = request.args.get('sort_dir')  # New parameter for sorting direction
    keyword = request.args.get('keyword')

    tasks = Task.query

    if sort_by == 'name':
        if sort_direction == 'desc':
            tasks = tasks.order_by(Task.content.desc())
        else:
            tasks = tasks.order_by(Task.content)
    elif sort_by == 'create_time':
        if sort_direction == 'desc':
            tasks = tasks.order_by(Task.created_at.desc())
        else:
            tasks = tasks.order_by(Task.created_at)
    
    if keyword:
        tasks = tasks.filter(Task.content.ilike(f'%{keyword}%'))

    tasks = tasks.all()

    task_list = [{'id': task.id, 'content': task.content, 'is_done': task.is_done, 'created_at': task.created_at.strftime("%Y-%m-%d %H:%M:%S")} for task in tasks]
    return jsonify(task_list)

@app.route('/tasks', methods=['POST'])
def add_task():
    content = request.json['content']
    new_task = Task(content=content)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task added successfully'})

@app.route('/tasks/<int:id>', methods=['DELETE', 'PUT'])
def manage_task(id):
    task = Task.query.get_or_404(id)

    if request.method == 'DELETE':
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully'})
    elif request.method == 'PUT':
        content = request.json.get('content')
        is_done = request.json.get('is_done')

        if content:
            task.content = content
        if is_done is not None:
            task.is_done = is_done

        db.session.commit()
        return jsonify({'message': 'Task updated successfully'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
