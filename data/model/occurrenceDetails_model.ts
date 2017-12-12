interface TaskOccurreceDetails{
    frequency:string;
    scheduleStartTime:number;
    scheduleStartDate:string;
    scheduleEndTime:number;
    scheduleEndDate:string;
    repeatHours:number;
    taskInstructions:string;
}

enum OccurrenceFrequency{
    Once,
    Recurring,
}