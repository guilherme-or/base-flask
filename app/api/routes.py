import json
from flask import Blueprint, request

from .models import *

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/get', methods=['GET', 'POST'])
def get_users():
    users = []
    result = User.query.all()

    if result is None:
        return []

    for value in result:
        user = value.__dict__
        (k := next(iter(user)), user.pop(k))
        users.append(user)
    return users

@api.route('/get/<user_id>', methods=['GET', 'POST'])
def get_user(user_id):
    result = User.query.filter_by(id=user_id).first()

    if result is None:
        return {
            'ERROR': "User not found",
            'CODE': 1
        }

    user = result.__dict__
    (k := next(iter(user)), user.pop(k))

    return user

@api.route('/add', methods=['POST'])
def add_user():
    name = request.form['name']
    password = request.form['password']
    user = User(name=name, password=password)
    db.session.add(user)
    db.session.commit()
    return {'STATUS': 'User added'}

@api.route('/update', methods=['POST'])
def update_user():
    id = request.form.get('id')
    name = request.form.get('new_name')
    password = request.form.get('new_password')
    user = User.query.filter_by(id=id).first()

    if user is None:
        return {
            'ERROR': "Couldn't update, user not found",
            'CODE': 2
        }

    user.name = name
    user.password = password
    db.session.commit()

    return {'STATUS': 'User updated'}

@api.route('/delete/<user_id>', methods=['GET', 'POST'])
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return {
            'ERROR': "Couldn't delete, user not found",
            'CODE': 3
        }

    db.session.delete(user)
    db.session.commit()

    return {'STATUS': 'User deleted'}