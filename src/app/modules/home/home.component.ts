import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required] 

  });

  signUpForm = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
  })

  constructor(private formBuilder: FormBuilder) {
    //Para utilizá-lo é preciso importar o ReativeFormsModule no app.module.ts
  }

  onSubmitLoginForm(): void {
    console.log("Submit funciona", this.loginForm.value);
  }

  onSubmitSignUpForm(): void {
    console.log("Sign up funciona", this.signUpForm.value);
  }
}
