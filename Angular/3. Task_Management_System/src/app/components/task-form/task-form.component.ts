import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  taskForm: FormGroup;
  @Output() completionStatusChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      completed: [false],
      category: [''],
      dueDate: [''],
    });
  }

  public addTask(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      this.taskService.setTaskData(taskData);
      const completionStatus = this.taskForm.get('completed')?.value || false;
      this.completionStatusChange.emit(completionStatus);

      this.taskService.addTaskForUser(this.taskForm.value).subscribe(() => {
        this.taskForm.reset({
          title: '',
          completed: false,
        });
        this.router.navigate(['/task-list']);
      });
    }
  }
  public redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
