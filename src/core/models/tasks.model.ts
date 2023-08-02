export class Tasks {
    id: number = 0;
    UserId: number = 0;
    taskName: string = '';
    taskDesc: string = '';
    time: number = 0;
    status: statusType = 0; 
}

export enum statusType {
    NotComplated,
    Complated,
    
   
  }