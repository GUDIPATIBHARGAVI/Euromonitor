import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-user',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent implements AfterViewInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private dialog: MatDialog
  ) {
    this.loadUser();
  }

  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {}
  public loadUser() {
    this.service.Getall().subscribe((res) => {
      this.userlist = res;

      this.userlist.sort((a: any, b: any) => {
        const dateA = new Date(a.registrationDate).getTime();
        const dateB = new Date(b.registrationDate).getTime();
        return dateB - dateA;
      });

      this.userlist.reverse();

      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'number',
    'status',
    'role',
    'action',
  ];

  public UpdateUser(code: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code,
      },
    });

    popup.afterClosed().subscribe(() => {});
  }

  public opendialog() {
    this.loadUser();
  }
}
