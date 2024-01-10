import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Task } from '../models/Itask';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';
  private tasks: Task[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getTasks(): Observable<Task[]> {
    const userId = this.authService.getUserId();
    const url = `${this.apiUrl}/tasks?userId=${userId}`;
    return this.http.get<Task[]>(url).pipe(
      map((tasks) => {
        this.tasks = tasks;
        return tasks;
      }),
      catchError(this.handleError)
    );
  }

  public getTasksByCategory(category: string): Observable<Task[]> {
    const url =
      category === 'All'
        ? `${this.apiUrl}/tasks`
        : `${this.apiUrl}/tasks?category=${encodeURIComponent(category)}`;
    return this.http.get<Task[]>(url);
  }

  public getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  public addTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/tasks`;
    return this.http.post<Task>(url, task).pipe(
      map((newTask) => {
        this.tasks.push(newTask);
        return newTask;
      }),
      catchError(this.handleError)
    );
  }

  public updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/tasks/${task.id}`;
    return this.http.put<Task>(url, task).pipe(
      map((updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        return updatedTask;
      }),
      catchError(this.handleError)
    );
  }

  public deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/tasks/${taskId}`;
    return this.http.delete<void>(url).pipe(
      map(() => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      }),
      catchError(this.handleError)
    );
  }

  public getTasksByUser(): Observable<Task[]> {
    const userId = this.authService.getUserId();
    if (userId) {
      const url = `${this.apiUrl}/tasks?userId=${userId}`;
      return this.http.get<Task[]>(url);
    } else {
      return of([]);
    }
  }

  public addTaskForUser(task: Task): Observable<Task> {
    const userId = this.authService.getUserId();

    if (userId) {
      task.userId = userId;
      const url = `${this.apiUrl}/tasks`;

      return this.http.post<Task>(url, task).pipe(
        map((newTask: Task) => {
          this.tasks.push(newTask);
          return newTask;
        }),
        catchError(
          (error) =>
            new Observable<Task>((observer) =>
              observer.error('Something went wrong. Please try again later.')
            )
        )
      );
    } else {
      return new Observable<Task>((observer) =>
        observer.error('User not logged in.')
      );
    }
  }

  public setTaskData(data: Task | null): void {}

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);

    return new Observable((observer) => {
      observer.error('Something went wrong. Please try again later.');
      observer.complete();
    });
  }
}
