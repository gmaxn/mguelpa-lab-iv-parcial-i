import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  
  private errorMessage: string;
  public accounts: IUser[];

  constructor(
    private router: Router,
    private userService: UserService) {

    this.accounts = new Array<IUser>();

  }
  ngOnInit(): void {

    this.userService.getAllUsers().subscribe({

      next: account => {
        this.accounts = account;
      },
      error: err => this.errorMessage = err
    });
  }

}
