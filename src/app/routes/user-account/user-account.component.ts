import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  public errorMessage:string;

  public currentUserData: IUser;

  public username: string = '';

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {

    let user = JSON.parse(localStorage.getItem('user'));

    console.log(user.email);



    // this.userService.getAllUsers().subscribe({

    //   next: users => {
    //     this.users = users;
    //     this.currentUserData = this.users.filter(u => u.email === 'mguelpa@users.com')[0];
    //     this.username = this.currentUserData.email
    //   },
    //   error: err => this.errorMessage = err
    // });




    this.userService.getUserByEmail(user.email).subscribe({

      next: user => {
        this.currentUserData = user;
        this.username = user.email;
      },
      error: err => this.errorMessage = err
    });

  }
}

