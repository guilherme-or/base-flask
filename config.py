# import os

# basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # SECRET_KEY = os.environ.get('SECRET_KEY')
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')\
    #     or 'sqlite:///' + os.path.join(basedir, 'app.db')
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'secret'
    SQLALCHEMY_DATABASE_URI = \
    '{SGBD}://{usuario}:{senha}@{servidor}/{database}?collation=utf8mb4_general_ci'.format(
        SGBD = 'mysql+mysqlconnector',
        usuario = 'root',
        senha = '',
        servidor = 'localhost',
        database = 'example'
    )