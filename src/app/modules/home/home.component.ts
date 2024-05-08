import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../services/user/user.service';
import { SignUpUserRequest } from 'src/models/interfaces/user/SignUpUserRequest';
import { AuthRequest } from 'src/models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    private messageService: MessageService,
    private router: Router,  
  ) {
    //Para utilizá-lo é preciso importar o ReativeFormsModule no app.module.ts
  }

  //Loga usuário
  onSubmitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(
        this.loginForm.value as AuthRequest
      ).subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set("USER_INFO", response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);

            this.messageService.add({
              severity: "success",
              summary: "Sucesso",
              detail: `Bem vindo de volta ${response?.name}`,
              life: 2000,
            })
          }
        },
        error: (err) => {
          
          this.messageService.add({
            severity: "error",
            summary: "Erro",
            detail: `Erro ao realizar login`,
            life: 2000,
          });

          console.log(err)}
      })
    }
  }

  //Cria usuário
  onSubmitSignUpForm(): void {
    if(this.signUpForm.value && this.signUpForm.valid) {
      this.userService.signUpUser(
        this.signUpForm.value as SignUpUserRequest
      ).subscribe({
        next: (response) => {
          if(response) {
            this.messageService.add({
              severity: "success",
              summary: "Sucesso",
              detail: `Seja bem vindo ${this.signUpForm.value.name}. Efetue login para acessar seu cadastro`,
              life: 2000,
            })
            this.signUpForm.reset();
            this.loginCard = true;
          }
        },
        error: (err) => {
          
          this.messageService.add({
            severity: "error",
            summary: "Erro",
            detail: `Impossível realizar cadastro`,
            life: 2000,
          });

          console.log(err);
        }
      })
    }
  }
}
