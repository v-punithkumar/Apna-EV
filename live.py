import random
import string

from json import dumps

from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

def generate_random_string(length):
    # Define the characters to choose from
    characters = string.ascii_lowercase + string.digits + '-'
    
    # Generate the random string
    random_string = ''.join(random.choice(characters) for _ in range(length))
    
    return random_string

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/pois'
mongo = PyMongo(app)

# Add CORS support
CORS(app)  # This will allow all origins
# or
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:8100"}})  # For a specific origin
# lo

@app.route('/api/pois', methods=['POST'])
def store_poi():
    poi_data = request.get_json()

    new_poi = {
        'ID': generate_random_string(24),
        'UUID': poi_data['UUID'],
        'DataProviderID': poi_data['DataProviderID'],
        'OperatorID': poi_data['OperatorID'],
        'UsageTypeID': poi_data['UsageTypeID'],
        'UsageCost': poi_data['UsageCost'],
        'NumberOfPoints': poi_data['NumberOfPoints'],
        'GeneralComments': poi_data['GeneralComments'],
        'DatePlanned': poi_data['DatePlanned'],
        'StatusTypeID': poi_data['StatusTypeID'],
        'SubmissionStatusTypeID': poi_data['SubmissionStatusTypeID'],
        'DataQualityLevel': poi_data['DataQualityLevel'],
        'DateCreated': poi_data['DateCreated'],
        'AddressInfo': poi_data['AddressInfo'],
        'Connections': poi_data['Connections'],
        'MetadataValues': poi_data['MetadataValues']
    }

    pois = mongo.db.pois
    result = pois.insert_one(new_poi)

    return jsonify({'message': 'POI stored successfully', 'id': str(result.inserted_id)})
#adding the fetching api

@app.route('/api/pois', methods=['GET'])
def get_pois():
    pois = mongo.db.pois.find()
    poi_list = []
    i = 0
    for poi in pois:
        poi['_id'] = i
        poi_list.append(poi)
        i += 1
    print(poi_list)
    # return dumps(poi_list)
    # filtered_poi_list = [obj for obj in poi_list if not obj._id]
    return jsonify(poi_list)

if __name__ == '__main__':
    app.run(debug=True)