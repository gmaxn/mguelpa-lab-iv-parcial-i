import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  public logged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSignOut() {
    this.authService.signOut();
  }

}
