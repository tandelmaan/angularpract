import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {ButtonModule} from 'primeng/button'
@Component({
  selector: 'app-login',
  imports: [ButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  finaldata:any=[]
  ngOnInit(): void {
    let data1 = localStorage.getItem("userdetails")
    if(data1 != null){
      this.finaldata=JSON.parse(data1)
      console.log(this.finaldata)
    }
  }
  constructor(private router:Router){}
  spanclick(){
    this.router.navigate(['/signup'])
  }
  LoginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      pass : new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('[0-9]+$')]),
    })
    get_form_data(data:any){
      console.log(data)
      let details = this.finaldata.find((e:any)=>e.email == data.email && e.pass == data.pass)
      if(details != undefined){
        alert("login sucsessfull")
        this.router.navigate(['/crud'])
      }else{
        alert("chech details")
      }
    }

    get xEmail(){
      return this.LoginForm.get('email')
    }
    get xPass(){
      return this.LoginForm.get('pass')
    }
  

}
