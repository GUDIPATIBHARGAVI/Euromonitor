import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private taskService: TaskService, private router: Router) {}

  selectedFilter: string = 'category';

  ngOnInit(): void {
    this.loadTasks();
  }

  public loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      this.categories = Array.from(new Set(tasks.map((task) => task.category)));
      this.sortTasks();
    });
  }

  public deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  public filterTasksByCategory(): void {
    if (this.selectedCategory) {
      this.filteredTasks = this.tasks.filter(
        (task) => task.category === this.selectedCategory
      );
    } else {
      this.filteredTasks = this.tasks;
    }
    this.sortTasks();
  }

  // task-list.component.ts

  public sortTasks(): void {
    this.filteredTasks.sort((a, b) => {
      const aValue = a[this.sortField];
      const bValue = b[this.sortField];

      if (aValue === bValue) {
        return 0;
      }

      let comparison = 0;

      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  public editTask(task: Task): void {
    task.editing = true;
    task.editedTask = { ...task };
  }

  public updateTask(task: any): void {
    this.taskService
      .updateTask({
        id: task.id,
        title: task.editedTask.title,
        completed: task.editedTask.completed,
        category: task.editedTask.category,
        dueDate: task.editedTask.dueDate,
      })
      .subscribe(
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

  public cancelEdit(task: any): void {
    task.editing = false;
  }
  public goToAddTask(): void {
    this.router.navigate(['/task-form']);
  }

  public sortTasksByDueDate(): void {
    this.filteredTasks.sort((a, b) => {
      const aValue = new Date(a.dueDate).getTime();
      const bValue = new Date(b.dueDate).getTime();

      if (aValue === bValue) {
        return 0;
      }

      let comparison = 0;

      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
}
