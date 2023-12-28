import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Task } from '../models/Itask';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';
  private tasks: any[] = [];
  private categories: string[] = ['Work', 'Personal', 'Shopping'];

  constructor(private http: HttpClient) {}
  private taskDataSubject = new BehaviorSubject<any>(null);
  taskData$ = this.taskDataSubject.asObservable();
  setTaskData(data: any): void {
    this.taskDataSubject.next(data);
  }
  getTasks(): Observable<Task[]> {
    const url = `${this.apiUrl}/tasks`;
    return this.http.get<Task[]>(url);
  }

  getTasksByCategory(category: string): Observable<Task[]> {
    const url =
      category === 'All'
        ? `${this.apiUrl}/tasks`
        : `${this.apiUrl}/tasks?category=${encodeURIComponent(category)}`;
    return this.http.get<Task[]>(url);
  }

  getCategories(): Observable<string[]> {
    return of(this.categories);
  }

  addTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/tasks`;
    return this.http.post<Task>(url, task);
  }

  updateTask(updatedTask: {
    id: number;
    title: string;
    completed: boolean;
    category: string;
    dueDate: Date;
  }): Observable<Task> {
    const url = `${this.apiUrl}/tasks/${updatedTask.id}`;
    return this.http.put<Task>(url, updatedTask);
  }

  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/tasks/${taskId}`;
    return this.http.delete<void>(url);
  }
}
