import { Component, Input, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'edit-profile-components',
  templateUrl: './edit-profile-components.component.html',
  styleUrls: ['./edit-profile-components.component.scss']
})
export class EditProfileComponentsComponent implements OnInit {

  @Input() customurl;
  id;
  user;
  userframe;

  // ABOUT
  username: string = '';
  realname: string = '';
  url: string = '';
  country: string = '';
  summary: string = '';

  // AVATAR
  frame;
  pictureName  = '';
  pictureString = '';

  // USER BACKGROUND
  userbackground;
  currbackground;

  // USER MINI PROFILE
  userminiprofile;
  currminiprofile;

  // THEME
  theme;
  currtheme;

  // BADGE
  userbadge;
  currbadge;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getIdFromCustomUrl(this.customurl).subscribe(async data =>{
      this.id = data.data.getidfromcustomurl;
      // console.log(this.id)

      this.service.getProfileUserById(this.id).subscribe(async data => {
        this.user = data.data.getUserById;
        this.username = this.user.username;
        this.realname = this.user.realname;
        this.url = this.user.customurl;
        this.country = this.user.country;
        this.summary = this.user.summary;
        this.frame = this.user.frame;
        this.currbackground = this.user.background;
        this.currminiprofile = this.user.miniprofile;
        this.currtheme = this.user.usertheme;
        this.currbadge = this.user.badge;

        

        // let c = document.getElementsByClassName('current3-body') as HTMLCollectionOf<HTMLElement>;
        // c[0].style.backgroundColor = `${this.currtheme.color}`;

        this.userframe = this.user.userframe;
        this.userbackground = this.user.userbackground;
        this.userminiprofile = this.user.userminiprofile;
        this.userbadge = this.user.userbadge;


        console.log(this.currbadge)
        console.log(this.userbadge)

        // console.log(this.currtheme)

        // console.log(this.userframe)
      })

    })

    this.service.getUserTheme().subscribe(async data => {
      this.theme = data.data.getusertheme;
      // console.log(this.theme)
    })

  }

  setMyStyles(color: string) {
    let styles = {
      'background-color': color,
      'width': '65px',
      'padding':'50px 25px',
      'border': '2px solid white',
      'border-radius': '200px',
      'text-align': 'center',
    };
    return styles;
  }
  
  saveAbout(){
    this.service.updateUserAbout(this.id, this.username, this.realname, this.url, this.country, this.summary).subscribe(async data => {
      // console.log(data)
    })

    this.router.navigate(['/edit-profile/'+this.url]).then(()=>{
      window.location.reload();
    })
  }

  clickAvatar(frame :string){
    // let back = document.getElementsByClassName('img-back') as HTMLCollectionOf<HTMLElement>;
    // back[0].style.backgroundImage = `url('../../../assets/User/Frame/${frame}')`;
    this.frame = frame
  }

  saveAvatar(){

    if(this.pictureString == ''){
      this.service.updateUserAvatar(this.id, this.pictureName, this.frame).subscribe(async data =>{
        // console.log("Update User Avatar ", data.data)
      })

      window.location.reload();
    }
    else{
      this.service.saveAvatar(this.pictureString, this.pictureName).subscribe(async data => {
        // console.log(data);
        console.log(this.pictureName)
      })
  
      this.service.updateUserAvatar(this.id, this.pictureName, this.frame).subscribe(async data =>{
        // console.log("Update User Avatar ", data.data)
      })
    }
    

  }

  clickBackground(background: string){
    this.currbackground = background;
  }

  saveBackground(){
    this.service.updateUserBackground(this.id, this.currbackground).subscribe(async data => {

    })

    this.router.navigate(['profile/'+this.customurl]).then(() => {
      window.location.reload()
    })
  }

  clickMiniProfile(miniprofile: string){
    this.currminiprofile = miniprofile;
  }

  saveMiniProfile(){
    this.service.updateUserMiniProfile(this.id, this.currminiprofile).subscribe(async data => {
    })

    this.router.navigate(['profile/'+this.customurl]).then(() => {
      window.location.reload()
    })
  }


  clickTheme(c: Data){
    this.currtheme = c;
  }

  saveTheme(){
    this.service.updateUserTheme(this.id, this.currtheme.color).subscribe(async data => {
      // console.log(data)
    })

    this.router.navigate(['profile/'+this.customurl]).then(() => {
      window.location.reload()
    })
  }


  clickBadge(c: Data){
    this.currbadge = c;
  }

  saveBadge(){
    this.service.updateUserBadge(this.id, this.currbadge.badgeimg).subscribe(async data => {
      console.log(data)
    })

    window.location.reload()
  }


  // Conver File To Base64
  convertFileToBase64(file): Promise<any> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((<any>reader.result).replace(/^.*,/, ''));
    })
  }

  async setGameHeader(e?: HTMLInputEvent): Promise<any> {
    const headerImgFile: FileList = (<any>e.target).files[0];
    this.convertFileToBase64(headerImgFile).then(resolve => {
      // console.log(resolve) //variable resolve ini isinya gaambar kita yg udah jadi string
      // udah siap di kirim ke graphql
      this.pictureName = e.target.files[0].name;
      this.pictureString = resolve;
    });
  }
}

// UNTUK PERBAIKI ERROR files[0].name
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
