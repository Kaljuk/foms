
// Server setup
const express = require('express');
const app     = express();
const server  = app.listen(1337, () => {console.log("Listening on port 1337")});

const bodyParser = require('body-parser');

// // My Modules
// Alexa custom module
const alexa = require("./Modules/alexaCommunication");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(alexa.validation);


// FOMS Homepage
app.get('/', (req, res) => {

})

const launchResponse = {
    "version": "1.0",

    "response": {
        "outputSpeech": {
            "type": "PlainText",
            "text": "Hello, Erik, normal response, test 1 2 3",
            "ssml": "<speak>Hello, Erik, normal response, test 1 2 3</speak>"       
        },
        "reprompt": {
        "outputSpeech": {
            "type": "PlainText",
            "text": "Hello, again, Erik, normal response, test 1 2 3",
            "ssml": "<speak>Hello, again, Erik, normal response, test 1 2 3</speak>"
        }
        },
        "shouldEndSession": true
    },
    "card": {
        "type": "Simple",
        "title": "test Card",
        "content": "This is just some testing text.\nAnd this should be another row of testing text."
    },
};

const intentResponse = {
    "version": "1.0",

    "response": {
        "outputSpeech": {
            "type": "PlainText",
            "text": "Hello, Erik, the fridge includes some vodka and half a bottle of milk, would you like some?",
            "ssml": "<speak>Hello, Erik, the fridge includes some vodka and half a bottle of milk, would you like some?</speak>"       
        },
        "reprompt": {
        "outputSpeech": {
            "type": "PlainText",
            "text": "Hello, again, Erik, normal response, test 1 2 3",
            "ssml": "<speak>Hello, again, Erik, normal response, test 1 2 3</speak>"
        }
        },
        "shouldEndSession": true
    },
    "card": {
        "type": "Simple",
        "title": "Fridge contents",
        "content": "This is just some testing text.\nAnd this should be another row of testing text."
    },
};

app.post('/', (req, res) => {
    // Set response content type
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    console.log(`[POST-IN]<Req.body> : ${JSON.stringify(req.body, null, 2)}`);
    let response = {content: "none"};
    if (req.body.request.type == "IntentRequest") {
        response = intentResponse;
    } else {
        response = launchResponse;
    }
    res.json(response);
})