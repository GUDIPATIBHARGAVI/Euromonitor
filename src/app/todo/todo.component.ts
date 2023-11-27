import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../class/todo';
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

  constructor(private modalService: NgbModal) {}
  addtodo() {
    this.todolist.push({ content: this.todovalue, value: false });
    this.todovalue = '';
  }
  changetodo(i: number) {
    const item = this.todolist.splice(i, 1);
    console.log(item);
    this.finishedlist.push(item[0]);
  }

  changefinished(i: number) {
    const item = this.finishedlist.splice(i, 1);
    this.todolist.push(item[0]);
  }
  openModal(content: TemplateRef<Element>, i: number, type: String) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        if (type == 'todolist') {
          this.todolist.splice(i, 1);
        } else {
          this.finishedlist.splice(i, 1);
        }
      });
  }
}
