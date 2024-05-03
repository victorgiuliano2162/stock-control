import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from 'src/models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from 'src/models/interfaces/user/auth/AuthResponse';
import { SignUpUserRequest } from 'src/models/interfaces/user/SignUpUserRequest';
import { SignUpUserResponse } from 'src/models/interfaces/user/SignUpUserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  signUpUser(requestDatas: SignUpUserRequest): Observable<SignUpUserResponse> {
    return this.http.post<SignUpUserResponse>(
      `${this.API_URL}/user`, requestDatas
    );
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestDatas);
  }

  isLoggedIn(): boolean {
    const JWT_cookie = this.cookie.get('USER_INFO');
    return JWT_cookie ? true : false;
  }
}
