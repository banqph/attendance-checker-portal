import { Component, OnInit } from '@angular/core';
import { User } from './shared/interfaces/user';
import { UserManagementService } from './shared/services/user-management.service';
import * as usb from 'usb';
import { WebSocketService } from './shared/services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user?: User | null;


  constructor(private userManagementService: UserManagementService,
    private webSocketService: WebSocketService) {
    this.userManagementService.user$.subscribe(
      (user) => {
        this.user = user;
      }
    )
  }

  ngOnInit() {
    this.webSocketService.getMessage().subscribe((data) => {
      // Handle the received data here and call getUser();
      console.log('Received data:', data);
    });
  }

  getUser() {
    const someId = "0001"
    this.userManagementService.fetchUser(someId);
  }
}
