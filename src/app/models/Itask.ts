export interface Task {
  editing: boolean;
  editedTask: {
    id: number;
    title: string;
    completed: boolean;
    category: string;
    dueDate: Date;
  };
  id: number;
  title: string;
  completed: boolean;
  category: string;
  dueDate: Date;
}
