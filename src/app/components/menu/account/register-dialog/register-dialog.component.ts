import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Login} from "../../../../models/Login";
import {AccountService} from "../../../../services/account.service";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {


  registerForm:FormGroup;
  hide = true;
  ngOnInit(): void {
  }
  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>, public registerServices: AccountService) {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])

    });
  }


  loadValues(){
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])

    });
  }

  onSubmit(form: Login) {
    const loginForm = {
      username: this.registerForm.value.username,
      firstname:this.registerForm.value.firstname,
      lastname:this.registerForm.value.lastname,
      email:this.registerForm.value.email,
      password:this.registerForm.value.pass,
      imageURL:"",
      dateCreated:Date.now().toString(),
    };

    this.registerServices.SignUp(loginForm).forEach(resp => {
      console.log(resp[0])
      if (resp.length === 0) {
        this.loadValues();
      } else {
        setTimeout(() => {
          this.localStorage(form.username,form.password,resp[0].id);
        }, 1000);
      }
    }).catch(error => {
      console.log(error)
      this.loadValues();
    });
  }

  localStorage(dato1:string, dato2:string, id:number) {
    let data = { email: dato1, password : dato2, id:id};
    localStorage.setItem('session',JSON.stringify(data))
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
