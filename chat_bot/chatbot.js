'use strict'
const dialogFlow = require('dialogflow');
const structjson = require('./structjson')
const config = require('../config/keys');

const projectID = config.googleProjectID;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
};

// https://github.com/googleapis/nodejs-dialogflow

const sessionClient = new dialogFlow.SessionsClient({projectID, credentials});

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);


module.exports = {
    textQuery: async function(respondent_text, parameters={}){
        let self = module.exports;
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: respondent_text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },
    
    
    eventQuery: async function(respondent_event, parameters={}){
        let self = module.exports;
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: respondent_event,
                    parameters: structjson.jsonToStructProto(parameters),
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };
        
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },
    
    
    handleAction: function(responses){
        return responses;
    }
}

