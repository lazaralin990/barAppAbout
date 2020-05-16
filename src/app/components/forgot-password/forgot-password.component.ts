import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userEmail = new FormGroup({
    email: new FormControl(''),
  });

  constructor(
    public authService: AuthService,
    private activatedRoutes: ActivatedRoute
  ) { }

  ngOnInit() {
    const code = this.activatedRoutes.snapshot.queryParams['oobCode'];
  }

  onSubmit(email){
    if(!email){
      alert('Type in your email first');
    }
    this.authService.resetPassword(email).then(
      () => alert('A password reset link has been sent to your email address'),
      (rejectionReason) => alert(rejectionReason))
    .catch(e => alert('An error occurred while attempting to reset your password'));
  }
}
