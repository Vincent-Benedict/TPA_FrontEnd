import { Injectable } from '@angular/core';
import { Apollo, Mutation } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Query } from '../models/query'
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(
    private apollo: Apollo
  ) { }

  getGameById(idSearch: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getGame($id: Int){
        game(id:$id){
          id,
          name,
          image,
          category,
          price,
          discount,
          sideimage,
          overall,
          status,
          review{
            reviewusername,
            reviewdesc,
            reviewavatar
          }
        }
      }
      `,
      variables:{
        id: idSearch,
      }
    })
  }


  getGameByIdWithVideoReqAndPicture(idSearch: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getGame($id: Int){
        game(id:$id){
          id,
          name,
          image,
          category,
          price,
          discount,
          sideimage,
          overall,
          status,
          description,
          developer,
          publisher,
          review{
            reviewusername,
            reviewdesc,
            reviewavatar
          },
          video{
            videosource
          },
          photo{
            photosource
          },
          systemrequirement{
            os,
            processor,
            graphics,
            storage,
            memory
          },
        }
      }
      `,
      variables:{
        id: idSearch,
      }
    })
  }


  getGameRecommendeds(limits: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getGames($status:String, $limit:Int!){
        gamesByStatusLimit(status:$status, limit:$limit){
          id,
          name,
          image,
          price,
          inappropriate
        }
      }
      `,
      variables:{
        status: "recommend",
        limit: limits,

      }
    })
  }


  getGameOnSales(limits: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames($status:String, $limit:Int){
          gamesByStatusLimit(status:$status, limit:$limit){
            id,
            image,
            price,
            discount
          }
        }
      `,
      variables:{
        status: "sale",
        limit: limits,

      }
    })
  }


  getGameCommunityRecommendeds(limits: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames($status:String, $limit:Int){
          gamesByStatusLimit(status:$status, limit:$limit){
            id,
            image,
            review{
              reviewdesc,
              reviewavatar,
              reviewusername
            }
            
          }
        }
      `,
      variables:{
        status: "community recommended",
        limit: limits,

      }
    })
  }

  getGameNewAndTrendings(limits: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames($status:String, $limit:Int){
          gamesByStatusLimit(status:$status, limit:$limit){
            id,
            name,
            image,
            category,
            price
          }
        }
      `,
      variables:{
        status: "new trending",
        limit: limits,

      }
    })
  }

  getGameTopSellers(limits: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames($status:String, $limit:Int){
          gamesByStatusLimit(status:$status, limit:$limit){
            id,
            name,
            image,
            category,
            price
          }
        }
      `,
      variables:{
        status: "top seller",
        limit: limits,
      }
    })
  }

  getGameSpecialsDiscountLimit(discountRequest:number, limits: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGamesDiscount($status:String,$discount:Int, $limit: Int){
          gamesByStatusDiscountLimit(status:$status,discount:$discount, limit: $limit){
            id,
            name,
            image,
            sideimage,
            price,
            discount,
            category,
            overall
          }
        }
      `,
      variables:{
        status: "special",
        limit: limits,
        discount: discountRequest
      }
    })
  }

  getGameHovered(idSearch: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query GetGame($id : Int!){
          game(id : $id){
            id,
            name,
            overall,
            category,
            sideimage
          }
        }
      `,
      variables:{
        id: idSearch,
      }
    })
  }

  getAllGames():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames{
          games{
            id,
            name,
            image,
            price,
            discount,
            sideimage,
            overall,
            category
          }
        }
      `,
    })
  }

  getGameByNameLimit(name: String ,limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames($name:String, $limit: Int){
          gamesByNameLimit(name:$name,limit: $limit){
            id,
            name,
            image,
            price
          }
        }
      `,
      variables:{
        name: name,
        limit: limit
      }
    })
  }

  getGameByName(name: String):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames($name:String){
          gamesByName(name:$name){
            id,
            name,
            image,
            price,
            sideimage,
            discount,
            category,
            overall
          }
        }
      `,
      variables:{
        name,
      }
    })
  }

  getGameByFilter(name: String, price: number, status: String, category: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames($name:String, $price:Int, $genre:String, $category: String){
          gamesByFilter(name:$name, price:$price, genre:$genre, category:$category){
            id,
            name,
            image,
            price,
            sideimage,
            discount,
            category,
            overall,
            status,
          }
        }
      `,
      variables:{
        name,
        price,
        category: status,
        genre: category,
      }
    })
  }

  getReviewsByGameIdGreaterUpvotedAndLimit(gameid: number, reviewupvoted:number ,limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getReviews($gameid:Int, $reviewupvoted:Int, $limit:Int){
          reviewsByGameIdGreaterUpvotedAndLimit(gameid:$gameid, reviewupvoted:$reviewupvoted, limit:$limit){
            id,
            gameid,
            reviewdesc,
            reviewupvoted,
            reviewdownvoted,
            reviewavatar,
            reviewusername
          }
        }
      `,
      variables:{
        gameid: gameid,
        limit: limit,
        reviewupvoted: reviewupvoted
      }
    })
  }



  getReviewsByGameIdEqualsUpvotedAndLimit(gameid: number, reviewupvoted:number ,limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getReviews($gameid:Int, $reviewupvoted:Int, $limit:Int){
          reviewsByGameIdEqualsUpvotedAndLimit(gameid:$gameid, reviewupvoted:$reviewupvoted, limit:$limit){
            id,
            gameid,
            reviewdesc,
            reviewupvoted,
            reviewdownvoted,
            reviewavatar,
            reviewusername
          }
        }
      `,
      variables:{
        gameid: gameid,
        limit: limit,
        reviewupvoted: reviewupvoted
      }
    })
  }

  getGamesInCart():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getAll($token: String){
          getAllGamesInCart(token: $token){
            id,
            gameid,
            image,
            name,
            discount,
            price
          }
        }
      `,
    })
  }

  getUserByToken(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getUser($token: String) {
          getUserByToken(token:$token){
          id,
          username,
          balance,
          avatar,
        }
      }
      `,
      variables:{
        token: token
      }
    })
  }

  getUserById(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getUser($id: Int) {
          getUserById(id:$id){
          id,
          username,
          balance,
          avatar,
          status
        }
      }
      `,
      variables:{
        id: id
      }
    })
  }

  getProfileUserById(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getUser($id: Int!) {
          getUserById(id:$id){
          id,
          username,
          balance,
          avatar,
          level,
          summary,
          featuredbadge,
        }
      }
      `,
      variables:{
        id: id
      }
    })
  }

  getUserGameByUserId(userid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getUserGame($userid:Int!){
          getusergamebyuserid(userid:$userid){
            game{
              name,
              category,
              image,
            }
          }
        }
      `,
      variables:{
        userid: userid
      }
    })
  }

  getFriendsByUserId(userid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getFriend($userid:Int!){
          getfriendsbyuserid(userid:$userid){
            id,
            userid,
            friend{
              id,
              username,
              avatar,
              level,
              status,
              featuredbadge
            }
          }
        }
      `,
      variables:{
        userid: userid
      }
    })
  }

  getCommentsByUserId(userid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getAllComments($userid:Int){
          getallcommentsbyuserid(userid:$userid){
            id,
            userid,
            commentdesc,
            person{
              id,
              username,
              avatar,
            }
          }
        }
      `,
      variables:{
        userid: userid
      }
    })

  }

  getIdFromJWTToken(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getId($token :String){
          getidfromjwttoken(token:$token)
        }
      `,
      variables:{
        token: token,
      }
    })
  }

  getJWTToken(username: string, password: string):Observable<Query>{

    return this.apollo.query<Query>({
      query: gql`
        query getUser($username :String, $password:String){
          getUser(username:$username, password:$password)
        }
      `,
      variables:{
        username: username,
        password: password
      }
    })

  }

  getUsernameAndWishlist(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query get($token:String){
          getUserByToken(token:$token){
            username,
            avatar,
            wishlist{
              game{
                name,
                image,
                developer,
                publisher,
                overall,
                category,
                price
              }
            }
          }
        }
      `,
      variables:{
        token: token
      }
    })
  }

  isAddedGameToWishlist(token: string, gameid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getisadded($token:String, $gameid:Int){
          isaddedgametowishlist(token:$token, gameid:$gameid)
        }
      `,
      variables:{
        token: token,
        gameid: gameid
      }
    })
  }

  checkUserIsHavingAGame(token: string, gameid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query check($token:String, $gameid: Int){
          checkuserishavingagame(token:$token, gameid: $gameid)
        }
      `,
      variables:{
        token: token,
        gameid: gameid
      }
    })
  }

  getAllItemGame():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query{
          getallgameitem{
            id,
            itemname,
            itemimage,
            itemprice,
            itemtransaction,
            game{
              name
            }
          }  
        }
      `
    })
  }

  getItemDetailById(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGameItem($id : Int!){
          getgameitembyid(id:$id){
            id,
            itemname,
            itemimage,
            itemprice,
            itemdescription,
            game{
              name,
              image
            }
          }  
        }
      `,
      variables:{
        id: id,
      }
    })
  }

  getRedeemCodeByString(code: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getRedeemCode($code : String){
          getredeemcodebystring(code:$code){
            id,
            code,
            price
          }  
        }
      `,
      variables:{
        code: code,
      }
    })
  }


  // MUTATION


  /* INSERT */

  insertUserGame(token:string, gameid:number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insertMutation($token:String, $gameid:Int){
          insertusergame(token:$token, gameid:$gameid)
        }
      `,
      variables:{
        token: token,
        gameid: gameid
        
      }
    })
  }

  insertGameIntoCart(id: number, name:string, image:string, price:number, discount:number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insertMutation($gameid: Int, $token: String, $name:String, $image:String, $price:Int, $discount:Int){
          insertgametocart(gameid: $gameid, token: $token, name:$name, image:$image, price:$price, discount:$discount){
            id,
            name,
            image
          }
            
        }
      `,
      variables:{
        gameid: id,
        name: name,
        image: image,
        price: price,
        discount: discount
      }
    })
  }

  insertGameIntoWishlist(token:string, gameid:number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insertMutation($token:String, $gameid:Int){
          insertgametowishlist(token:$token, gameid:$gameid)
        }
      `,
      variables:{
        token: token,
        gameid: gameid
        
      }
    })
  }

  insertReview(token:string, reviewdesc: string, gameid:number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $reviewdesc:String, $gameid: Int){
          insertreview(token:$token, reviewdesc:$reviewdesc, gameid:$gameid){
            id,
            reviewavatar,
            reviewdesc,
            reviewdownvoted,
            reviewupvoted,
            reviewusername
          }
        }
      `,
      variables:{
        token: token,
        reviewdesc: reviewdesc,
        gameid: gameid
      }
    })
  }


  /* UPDATE */

  updateUpvotedReview(id: number, upvote: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($upvote:Int, $id: Int){
          updatereviewupvoted(upvote:$upvote, id:$id)
        }      
      `,
      variables:{
        id: id,
        upvote: upvote  
      }
    })
  }


  updateDownvotedReview(id: number, downvote: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($downvote:Int, $id: Int){
          updatereviewdownvoted(downvote:$downvote, id:$id)
        }     
      `,
      variables:{
        id: id,
        downvote: downvote  
      }
    })
  }

  updateDecreaseUserBalance(token: string, balance: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($token:String, $balance: Int){
          decreasebalance(token:$token, balance:$balance)
        }     
      `,
      variables:{
        token: token,
        balance: balance  
      }
    })
  }

  updateIncreaseUserBalance(token: string, balance: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($token:String, $balance: Int){
          increasebalance(token:$token, balance:$balance)
        }     
      `,
      variables:{
        token: token,
        balance: balance  
      }
    })
  }



  /* DELETE */

  deleteGameFromCartById(id:number){
    return this.apollo.mutate({
      mutation:gql`
        mutation deleteMutation($id:Int){
          deletegamefromcartbyid(id:$id){
            id,
            name
          }
        }
      `,
      variables:{
        id: id,
      }
    })
  }

  deleteAllGameFromCart(){
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteAll{
          deleteallgamefromcart
        }
      `,
    })
  }


  // DELETE BY ID RETURN Boolean
  // deleteGameFromCartById2(id:number){
  //   return this.apollo.mutate({
  //     mutation:gql`  
  //       mutation deleteMutation($id:Int){
  //         deletegamefromcartbyid2(id:$id)
  //       }
  //     `,
  //     variables:{
  //       id: id,
  //     }
  //   })
  // }




  /* WEB SOCKET */

  subscriptionSetter(userid: number, recipientid: number){
    return this.apollo.subscribe({
      query: gql`
        subscription sub($userid:Int, $recipientid: Int){
          getlastchat(userid:$userid, recipientid: $recipientid){
            message,
            createdat,
            recipientid,
            senderid,
            id
          }
        }
      `,
      variables:{
        userid,  // BISA KEK GINI
        recipientid
      }
    })
  }

  insertChat(message: String, userid: number, recipientid: number){
    return this.apollo.mutate({
      mutation: gql`
        mutation insertChat($message:String, $userid:Int, $recipientid:Int){
          insertchat(message:$message, userid:$userid, recipientid:$recipientid)
        }
      `,
      variables:{
        userid,  // BISA KEK GINI
        message,
        recipientid
      }
    })
  }

  getAllChat(userid: number, recipientid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getAllChat($userid:Int, $recipientid: Int){
          getallchat(userid:$userid, recipientid: $recipientid){
            message,
            createdat,
            recipientid,
            senderid,
            id
          }
        }
      `,
      variables:{
        userid,  // BISA KEK GINI
        recipientid
      }
    })
  }




}
