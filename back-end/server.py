from flask import Flask, url_for, Response
from crawler import crawl
import json
app = Flask(__name__)

@app.route('/')
def index():
    return '<p>Hello!</p>\n'

@app.route('/product/<product_name>', methods = ['GET'])
def query(product_name):
    data = json.dumps(crawl(product_name))
    resp = Response(data, status=200, mimetype='application/json')
    return resp

if __name__ == "__main__":
    app.run()
