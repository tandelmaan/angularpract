import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
@Component({
  selector: 'app-sign-up',
  imports: [ButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
constructor(private router:Router){}
  spanclick(){
    this.router.navigate(['/login'])
  }
  ngOnInit(): void {
    let data1 = localStorage.getItem("userdetails")
    if(data1 != null){
      this.finaldata=JSON.parse(data1)
    }
  }

  SignupForm = new FormGroup({
    username : new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z]+$')]),
    email : new FormControl('',[Validators.required,Validators.email]),
    pass : new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('[0-9]+$')]),
  })
  finaldata:any=[]
  get_form_data(data:any){
    console.log(data)
    this.finaldata.push(data)
    localStorage.setItem("userdetails",JSON.stringify(this.finaldata))
  }
  get xUsername(){
    return this.SignupForm.get('username')
  }
  get xEmail(){
    return this.SignupForm.get('email')
  }
  get xPass(){
    return this.SignupForm.get('pass')
  }

}
