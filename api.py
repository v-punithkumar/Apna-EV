from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import stripe

app = Flask(__name__)
api = Api(app)
CORS(app)

stripe.api_key = 'sk_test_51P6Gu6SA7VPhctEUt5XtVDtThjS9vQu19u4jXfXFvfqo6BSWemdceWRpvvImmtq4MNNSCiBRnHvBDGoKo1qRBEqN00ahyFBtVd'

class BookingResource(Resource):
    def post(self):
        booking_data = request.get_json()

        poi_id = booking_data.get('poiId')
        hours = booking_data.get('hours')
        total_cost = booking_data.get('totalCost')

        if total_cost is None:
            return {'error': 'Total cost is missing'}, 400

        try:
            charge = stripe.Charge.create(
                amount=int(total_cost * 100),
                currency='usd',
                description=f'Booking for POI {poi_id}',
                source=booking_data.get('token')
            )

            # Ensure charge.id is a string, which is JSON serializable
            return {'message': 'Booking successful', 'chargeId': str(charge.id)}, 200

        except stripe.error.StripeError as e:
            # Ensure that the error message is a string
            return {'error': str(e)}, 400

api.add_resource(BookingResource, '/bookings')

if __name__ == '__main__':
    app.run()
