# Import necessary modules
from flask import Flask, jsonify, request
from flask_cors import CORS

import boto3
from botocore.exceptions import ClientError



# Create a Flask app instance
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the app
CORS(app)

def get_secret():

    secret_name = "OpenWeatherAPI"
    region_name = "eu-west-2"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    secret = get_secret_value_response['SecretString']

# Create a route '/weather' that accepts GET requests
@app.route('/weather', methods=['GET'])
def get_weather():
    # Get the API key from AWS Secrets Manager
    api_key = get_api_key()

    if not api_key:
        return jsonify({"error": "Failed to retrieve API key"}), 500

    # Get the 'city', 'lat', and 'lon' parameters from the request query string
    city = request.args.get('city')
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    # Based on the parameters provided, construct the appropriate URL for the OpenWeatherMap API
    if city:
        URL = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
    elif lat and lon:
        URL = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"
    else:
        # Return an error response if required parameters are missing
        return jsonify({"error": "Missing city or lat/lon parameters"}), 400

    # Make a GET request to the OpenWeatherMap API using the constructed URL
    response = requests.get(URL)

    # Return the JSON response from the API
    return jsonify(response.json())

# Run the Flask app if this script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
