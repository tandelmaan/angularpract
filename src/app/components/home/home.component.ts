import {  Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataserviceService } from '../../services/dataservice.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule,ReactiveFormsModule,ButtonModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  finaldata:any=[]
  customerid : any =null
  reseteform(){
    this.CustomerForm.reset()
    this.customerid=null
  }
  constructor(private datasrv:DataserviceService){}
  CustomerForm = new FormGroup({
        username : new FormControl(''),
        email : new FormControl(''),
        pass : new FormControl(''),
        city : new FormControl(''),
        address : new FormControl(''),
      })
      fetchapi(){
        this.datasrv.get_api_data().subscribe((res)=>{
          console.log(res)
          this.finaldata=res
        })
      }
      get_customer_data(data:any){
        if(this.customerid){
          this.datasrv.edit_api_dat(this.customerid,data).subscribe(()=>{
            this.fetchapi()
            this.reseteform()
          })
        }else{
          console.log(data)
          this.datasrv.post_api_data(data).subscribe(()=>{
            this.fetchapi()
            this.reseteform()
          })
        }
        
      }
}
