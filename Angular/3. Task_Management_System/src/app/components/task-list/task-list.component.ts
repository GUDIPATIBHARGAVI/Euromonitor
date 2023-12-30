import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Itask';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: string[] = [];
  selectedCategory: string | undefined;
  sortField: string = 'dueDate';
  sortDirection: string = 'asc';
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      this.categories = Array.from(new Set(tasks.map((task) => task.category)));
      this.sortTasks();
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  filterTasksByCategory(): void {
    if (this.selectedCategory) {
      this.filteredTasks = this.tasks.filter(
        (task) => task.category === this.selectedCategory
      );
    } else {
      this.filteredTasks = this.tasks;
    }
    this.sortTasks();
  }

  sortTasks(): void {
    this.filteredTasks.sort((a, b) => {
      const aValue = (a as any)[this.sortField];
      const bValue = (b as any)[this.sortField];

      if (aValue === bValue) {
        return 0;
      }

      if (this.sortDirection === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }
  editTask(task: Task): void {
    task.editing = true;

    task.editedTask = { ...task };
  }

  updateTask(task: any): void {
    const updatedTask = {
      id: task.id,
      title: task.editedTask.title,
      completed: task.editedTask.completed,
      category: task.editedTask.category,
      dueDate: task.editedTask.dueDate,
    };

    this.taskService.updateTask(updatedTask).subscribe(
      (response) => {
        task.editing = false;

        const index = this.tasks.findIndex((t) => t.id === response.id);
        if (index !== -1) {
          this.tasks[index] = response;
        }
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  cancelEdit(task: any): void {
    task.editing = false;
  }
}
