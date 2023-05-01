import json
from flask import Blueprint

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/')
def data():
    data = {'foo': 'bar'}
    return json.dumps(data)
