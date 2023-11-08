import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Login} from "../../../../models/Login";
import {AccountService} from "../../../../services/account.service";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm:FormGroup;
  ngOnInit(): void {
  }
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>, public loginServices: AccountService
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });

  }

  loadValues(){
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: Login) {
    const loginForm = {
      username:this.loginForm.value.user,
      password:this.loginForm.value.pass
    };

    this.loginServices.LoginAuthentication(loginForm).forEach(resp => {
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
    let data = { email: dato1, password : dato2};
    localStorage.setItem('session',JSON.stringify(data))
  }
  onNoClick(): void {
    this.dialogRef.close(); // cierra el diálogo
  }
}
