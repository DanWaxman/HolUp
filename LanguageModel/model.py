#### TartanHacks 2021 ####
import tensorflow as tf
import tensorflow_hub as hub
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_curve, auc, f1_score, confusion_matrix
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from imblearn.over_sampling import RandomOverSampler
import tensorflow_text

metoo_df = pd.read_csv('MeTooHate.csv')
metoo_df['label'] = metoo_df['category']

toxic_df = pd.read_csv('train.csv')
toxic_df['label'] = toxic_df[['severe_toxic', 'identity_hate']].max(axis=1)
toxic_df['text'] = toxic_df['comment_text']

df = pd.concat([metoo_df[['text', 'label']], toxic_df[['text', 'label']]])
print(df.head())
print(df.describe())
print(df.info())

xtrain, xtest, ytrain, ytest = train_test_split(df['text'],
                                                df['label'],
                                                test_size=0.20,
                                                random_state=42)

train_selection = ~(xtrain.isna() | ytrain.isna())
test_selection = ~(xtest.isna() | ytest.isna())
xtrain = xtrain[train_selection].values.reshape(-1, 1)
xtest = xtest[test_selection].values.reshape(-1, 1)
ytrain = ytrain[train_selection].values.astype(np.int)
ytest = ytest[test_selection].values.astype(np.int)

xtrain, ytrain = RandomOverSampler().fit_resample(xtrain, ytrain)

text_input = tf.keras.layers.Input(shape=(), dtype=tf.string)
preprocessor = hub.KerasLayer(
    "https://tfhub.dev/tensorflow/bert_en_uncased_preprocess/3")
encoder_inputs = preprocessor(text_input)
encoder = hub.KerasLayer(
    "https://tfhub.dev/tensorflow/small_bert/bert_en_uncased_L-4_H-256_A-4/1",
    trainable=True)
outputs = encoder(encoder_inputs)
pooled_output = outputs["pooled_output"]      # [batch_size, 256].
sequence_output = outputs["sequence_output"]  # [batch_size, seq_length, 256].
embedding_model = tf.keras.Model(text_input, pooled_output)
xtrain = embedding_model.predict(xtrain)
xtest = embedding_model.predict(xtest)

x_val = xtrain[:12000]
partial_x_train = xtrain[12000:]

y_val = ytrain[:12000]
partial_y_train = ytrain[12000:]

# we can also have dropout layers.
model = tf.keras.Sequential()
model.add(tf.keras.layers.Dense(512, activation='relu'))
model.add(tf.keras.layers.Dropout(0.4))
model.add(tf.keras.layers.Dense(256, activation='relu'))
model.add(tf.keras.layers.Dropout(0.4))
model.add(tf.keras.layers.Dense(32, activation='relu'))
model.add(tf.keras.layers.Dropout(0.3))
model.add(tf.keras.layers.Dense(1))


model.summary()
model.compile(optimizer='adam',
              loss=tf.losses.BinaryCrossentropy(from_logits=True),
              metrics=[tf.metrics.BinaryAccuracy(threshold=0.0, name='accuracy')])
print('Starting training')
history = model.fit(partial_x_train,
                    partial_y_train,
                    epochs=20,
                    batch_size=1024,
                    validation_data=(x_val, y_val),
                    verbose=1)

model.save_weights("model.h5")
y_pred_train = model.predict(xtrain[:10000]).ravel()
y_pred_test = model.predict(xtest[:10000]).ravel()
fpr_train, tpr_train, thresholds_train = roc_curve(
    ytrain[:10000], y_pred_train)
fpr_test, tpr_test, thresholds_test = roc_curve(ytest[:10000], y_pred_test)
auc_score_train = auc(fpr_train, tpr_train)
auc_score_test = auc(fpr_test, tpr_test)
print(f'AUC ROC for train: {auc_score_train:.2f}')
print(f'AUC ROC for test: {auc_score_test:.2f}')
f1_score_train = f1_score(ytrain[:10000].round(), y_pred_train)
f1_score_test = f1_score(ytest[:10000].round(), y_pred_test)
print(f'F1 Score for train: {f1_score_train:.2f}')
print(f'F1 Score for test: {f1_score_test:.2f}')
confusion_train = confusion_matrix(
    (ytrain[:10000] > 0.7), (y_pred_train > 0.7))
confusion_test = confusion_matrix((ytest[:10000] > 0.7), (y_pred_test > 0.7))


print('Confusion matrix for train:')
print(confusion_train)
print('Confusion matrix for test:')
print(confusion_test)

plt.plot([0, 1], [0, 1], 'k--')
plt.plot(fpr_train, tpr_train,
         label='Train NN Model (area = {:.3f})'.format(auc_score_train))
plt.plot(fpr_test, tpr_test,
         label='Test NN Model (area = {:.3f})'.format(auc_score_test))
plt.xlabel('False positive rate')
plt.ylabel('True positive rate')
plt.title('ROC curve')
plt.legend(loc='best')
plt.show()
