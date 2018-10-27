import { FileSystemCredentials } from "aws-sdk";

export function AddSentence(speech: string)
{
	return "<s>" + speech + "</s>";
}

export function AddBreak(second: number = 1) : string
{
	return "<break time=\"" + second + "s\"/>";
}

export function AddCount(max: number, rate: string = "slow", pitch: string = "", volumn: string = "") : string
{
	let countSpeech = "";
	for(let count = 1; count <= max; count++)
	{
		countSpeech += count.toString() + " ";
	}

	//if()
	return countSpeech;
}

export function ModifyProsody(speech: string, rate: string = "slow", pitch: string = "", volumn: string = "")
{
	return "<prosody pitch=";
}