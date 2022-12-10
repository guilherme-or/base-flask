from flask import Blueprint, render_template

site = Blueprint('site', __name__)

@site.route('/')
def index():
    return render_template('index.html')

@site.route('/users')
def users():
    return render_template('users.html')
