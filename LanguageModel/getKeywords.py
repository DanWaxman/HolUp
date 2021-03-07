import json
import re
import pandas as pd

# Takes in text and returns resultDict, final no-definition set,
# and whether there are any offensive words.
def getKeyWords(text):
    with open("largeHateWords.json") as f:
        json1_data = json.loads(f.read())
    df = pd.read_csv("negative.csv")
    newText = text.lower()
    newText = re.sub(r'<[^<]+?>','', newText)
    # only alphabetical
    newText = re.sub(r'[^a-z]', ' ', newText)
    newText = ' '.join(newText.split())
    lowerKeys = [s.lower() for s in json1_data.keys()]
    nonCleanText = set(filter(lambda s: s in text.split(), lowerKeys))
    cleanText = set(filter(lambda s: s in newText.split(), lowerKeys))
    finalSet = (nonCleanText.union(cleanText))
    hateWordSetNoDefn = set(filter(lambda s: (s in cleanText) or (s in nonCleanText),
                df["ngram"]))
    finalNoDefnSet  = (hateWordSetNoDefn).difference(finalSet)
    resultDict = dict()
    for val in finalSet:
        capitalized = val[0].upper() + val[1:]
        resultDict[capitalized] = json1_data[capitalized]
    return resultDict, finalNoDefnSet

print(getKeyWords("how do I that"))
