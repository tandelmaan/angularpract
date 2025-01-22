import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DataserviceService } from '../../services/dataservice.service';
import { SerchpipePipe } from '../../pipes/serchpipe.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, TableModule, DialogModule,CommonModule,SerchpipePipe],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  serchText:string=''
  display: boolean = false;
  finaldata: any = [];
  customerid: any = null;

  CustomerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    pass: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl('')
  });

  constructor(private datasrv: DataserviceService) {}

  ngOnInit(): void {
    this.fetchapi();
  }

  fetchapi() {
    this.datasrv.get_api_data().subscribe((res) => {
      console.log(res);
      this.finaldata = res;
    });
  }

  deletedata(id: any) {
    this.datasrv.delete_api_data(id).subscribe(() => {
      console.log(id);
      this.fetchapi();
    });
  }

  updatedata(data: any) {
    this.CustomerForm.setValue({
      username: data.username,
      email: data.email,
      pass: data.pass,
      city: data.city,
      address: data.address
    });
    this.customerid = data.id;
    this.display = true;
  }

  save() {
    if (this.customerid) {
      this.datasrv.edit_api_dat(this.customerid, this.CustomerForm.value).subscribe(() => {
        this.fetchapi();
        this.resetform();
        this.display = false;
      });
    } else {
      this.datasrv.post_api_data(this.CustomerForm.value).subscribe(() => {
        this.fetchapi();
        this.resetform();
        this.display = false;
      });
    }
  }

  resetform() {
    this.CustomerForm.reset();
    this.customerid = null;
  }
}
