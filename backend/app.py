from flask import Flask, request
from flask_restful import Resource, Api
import model

app = Flask(__name__)
api = Api(app)

hate_model = model.Model()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

class HateDetection(Resource):
    def put(self):
        text = request.get_json()['text']
        # have some clean_text in model.py, not there rn though
        prediction = hate_model.predict(text)

        return {'hate_detected': bool(prediction['result']), 'keywords': prediction['keywords']}


api.add_resource(HateDetection, '/hate_detection')

if __name__ == '__main__':
    app.run(debug=True)
