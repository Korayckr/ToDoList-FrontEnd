import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../../../core/services/api/api.service";
import { User } from 'src/core/models/user.model';
import { UserRequest } from '../../../../src/core/models/request/user-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User | null;
  isAdmin: boolean = false;


  constructor(private router: Router, private readonly apiService: ApiService, private authService: AuthService) {
    this.currentUser = null;


  }

  public userRequest: UserRequest = <UserRequest>{}
  users: User[] = [];

  ngOnInit(): void {
    this.initializeScripts();
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser?.userType === 0) {
        this.isAdmin = true;
      }
     
    });

  }

  refresh() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
      console.log(this.users);
    });
  }

  private initializeScripts(): void {
    "use strict";

    const fullHeight = (): void => {
      const elements = document.querySelectorAll('.js-fullheight');
      const windowHeight = window.innerHeight;

      elements.forEach((element) => {
        element.setAttribute('style', `height: ${windowHeight}px`);
      });

      window.addEventListener('resize', () => {
        elements.forEach((element) => {
          element.setAttribute('style', `height: ${windowHeight}px`);
        });
      });
    };

    fullHeight();

    const sidebarCollapse = document.querySelector('#sidebarCollapse');
    const sidebar = document.querySelector('#sidebar');

    if (sidebarCollapse && sidebar) {
      sidebarCollapse.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });
    }
  }



  async logOut() {
    sessionStorage.clear();
    await this.router.navigate(['../login']);
    location.reload();
  }




}



