export const NumberSlot = "Number";

export enum CRUDResult
{
	Success = "Success",
	Failed = "Failed",
	Exist = "Exist",
	NotExist = "Not Exist"
}

export enum TestStateEnum
{
	Starting = "Starting",
	First = "First",
	Second = "Second",
	Third = "Third",
	End = "End"
}

export enum Handler
{
	LaunchRequestHandler = "LaunchRequestHandler",
	StartDrunkTestIntentHandler = "StartDrunkTestIntentHandler",
	GoodByeIntentHandler = "GoodByeIntentHandler"
}