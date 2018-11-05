import * as Alexa from 'ask-sdk';

import { services, IntentRequest } from "ask-sdk-model";

// Helper
import { Handler, NumberSlot, TestStateEnum } from "./Constant";
import { AddBreak, AddCount, ModifyProsody } from './SpeechHelper';
import { ConfigBase } from 'aws-sdk/lib/config';
import { addListener } from 'cluster';

var request = require('request-promise');

const LaunchRequestHandler = {
	canHandle(handlerInput: Alexa.HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	async handle(handlerInput: Alexa.HandlerInput) {
		var speechText = "";
		
		speechText += "Hi There, having fun? Now are you ready for the drunk test?";

		handlerInput.attributesManager.setSessionAttributes(
			{
				TestState: TestStateEnum.One,
				YesHandler: Handler.StartDrunkTestIntentHandler,
				NoHandler: Handler.GoodByeIntentHandler
			}
		);

		return handlerInput.responseBuilder
			.speak(speechText)
			.withShouldEndSession(false)
			.getResponse();
	}
};

const StartDrunkTestIntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
			&& handlerInput.requestEnvelope.request.intent.name === 'GetNumberStoryIntent';
	},
	async handle(handlerInput: Alexa.HandlerInput) {
		let speechText = '';
		let testState = TestStateEnum.Starting;
		let yesHandler = Handler.StartDrunkTestIntentHandler;

		switch(handlerInput.attributesManager.getSessionAttributes().TestState)
		{
			case TestStateEnum.Starting:
				speechText += "Are you ready for the drunk test";
				testState = TestStateEnum.First;
				break;
				
			case TestStateEnum.First:
				speechText += "Alright, first test, go a head and find an open space. ";
				speechText += AddBreak(4);
				speechText += "Now that you are at the open space, start steping 10 steps forward on a single line following my count. ";
				speechText += AddCount(10);
				speechText += "How are you now? Are you ready for the second test? ";

				testState = TestStateEnum.Second;
				break;

			case TestStateEnum.Second:
				speechText += "For second test, stand up straight raise your hand horizontally. ";
				speechText += AddBreak(2);
				speechText += "I will say left or right, and you will bring your corresponded hand and touch your nose. ";
				speechText += ModifyProsody("Ready?", "high", "loud");
				speechText += "How are you now? Are you ready for the second test? ";

				testState = TestStateEnum.Third;
				break;
			
			case TestStateEnum.Third:
				speechText += "For second test, stand up straight raise your hand horizontally. ";
				speechText += AddBreak(2);
				speechText += "I will say left or right, and you will bring your corresponded hand and touch your nose. ";
				speechText += ModifyProsody("Ready?", "high", "loud");
				speechText += "How are you now? Are you ready for the second test? ";

				testState = TestStateEnum.End;
				break;
		}

		handlerInput.attributesManager.setSessionAttributes(
			{
				TestState: testState,
				YesHandler: yesHandler,
				NoHandler: Handler.GoodByeIntentHandler
			}
		);

		return handlerInput.responseBuilder
			.speak(speechText)
			.withShouldEndSession(false)
			.getResponse();
	}
};

const HelpIntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
			&& handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput: Alexa.HandlerInput) {
		let speechText = "This skill will ";

		speechText += "What number do you want to learn about today?";

		handlerInput.attributesManager.setSessionAttributes(
			{
				YesHandler: Handler.StartDrunkTestIntentHandler,
				NoHandler: Handler.GoodByeIntentHandler
			}
		);

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withShouldEndSession(false)
			.getResponse();
	}
};

const CancelAndStopIntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
			&& (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
				|| handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
	},
	handle(handlerInput: Alexa.HandlerInput) {
		const speechText = 'Be safe, do not drink and drive!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard(speechText, speechText)
			.getResponse();
	}
};

const YesIntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
			&& (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent');
	},
	handle(handlerInput: Alexa.HandlerInput) {
		let sessionAttributes =  handlerInput.attributesManager.getSessionAttributes();

		switch(sessionAttributes.YesHandler)
		{
			case Handler.StartDrunkTestIntentHandler:
				return StartDrunkTestIntentHandler.handle(handlerInput);
			default:
				var speechText = "Sorry! We encounter a problem.";

				return handlerInput.responseBuilder
				.speak(speechText)
				.getResponse();
		}
	}
};

const NoIntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
			&& (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent');
	},
	handle(handlerInput: Alexa.HandlerInput) {
		let sessionAttributes =  handlerInput.attributesManager.getSessionAttributes();

		switch(sessionAttributes.NoHandler)
		{
			case Handler.GoodByeIntentHandler:
				return GoodByeIntentHandler.handle(handlerInput);
			default:
				var speechText = "Sorry! We encounter a problem.";

				return handlerInput.responseBuilder
				.speak(speechText)
				.getResponse();
		}
	}
};

const SessionEndedRequestHandler = {
	canHandle(handlerInput: Alexa.HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput: Alexa.HandlerInput) {
		//any cleanup logic goes here

		return handlerInput.responseBuilder.getResponse();
	}
};

// Internal Handler
const GoodByeIntentHandler = {
	canHandle(handlerInput: Alexa.HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput: Alexa.HandlerInput) {
		let speechText = 'Be safe, do not drink and drive!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	}
};

// -------------------------------- Helper -------------------------------- //

// Lambda init
//var persistenceAdapterConfig = {
	//tableName: "DrunkTest",
	//partitionKeyName: "id",
	//createTable: true,
	//attributesName: undefined,
	//dynamoDBClient: undefined,
	//partitionKeyGenerator: undefined
//};

//var persistenceAdapter = new Alexa.DynamoDbPersistenceAdapter(persistenceAdapterConfig);

exports.handler = Alexa.SkillBuilders.standard()
	.addRequestHandlers(LaunchRequestHandler,
		StartDrunkTestIntentHandler,
		HelpIntentHandler,
		CancelAndStopIntentHandler,
		YesIntentHandler,
		NoIntentHandler,
		SessionEndedRequestHandler)
	//.withTableName("DrunkTest")
	//.withAutoCreateTable(true)
	.lambda(); 