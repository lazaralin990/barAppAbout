import { User } from './../../models/user';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  ProfileDetailList: AngularFireObject<User>;
  userId = '';
  imgSrc: any;
  // = './assets/images/logo.png';
  uploadedPic: boolean;
  selectedImage: any = null;
  isSubmitted: boolean;
  today: any;
  date: any;
  formTemplate: FormGroup;
  name: string;
  image: File;
  image2: File;
  direccion: string;
  telefono: string;
  copyProfileImage;




  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.formTemplate = fb.group({
      name: new FormControl(''),
      uid: [authService.userId],
      email: [authService.userEmail],
      emailVerified: [authService.isVerified],
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      image: new FormControl(''),
    });




  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if(this.userId){
        this.getData(this.userId)
      }
    })
  }

  getData(id) {
    this.authService.getProfileId(id).valueChanges().subscribe(
      res => {
        this.editProfile(res);
      }, err => {console.log(err);
      });
  }


  editProfile(res) {
this.imgSrc = res.image;
this.image2 = res.image.toString();
this.formTemplate.patchValue({
  name: res.name,
  direccion: res.direccion,
  telefono: res.telefono,
});
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
      if(formTemplate) {
        this.isSubmitted = true;
        var filePath =`${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        console.log(fileRef);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              console.log(url);
              formTemplate['image'] = url;
              this.authService.updateProfile(this.userId, this.formTemplate.value);
            })
          })
        ).subscribe();
      }
    console.log('you subbmited', formTemplate);
  }

onSubmitEdit(profileTemplate: User){

  if(confirm("¿Estas seguro de hacer los cambios?")){

  console.log(this.selectedImage);
  if(this.selectedImage == null){
    profileTemplate.image = this.authService.image;
    this.authService.updateProfile(this.userId, this.formTemplate.value);
  } else if (this.selectedImage !== null) {
    var filePath =`${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    console.log(fileRef);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          profileTemplate['image'] = url;
          this.authService.updateProfile(this.userId, this.formTemplate.value);
        })
      })
    ).subscribe();
  }
}
}

navigateBack(){
  this.router.navigate(['/mydashboard']);
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
