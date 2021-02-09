import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

const TRUE_STRING = 'true';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  username = '';
  email = '';
  isVerified = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getUsername((username: string) =>
      this.setUsername(username)
    );
    this.accountService.getEmail((email: string) => this.setEmail(email));
    this.accountService.isEmailVerified((isVerified: string) =>
      this.setIsVerified(isVerified)
    );
  }

  private setUsername(username: string): void {
    this.username = username;
  }

  private setEmail(email: string): void {
    console.log('email: ' + email);
    this.email = email;
  }

  private setIsVerified(isVerified: string): void {
    console.log('isVerified: ' + isVerified);
    this.isVerified = isVerified === TRUE_STRING;
  }
}
