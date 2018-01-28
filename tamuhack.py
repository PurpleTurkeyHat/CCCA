#time, location
import tweepy
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from geopy.geocoders import Nominatim
import http.client

access_token = "937000559843987463-DgmKxkTMnHmwRqFNKPISh4OWcupFRtH"
access_token_secret = "VYJI7K4QMd65hUg2bfoNoFDSDdG3c43vPjUSZ8Rysox1a"
consumer_key = "Vlqd8jWbRFEQx3wCLlGvkGz3E"
consumer_key_secret = "BoTIT6r6QORMCcamSyvzgS9aJ6zlDL8GUaMPqxzUQzPQYC0VMX"

disasters = ('flood', 'earthquake', 'wildfire', 'tornado', 'hurricane', 'tsunami', 'avalanche', 'wild fire', 'forest fire')
# with open("output.txt", "a") as myfile:
#  myfile.write('lat, long, time, tag\n')

class StdOutListener(StreamListener):
 
    def on_status(self, status):
        tweet = status.text
        add = True

        if (status.coordinates or status.place) and ((status.coordinates is not None) or (status.place is not None)):
            geolocator = Nominatim(scheme='http', timeout = 10)
            if status.coordinates:
                val = list(status.coordinates.values())
                coord = str(val[1])
            elif status.place:
                loc = geolocator.geocode(status.place.full_name)
                if loc is not None:
                    coord = (repr(loc.longitude) + ',' + repr(loc.latitude))
                else:
                    add = False

            tag = 'IGNORE'
            for dis in disasters:
                if dis in tweet:
                    tag = dis

            if add and tag is not 'IGNORE':

                with open("output.txt", "a") as myfile:
                    result = coord[1:-1] + ',' + str(status.created_at) + ',' + tag + '\n'
                    myfile.write(result)
        return True

    def on_error(self, status_code):
        print('Error: ' + str(status_code))
        return True
 
    def on_timeout(self):
        print('Timeout')
        return True
 
if __name__ == '__main__':
    listener = StdOutListener()
    auth = tweepy.OAuthHandler(consumer_key, consumer_key_secret)
    auth.set_access_token(access_token, access_token_secret)
    stream = Stream(auth, listener)
    stream.filter(track=['flood', 'earthquake', 'wildfire', 'tornado', 'hurricane', 'tsunami', 'avalanche', 'wild fire', 'forest fire'])
