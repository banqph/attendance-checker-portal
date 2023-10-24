import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constants: Constants;

  constructor(private http: HttpClient) {
    this.constants = new Constants();
  }

  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  fetchUser(id: string) {
    this.http.get<User>(`${this.constants.apiUrl}/users/${id}`).subscribe(data => {
      this.userSubject.next(data);
    });
  }
}
