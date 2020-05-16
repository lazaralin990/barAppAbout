import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  frmSetNewPassword = this.fb.group({
    password: [null],
    confirmPassword: [null]
  });

  ngOnInit() {
  }

  onSubmit(){
    const password = this.frmSetNewPassword.controls['password'].value;
    const confirmPassword = this.frmSetNewPassword.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      return;
    }
    const code = this.activatedRoute.snapshot.queryParams['oobCode'];
    this.afAuth.auth
    .confirmPasswordReset(code, password)
    .then(() => this.router.navigate(['login']))
    .catch(err => {
      console.log(err);
    });
  }

}
