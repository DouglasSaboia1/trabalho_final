
from flask_sqlalchemy import SQLAlchemy
from dotenv import dotenv_values
db = SQLAlchemy()
config = dotenv_values(".env")
url = f'{config['DRIVER']}://{config['USER']}:{config['PASSWORD']}@{config['HOST']}:{config['PORT']}/{config['DB']}'
