import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../services/user/user.service';
import { SignUpUserResponse } from 'src/models/interfaces/user/SignUpUserResponse';
import { SignUpUserRequest } from 'src/models/interfaces/user/SignUpUserRequest';
import { AuthRequest } from 'src/models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,  
  ) {
    //Para utilizá-lo é preciso importar o ReativeFormsModule no app.module.ts
  }

  onSubmitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(
        this.loginForm.value as AuthRequest
      ).subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set("USER_INFO", response?.token);
            
            this.loginForm.reset(); 
          }
        },
        error: (err) => console.log(err)
      })
    }
  }

  onSubmitSignUpForm(): void {
    if(this.signUpForm.value && this.signUpForm.valid) {
      this.userService.signUpUser(
        this.signUpForm.value as SignUpUserRequest
      ).subscribe({
        next: (response) => {
          if(response) {
            alert("Teste - Usuário criado com sucesso");
            this.signUpForm.reset();
            this.loginCard = true;
          }
        },
        error: (err) => console.log("Teste - Erro na criação do usuário", err)
      })
    }
  }
}
