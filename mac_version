#time, location
import tweepy
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import geopy
from geopy.geocoders import Nominatim
import http.client


access_token = "937000559843987463-DgmKxkTMnHmwRqFNKPISh4OWcupFRtH"
access_token_secret = "VYJI7K4QMd65hUg2bfoNoFDSDdG3c43vPjUSZ8Rysox1a"
consumer_key = "Vlqd8jWbRFEQx3wCLlGvkGz3E"
consumer_key_secret = "BoTIT6r6QORMCcamSyvzgS9aJ6zlDL8GUaMPqxzUQzPQYC0VMX"

disasters = ('flood', 'earthquake', 'wildfire', 'tornado', 'hurricane', 'tsunami', 'avalanche', 'love')

class StdOutListener(StreamListener):
 
    def on_status(self, status):
        while True:
            try:
                tweet = status.text
                time = str(status.created_at)

                if (status.coordinates or status.place) and status != None:
                    print('loc available')
                    geolocator = Nominatim(scheme='http', timeout = 10)
                    # if status.coordinates:
                    #     val = list(status.coordinates.values())
                    #     coord = val[1]
                    #     print(val[1])
                    if status.place:
                        loc = geolocator.geocode(status.place.full_name)
                        print(loc)
                        coord = (repr(loc.longitude) + ', ' + repr(loc.latitude))
                    tag = 'IGNORE'
                    for dis in disasters:
                        if dis in tweet:
                            tag = dis
                    if status.place:
                        with open("output1.txt", "a") as myfile:
                            myfile.write(coord + ',' + time + ',' + tag + '\n')
                return True
            except http.client.IncompleteRead:
                continue

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
    stream.filter(track=['flood', 'earthquake', 'wildfire', 'tornado', 'hurricane', 'tsunami', 'avalanche', 'love'])
