#time, location
import tweepy
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from geopy.geocoders import Nominatim

access_token = "937000559843987463-DgmKxkTMnHmwRqFNKPISh4OWcupFRtH"
access_token_secret = "VYJI7K4QMd65hUg2bfoNoFDSDdG3c43vPjUSZ8Rysox1a"
consumer_key = "Vlqd8jWbRFEQx3wCLlGvkGz3E"
consumer_key_secret = "BoTIT6r6QORMCcamSyvzgS9aJ6zlDL8GUaMPqxzUQzPQYC0VMX"

#disasters = ('flood', 'earthquake', 'wildfire', 'tornado', 'hurricane', 'tsunami', 'avalanche')
disasters = ('love', 'flood')

class StdOutListener(StreamListener):
 
    def on_status(self, status):
        tweet = status.text

        if status.coordinates or status.place:
            geolocator = Nominatim()
            if status.coordinates:
                val = list(status.coordinates.values())
                coord = val[1]
                print(val[1])
            elif status.place:
                loc = geolocator.geocode(status.place.full_name)
                print(loc)
                coord = ('[' + repr(loc.longitude) + ', ' + repr(loc.latitude) + ']')

            for dis in disasters:
                #if dis in tweet:
                with open("%s.txt" % dis, "a") as myfile:
                    myfile.write(coord + ',')
        return True

    def on_error(self, status_code):
        print('Got an error with status code: ' + str(status_code))
        return True
 
    def on_timeout(self):
        print('Timeout...')
        return True
 
if __name__ == '__main__':
    listener = StdOutListener()
    auth = tweepy.OAuthHandler(consumer_key, consumer_key_secret)
    auth.set_access_token(access_token, access_token_secret)
    stream = Stream(auth, listener)
    #stream.filter(track=['flood', 'earthquake', 'wildfire', 'tornado', 'hurricane', 'tsunami', 'avalanche'])
    stream.filter(track=['love'])
