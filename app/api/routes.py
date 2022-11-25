import json
from flask import Blueprint, request

from .models import *

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/', methods=['POST'])
def data():
    users = []
    result = User.query.all()
    for value in result:
        user = value.__dict__
        (k := next(iter(user)), user.pop(k))
        users.append(user)
    return users