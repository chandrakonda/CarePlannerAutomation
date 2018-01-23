import { FrameworkComponent } from '../../../frameworkComponent';
import { SpecFile, Data, TestCase, TestBase, APILibraryController, Pages, TaskSeries, Product } from  '../../../applicationcomponent'
import { browser } from 'protractor';
import { DataReader } from '../../../dataComponent/dataReaderHelper';

let productTaskList, productTaskList1, startPosition:number, endPosition:number, taskOccurrenceCount:number;
let taskUpdateStatus:string[] = ["Planned","Completed","Skipped","Canceled"];
let occurrenceDetails:TaskOccurreceDetails;

describe('add a multi series product and schedule a task for a specific series', () => {

    describe('single occurrence', async() => {
        let specFileData: SpecFile;
        let __data: Data;
        let __testCase: TestCase;
        let __dataReader : DataReader;
        beforeAll( () => {    
            specFileData = new SpecFile();
            __dataReader = new DataReader();
            __data = new Data();
            specFileData.Data = __data;
            specFileData.UserData  = __dataReader.loadJsonData('optionalProduct.data');
            FrameworkComponent.logHelper.info(specFileData.UserData);
            specFileData.TestCases = new Array<TestCase>();
            
        });

        afterAll( () => {
            TestBase.GlobalData.SpecFiles.push(specFileData);
            startPosition = 0;
            endPosition = 0;
            taskOccurrenceCount = 0;
            productTaskList = '';
            browser.Taskseriesname = '';
        });

        beforeEach(()=> {
            __testCase = new TestCase();          
        });

        afterEach(()=> {
            FrameworkComponent.logHelper.info("TestCase Data " + __testCase.TestName);
            specFileData.TestCases.push(__testCase);
        });

        it('Data set up and client pet details' , async () => {
            try {
                __testCase.TestName = 'API Calls for scheduling a task in careplanner';
                await APILibraryController.careplannerLibrary.apiTestDataSetUpWithDefaultData(specFileData);   

            } catch (error) {
                __testCase.TestResult = 'Fail';
                __testCase.ExceptionDetails = error;
            }
        });


        it('should validate the product category and list of tasks for the category', async () => {
            
            __testCase.TestName = "Verifying the Category count and product task list";

            //Verify the Category Count
            await expect(Pages.cpSchedulerPage.categoryCount).toEqual(4);
    
            //Verify the Task Count
            await expect(Pages.cpSchedulerPage.productTaskListCount).toEqual(7);

            productTaskList = getProductTaskList(await Pages.cpSchedulerPage.productTaskList); 
        });
        
        it('schedule and verify the task', () => {

            //Schedule a task from the user input data
            specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {
                
                __testCase.TestName = 'Schedule the task for the task series "'+ taskSeriesInfo.taskSeriesName +'"';
                await Pages.cpSchedulerPage.ScheduleTaskWithObservations(taskSeriesInfo);

            });
        });

        it('verify the task occurrence count and status', ()=> {

            specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {

                __testCase.TestName = 'Verifying the occurrence info of the scheduled task for the task series : "'+ taskSeriesInfo.taskSeriesName +'"';

                let _taskIndex = productTaskList.indexOf(taskSeriesInfo.taskSeriesName);
                    
                //Get the Row Index Details based on the Task Details
                setPosition(_taskIndex);

                //Verify the number of task occurrences created
                await Pages.cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, taskSeriesInfo.expectedNumberOfTaskOccurrences)
            
                //Verify the status of the created Occurrences
                await Pages.cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, taskSeriesInfo.actualOccurrenceStatus);
            });
        });
           
       
        it('complete the occurrence', async () => {

            specFileData.UserData.TaskSeries.forEach(async taskSeriesInfo => {

                __testCase.TestName = 'Edit and update the task occurrence for the task series : "'+ taskSeriesInfo.taskSeriesName +'"';

                //Click on the task occurrence to bring up the edit task occurrence popup
                await Pages.cpSchedulerPage.clickOnOccurrenceByIndex(startPosition, endPosition, taskSeriesInfo.occurrenceIndex);
                await browser.sleep(1000);

                //Edit & Update the status of the task occurrence
                await Pages.cpTaskOccurrencePopup.updateOccurrenceDetailsWithObservations(taskUpdateStatus[1], taskSeriesInfo);
                await browser.sleep(7000);

                //Verify the task occurrence status after completing
                await Pages.cpSchedulerPage.verifyTheStatusOfTaskOccurrenceUpdatedByIndex(startPosition, endPosition, taskSeriesInfo.occurrenceIndex,taskSeriesInfo.expectedOcurrenceStatus[taskSeriesInfo.occurrenceIndex]);

            });           
        });
    });

    function setPosition(_taskIndex){
        
        //Get the order index of the task name from the product list independent of category
        //Set the Start & End Position for the task series (row range) per task
        if(_taskIndex == 0){ 
            startPosition = 1 ;
            endPosition = 24;
        } else if(_taskIndex >= 1){
            startPosition =  _taskIndex * 24 + 1;
            endPosition = startPosition + 23; 
        } else {
            //fail test as product list not identified
        }
    }

    function getProductTaskList(__prdTaskList:any):any  {    
        for (let index = 0; index < __prdTaskList.length; index++) {
            __prdTaskList[index] = __prdTaskList[index].split('-')[0].trim(); 
        }
        return __prdTaskList;
    }

    function sampleTaskObservation(){
        it('task observation details',async ()=>{
            await Pages.cpTaskSchedulerPopup.expandTaskObservation();

            await Pages.cpTaskSchedulerPopup.IsTaskObservationExpanded();

            await Pages.cpTaskSchedulerPopup.unselectTaskObservationByName('Temp');

            await Pages.cpTaskSchedulerPopup.unselectTaskObservationByName('CRT');

            await Pages.cpTaskSchedulerPopup.closeTaskSchedulerPopup();
        })
    }

    function scheduleTask(taskSeries){
       
        it('Schedule task ',async () =>{
             //Schedule the Task Occurrence with the Occurrence Details
            await Pages.cpTaskSchedulerPopup.scheduleTaskOccurrence(occurrenceDetails);
            await browser.sleep(5000);

            //Get the task index to set the row index
            let _taskIndex = productTaskList.indexOf(taskSeries.taskSeriesName);
            
            //Get the Row Index Details based on the Task Details
            await setPosition(_taskIndex);

            //Verify the number of task occurrences created
            await Pages.cpSchedulerPage.verifyTheNumberOfTaskOccurrenceCreated(startPosition, endPosition, taskSeries.expectedNumberOfTaskOccurrences)

            //Verify the status of the created Occurrences
            await Pages.cpSchedulerPage.verifyTheStatusOfTaskOccurrenceCreated(startPosition, endPosition, taskSeries.actualOccurrenceStatus);
        })
    }
});