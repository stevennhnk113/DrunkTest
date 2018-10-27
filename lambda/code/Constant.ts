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
	One = "One",
	Two = "Two",
	Three = "Three"
}

export enum Handler
{
	LaunchRequestHandler = "LaunchRequestHandler",
	StartDrunkTestIntentHandler = "StartDrunkTestIntentHandler",
	GoodByeIntentHandler = "GoodByeIntentHandler"
}