export interface TaskEntityInterface {
  id?: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class Task implements TaskEntityInterface {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
