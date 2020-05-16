import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isSubmitted: boolean;
  userSignUp = new FormGroup ({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    cb: new FormControl('', Validators.required)
   })


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(userSignUp){
    this.isSubmitted = true;
    if (this.userSignUp.valid){
      this.authService.signUp(this.userSignUp.value);
    }
  }

openDialog(){

}
get formsControls(){
  return this.userSignUp['controls'];
}

}
