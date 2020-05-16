import { User } from './../../models/user';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.css']
})
export class EstablecimientoComponent implements OnInit {
  ProfileDetailList: AngularFireObject<User>;
  userId = '';
  imgSrc: any = './assets/images/logo.png';
  uploadedPic: boolean;
  selectedImage: any = null;
  isSubmitted: boolean;
  today: any;
  date: any;
  formTemplate: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private router: Router,
  ) {
    this.formTemplate = fb.group({
      name: new FormControl('', Validators.required),
      uid: [authService.userId],
      email: [authService.userEmail],
      emailVerified: [authService.isVerified],
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    })
   }

  ngOnInit() {
    this.userId = this.authService.userId;
    //this.authService.SetProfileData(name);
    //this.authService.getProfileList();
    //this.getTheProfile(this.userId);
/*
    if(this.authService.image) {
      console.log(this.authService.image);
      this.imgSrc = this.authService.image;
    }else{
      this.imgSrc = './assets/images/logo.png';
    }
*/






  }
/*
  getTheProfile(id){
    this.authService.getProfileWithoutRouting2(id).valueChanges().subscribe(
      res=> {
        this.imgSrc = res.image;
      }
    )

  }
*/

  showPreview(event){
    if(event.target.files && event.target.files[0]){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
        this.uploadedPic = true;
      }
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
      console.log('showPreview doesnt not work');
    }
  }

  onSubmit(formTemplate: any): void {
      this.isSubmitted = true;
      if(formTemplate) {
        var filePath =`${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        console.log(fileRef);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              console.log(url);
              formTemplate['image'] = url;
              this.authService.updateProfile(this.userId, this.formTemplate.value);
              this.router.navigate(['/mydashboard']);
            })
          })
        ).subscribe();
      }
    console.log('you subbmited', formTemplate);
  }


onDelete() {
  if(confirm("Are you sure?")){
    this.authService.deleteProfile(this.userId).then(
      res => {
       this.authService.SignOut();
       this.router.navigate(['/signup']);
       }, err => {console.log(err);
       }
    );
  }
}

get formsControls() {
  return this.formTemplate['controls'];
}

}
