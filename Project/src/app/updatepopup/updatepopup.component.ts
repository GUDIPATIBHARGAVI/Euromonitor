import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatepopupComponent>
  ) {}

  editdata: any;
  ngOnInit(): void {
    this.service.GetAllRole().subscribe((res) => {
      this.rolelist = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.GetUserbyCode(this.data.usercode).subscribe((res) => {
        this.editdata = res;
        this.registerform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          email: this.editdata.email,
          password: this.editdata.password,
          role: this.editdata.role,
          number: this.editdata.number,
          gender: this.editdata.gender,
          isactive: this.editdata.isactive,
        });
      });
    }
  }
  rolelist: any;

  registerform = this.builder.group({
    id: this.builder.control(''),

    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    number: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  });
  UpdateUser() {
    if (this.registerform) {
      this.service
        .updateuser(this.registerform.value.id, this.registerform.value)
        .subscribe((res) => {
          this.toastr.success('updated successfully');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('please select role');
    }
  }
}
