import { Component, TemplateRef } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  todovalue: string = '';
  finishedlist: Todo[] = [];
  todolist: Todo[] = [
    {
      content: 'wokeup',
      value: false,
    },
  ];
  warningMessage: string = '';
  constructor(private modalService: NgbModal) {}
  public addtodo() {
    if (this.todovalue.trim() === '') {
      this.warningMessage = 'Please enter a valid todo.';
      return;
    }

    if (/^\d+$/.test(this.todovalue)) {
      this.warningMessage = 'Todo cannot be a number.';
      return;
    }

    this.todolist.push({ content: this.todovalue, value: false });
    this.todovalue = '';
    this.warningMessage = '';
  }
  public changetodo(i: number) {
    const item = this.todolist.splice(i, 1);
    console.log(item);
    this.finishedlist.push(item[0]);
  }

  public changefinished(i: number) {
    const item = this.finishedlist.splice(i, 1);
    this.todolist.push(item[0]);
  }
  public openModal(content: TemplateRef<Element>, i: number, type: string) {
    this.deleteTask(type, i);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public deleteTask(type: string, index: number) {
    const taskList = type === 'todolist' ? this.todolist : this.finishedlist;
    taskList.splice(index, 1);
  }
}
