import tensorflow as tf
import tensorflow_hub as hub
import json
import re


class Model:
    def __init__(self, threshold=0.5):
        hub_layer = hub.KerasLayer("https://tfhub.dev/google/Wiki-words-500-with-normalization/2",
                                   input_shape=[], dtype=tf.string)

        # we can also have dropout layers.
        self.model = tf.keras.Sequential()
        self.model.add(hub_layer)
        self.model.add(tf.keras.layers.Dense(512, activation='relu'))
        self.model.add(tf.keras.layers.Dropout(0.4))
        self.model.add(tf.keras.layers.Dense(256, activation='relu'))
        self.model.add(tf.keras.layers.Dropout(0.4))
        self.model.add(tf.keras.layers.Dense(32, activation='relu'))
        self.model.add(tf.keras.layers.Dropout(0.3))
        self.model.add(tf.keras.layers.Dense(1))

        self.load_weights()
        self.model = tf.keras.Sequential(
            [self.model, tf.keras.layers.Activation('sigmoid')])

        print(self.model.summary())

        self.threshold = threshold

        with open("largeHateWords.json") as f:
            self.json1_data = json.loads(f.read())

    def load_weights(self, fn='model.h5'):
        self.model.load_weights(fn)

    def predict(self, text):
        prediction = self.model.predict([text]).flatten()[0]
        keywords = self.get_keywords(text)
        print(prediction)
        print(keywords)

        result = (prediction > self.threshold) or bool(keywords)
        return {'result': result, 'keywords': keywords}

    def get_keywords(self, text):
        newText = text.lower()
        newText = re.sub(r'<[^<]+?>', '', newText)
        # only alphabetical
        newText = re.sub(r'[^a-z]', ' ', newText)
        newText = newText.split()
        lowerKeys = [s.lower() for s in self.json1_data.keys()]
        splitText = text.split()
        nonCleanText = set(filter(lambda s: s in splitText, lowerKeys))
        cleanText = set(filter(lambda s: s in newText, lowerKeys))
        resultDict = dict()
        for val in nonCleanText.union(cleanText):
            capitalized = val[0].upper() + val[1:]
            resultDict[capitalized] = self.json1_data[capitalized]
        return resultDict
