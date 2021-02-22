import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'manage-game-components',
  templateUrl: './manage-game-components.component.html',
  styleUrls: ['./manage-game-components.component.scss']
})
export class ManageGameComponentsComponent implements OnInit {

  jwt;
  games;

  // PAGINATION
  gameList = [];
  gameShow = [];

  page: number=1;
  limit: number= 5;
  maxPage: number;
  offset: number = 0;


  // INSERT
  insertTitle: string = '';
  insertDesc: string = '';
  insertPrice: number;
  insertTags: string = '';
  pictureName;
  pictureString;

  // DELETE
  gameDeletedId;

  // UPDATE;
  gameUpdatedId;
  updateTitle: string = '';
  updateDesc: string = '';
  updatePrice: number;
  updateTags: string = '';
  pictureName2;
  pictureString2;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt admin");

    if(!this.jwt){
      this.router.navigate(['/login-admin']).then(() => {
        window.location.reload()
      })
    }

    this.service.getAllGames().subscribe(async data => {
      this.games = data.data.games;
      this.gameList = this.games;

      if(this.gameList.length % this.limit != 0){
        this.maxPage = Math.ceil(this.gameList.length/this.limit);
      } else{
        this.maxPage = this.gameList.length/this.limit;
      }

    })

    this.offset = (this.page - 1) * this.limit;
    this.service.getGamesOffsetLimit(this.offset, this.limit).subscribe(async data => {

      this.gameShow = data.data.gamesoffsetlimit;
      console.log(this.gameShow)
      
    })

  }


  next(){

    if(this.page + 1 > this.maxPage){
      this.page = this.maxPage;
    }else{
      this.page += 1;
    }

    this.fetchData()
  }

  prev(){
    if(this.page - 1 < 1){
      this.page = 1
    }else{
      this.page -= 1;
    }
    
    this.fetchData()
  }
  
  fetchData(){
    
    this.offset = (this.page - 1) * this.limit;
      this.service.getGamesOffsetLimit(this.offset, this.limit).subscribe(async data => {
      this.gameShow = data.data.gamesoffsetlimit;
    })
  }


  // INSERT
  submit(){
    this.service.insertGame(this.pictureString, this.pictureName, this.insertTitle, this.insertDesc, this.insertPrice, this.insertTags).subscribe(async data =>{
      console.log(data.data)
    })
    // window.location.reload();
  }

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

  async setGameHeaderUpdate(e?: HTMLInputEvent): Promise<any> {
    const headerImgFile: FileList = (<any>e.target).files[0];
    this.convertFileToBase64(headerImgFile).then(resolve => {
      // console.log(resolve) //variable resolve ini isinya gaambar kita yg udah jadi string
      // udah siap di kirim ke graphql
      this.pictureName2 = e.target.files[0].name;
      this.pictureString2 = resolve;
    });
  }


  // DELETE
  showPopUpDelete(id: number){
    this.gameDeletedId = id;
    console.log(this.gameDeletedId)
    let hidden = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "block";
  }

  closePopUpDelete(){
    let hidden = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "none";
  }

  deleteTheGame(){

    this.service.deleteGame(this.gameDeletedId).subscribe(async data => {
      
    })

    this.closePopUpDelete();

    window.location.reload();
  }



  // UPDATE
  showPopUpUpdate(c: any){
    this.gameUpdatedId = c?.id;
    this.updateTitle = c?.name;
    this.updateDesc = c?.description;
    this.updatePrice = c?.price;
    this.updateTags = c?.category;

    let hidden = document.getElementsByClassName('overlay2') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "block";
  }

  closePopUpUpdate(){
    let hidden = document.getElementsByClassName('overlay2') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "none";
  }

  submitUpdate(){
    this.service.updateGame(this.gameUpdatedId, this.pictureString2, this.pictureName2, this.updateTitle, this.updateDesc, this.updatePrice, this.updateTags).subscribe(async data =>{

    })

    this.closePopUpDelete();

    window.location.reload();
  }

}

// UNTUK PERBAIKI ERROR files[0].name
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
