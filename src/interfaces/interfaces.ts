export interface localTask {
  taskId: string;
  content: string;
  scheduledTime: string;
  finished: boolean;
}

export interface firebaseTask {
  userId: string;
  content: string;
  scheduledTime: string;
  finished: boolean;
}
