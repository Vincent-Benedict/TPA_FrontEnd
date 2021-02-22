import { Injectable } from '@angular/core';
import { Apollo, Mutation } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Query } from '../models/query'
import gql from 'graphql-tag';
import { identifierModuleUrl } from '@angular/compiler';

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
      query games($limit :Int){
        getgamesbyfeatureandrecommend(limit:$limit){
          id,
          name,
          image,
          price,
          inappropriate,
          gameplayhours
        }
      }
      `,
      variables:{
        limit: limits,
      }
    })
  }

  getUsers():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getUser{
        getusers{
          id,
          username,
          avatar,
          summary,
          level
        }
      }
      `
    })
  }

  getUserOffsetLimit(offset: number, limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getUser($offset: Int, $limit: Int){
        getuseroffsetlimit(offset:$offset, limit: $limit){
          id,
          username,
          avatar,
          summary,
          level
        }
      }
      `,variables:{
        offset,
        limit
      }
    })
  }


  getGameOnSales(limits: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query games($limit :Int){
          getgamesspecialoffer(limit:$limit){
            id,
            image,
            price,
            name,
            discount
          }
        }
      `,
      variables:{
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
            reviewpastweek{
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
        query getGames($limit:Int){
          getgamesnewandtrending(limit:$limit){
            id,
            name,
            image,
            category,
            price
          }
        }
      `,
      variables:{
        limit: limits,
      }
    })
  }

  getGameNewAndTrendingByStatus(limits: number):Observable<Query>{
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

  getGamesOffsetLimit(offset: number, limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames($offset: Int, $limit: Int){
          gamesoffsetlimit(offset: $offset, limit: $limit){
            id,
            name,
            image,
            price,
            discount,
            sideimage,
            description,
            overall,
            category
          }  
        }
      `,
      variables:{
        offset: offset,
        limit: limit
      }
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

  getGameByFilter(offset: number, limit: number, name: String, price: number, status: String, category: String):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGames($offset:Int, $limit:Int, $name:String, $price:Int, $genre:String, $category: String){
          gamesByFilter(offset:$offset, limit:$limit, name:$name, price:$price, genre:$genre, category:$category){
            id,
            name,
            image,
            price,
            sideimage,
            category,
            overall,
            status,
            discount,
          }
        }
      `,
      variables:{
        offset : offset,
        limit : limit,
        name,
        price,
        category: status,
        genre: category,
      }
    })
  }

  getAllReviews(limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getreview($limit: Int){
          getallreview(limit: $limit){
            id,
            gameid,
            reviewdesc,
            reviewupvoted,
            reviewdownvoted,
            reviewavatar,
            reviewusername,
            reviewsentiment
          }
        }
      `,
      variables:{
        limit : limit,
      }
    })
  }

  getReviewById(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getreview($id: Int){
          getreviewbyid(id: $id){
            id,
            gameid,
            reviewdesc,
            reviewupvoted,
            reviewdownvoted,
            reviewavatar,
            reviewusername,
            reviewsentiment
          }
        }
      `,
      variables:{
        id
      }
    })
  }

  getReviewsUpvoted(gameid: number ,limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query games($gameid:Int, $limit :Int){
          reviewsUpvoted(gameid:$gameid, limit:$limit){
            id,
            gameid,
            reviewdesc,
            reviewupvoted,
            reviewdownvoted,
            reviewavatar,
            reviewusername,
            reviewsentiment
          }
        }
      `,
      variables:{
        gameid: gameid,
        limit: limit,
      }
    })
  }



  getReviewsRecently(gameid: number ,limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query games($gameid:Int, $limit :Int){
          reviewsRecently(gameid:$gameid, limit:$limit){
            id,
            gameid,
            reviewdesc,
            reviewupvoted,
            reviewdownvoted,
            reviewavatar,
            reviewusername,
            reviewsentiment
          }
        }
      `,
      variables:{
        gameid: gameid,
        limit: limit,
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
          customurl,
          email,
          point
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
        query getUser($id: Int) {
          getUserById(id:$id){
          id,
          username,
          balance,
          avatar,
          level,
          summary,
          background,
          miniprofile,
          customurl,
          country,
          realname,
          frame,
          friendcode,
          badge{
            id,
            badgeimg,
            badgename,
            badgexp
          },
          userbadge{
            id,
            badgeimg,
            badgename,
            badgexp
          },
          usertheme{
            id,
            theme,
            color
          }
          usertheme{
            id,
            theme,
            color
          },
          userframe{
            id,
            frame
          },
          userbackground{
            id,
            background
          },
          userminiprofile{
            id,
            miniprofile
          }
        }
      }
      `,
      variables:{
        id: id
      }
    })
  }

  getIdFromCustomUrl(customurl: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getUser($customurl: String) {
          getidfromcustomurl(customurl:$customurl)
        }
      `,
      variables:{
        customurl
      }
    })
  }

  getUserGameByUserId(userid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getUserGame($userid:Int!){
          getusergamebyuserid(userid:$userid){
            game{
              id,
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

  getUserGameByUserIdLimit(token: string, limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getUserGame($token:String, $limit: Int!){
          getusergamebyuseridlimit(token:$token, limit:$limit){
            game{
              id,
              name,
              category,
              image,
            }
          }
        }
      `,
      variables:{
        token, 
        limit
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
              realname,
              avatar,
              level,
              status,
              email,
              background,
              miniprofile,
              customurl,
              frame
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
                id,
                name,
                image,
                developer,
                publisher,
                overall,
                category,
                price,
                discount
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

  

  getAllItemGameOffsetLimit(offset: number, limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getItem($offset: Int, $limit: Int){
          getgameitemoffsetlimit(offset: $offset, limit: $limit){
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
      `,
      variables:{
        offset: offset,
        limit: limit
      }
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

  isFriend(userid: number, friendid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query isFriend($userid : Int, $friendid: Int){
          isfriend(userid: $userid, friendid: $friendid)
        }
      `,
      variables:{
        userid: userid,
        friendid: friendid
      }
    })
  }

  getFriendRequest(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getFriendRequest($token: String){
          getFriendRequest(token: $token){
            id,
            userid,
            user{
              id,
              username,
              avatar,
              level
            },
            friendid,
            friend{
              id,
              username,
              avatar,
              level
            }
          }
        }
      `,
      variables:{
        token
      }
    })
  }

  getFriendRequestSent(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getFriendRequest($token: String){
          getFriendRequestSent(token: $token){
            id,
            userid,
            user{
              id,
              username,
              avatar,
              level
            },
            friendid,
            friend{
              id,
              username,
              avatar,
              level
            }
          }
        }
      `,
      variables:{
        token
      }
    })
  }



  getFriendRequestIgnored(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getFriendRequestIgnored($token: String){
          getFriendRequestIgnored(token: $token){
            id,
            userid,
            user{
              id,
              username,
              avatar,
              level
            },
            friendid,
            friend{
              id,
              username,
              avatar,
              level
            }
          }
        }
      `,
      variables:{
        token
      }
    })
  }


  getChatNotification(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getChatNotification($token: String){
          getchatnotification(token: $token){
            id,
            userid,
            friendid,
            friend{
              id,
              username,
              avatar
            }
          }
        }
      `,
      variables:{
        token
      }
    })
  }

  getGiftNotification(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getGiftNotification($token: String){
          getgiftnotification(token: $token){
            id,
            userid,
            friendid,
            friend{
              id,
              username,
              avatar
            }
          }
        }
      `,
      variables:{
        token
      }
    })
  }


  getCommentNotification(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getCommentNotification($token: String){
          getcommentnotification(token: $token){
            id,
            userid,
            friendid,
            friend{
              id,
              username,
              avatar
            }
          }
        }
      `,
      variables:{
        token
      }
    })
  }

  getItemNotification(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getItemNotification($token: String){
          getitemnotification(token: $token){
            id,
            userid,
            user{
              id,
              avatar,
              username
            },
            itemid,
            item{
              itemimage
            }
          }
        }
      `,
      variables:{
        token
      }
    })
  }

  getReport(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getreport($token: String){
          getreportbytoken(token: $token){
            id
          }
        }
      `,
      variables:{
        token
      }
    })
  }

  getAllActivity(userid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getactivity($userid: Int){
          getrecentactivity(userid: $userid){
            id,
            userid,
            activity,
            user{
              username,
              avatar
            }
          }
        }
      `,
      variables:{
        userid
      }
    })
  }

  getActivityOffsetLimit(userid: number, offset: number, limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getactivity($userid: Int, $offset: Int, $limit: Int){
          getrecentactivityoffsetlimit(userid: $userid, offset: $offset, limit: $limit){
            id,
            userid,
            activity,
            createdat
            user{
              username,
              avatar
            }
          }
        }
      `,
      variables:{
        userid,
        offset,
        limit
      }
    })
  }


  sendEmail(email: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query sendEmail($email: String){
          sendemail(email: $email)
        }
      `,variables:{
        email,
      }
    })
  }

  sendEmailTransaction(email: string, firstname: string, message: string, sentiment: string, signature: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query sendEmail($email: String, $firstname: String, $message: String, $sentiment: String, $signature: String){
          sendemailtransaction(email: $email, firstname: $firstname, message: $message, sentiment: $sentiment, signature: $signature)
        }
      `,variables:{
        email,
        firstname,
        message, 
        sentiment,
        signature
      }
    })
  }

  sendEmailWishlist(email: string, gamename: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query sendEmail($email: String, $gamename: String){
          sendemailwishlist(email: $email, gamename: $gamename)
        }
      `,variables:{
        email,
        gamename
      }
    })
  }


  getUserTheme():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getTheme{
          getusertheme{
            id,
            theme,
            color
          }
        }
      `
    })
  }

  getUserThemeById(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getTheme($id: Int!){
          getusertheme(id: $id){
            id,
            theme,
            color
          }
        }
      `,variables:{
        id
      }
    })
  }

  getFriendsByUsername(userid: number, username: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getfriend($userid:Int!, $username:String){
          getfriendsbyusername(userid:$userid, username:$username){
            id,
            userid,
            friendid,
            friend{
              id,
              username,
              realname,
              avatar,
              level,
              status,
              email,
              background,
              miniprofile,
              customurl,
              frame
            }
          }
        }
      `,variables:{
        userid,
        username
      }
    })
  }


  getUserByFriendCode(friendcode: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getfriend($friendcode:String){
          getuserbyfriendcode(friendcode:$friendcode){
            id,
            username,
            balance,
            avatar,
            customurl,
            email,
            status
          }
        }
      `,variables:{
        friendcode
      }
    })
  }

  getAllShopAvatar():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getavatar{
          getallshopavatar{
            id,
            avatarname,
            avatarimage,
            avatarpoint
          }
        }
      `
    })
  }

  getAllShopFrame():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getframe{
          getallshopframe{
            id,
            framename,
            frameimage,
            framepoint
          }
        }
      `
    })
  }

  getAllShopBackground():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getbackground{
          getallshopbackground{
            id,
            backgroundname,
            backgroundimage,
            backgroundpoint
          }
        }
      `
    })
  }

  getAllShopMiniBackground():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getminibackground{
          getallshopminibackground{
            id,
            minibackgroundname,
            minibackgroundimage,
            minibackgroundpoint
          }
        }
      `
    })
  }

  getAllShopChatSticker():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getchatsticker{
          getallshopchatsticker{
            id,
            chatstickername,
            chatstickerimage,
            chatstickerpoint
          }
        }
      `
    })
  }

  getAllCommunityImageAndVideo():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getcomimageandvideo{
          getcommunityimageandvideo{
            id,
            userid,
            user{
              username,
              avatar
            },
            poster,
            source,
            description,
            liked,
            disliked
          }
        }
      `
    })
  }


  getCommunityImageAndVideoComment(contentid: number, offset: number, limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getcomimageandvideocomment($contentid: Int, $offset: Int, $limit: Int){
          getcommunityimageandvideocomment(contentid: $contentid, offset: $offset, limit: $limit){
            id,
            userid,
            user{
              username,
              avatar
            },
            contentid,
            comment,
          }
        }
      `,variables:{
        contentid,
        offset,
        limit
      }
    })
  }

  getAllCommunityImageAndVideoComment(contentid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getcomimageandvideocomment($contentid: Int){
          getallcommunityimageandvideocomment(contentid: $contentid){
            id,
            userid,
            user{
              username,
              avatar
            },
            contentid,
            comment,
          }
        }
      `,variables:{
        contentid,
      }
    })
  }

  getAllReviewCommentByReviewId(reviewid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getallreviewcommentbyreviewid($reviewid: Int){
          getallreviewcommentbyreviewid(reviewid: $reviewid){
            id,
          }
        }
      `,variables:{
        reviewid,
      }
    })
  }

  getReviewCommentByReviewIdOffsetLimit(reviewid: number, offset: number, limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getreviewcommentbyreviewidoffsetlimit($reviewid: Int, $offset: Int, $limit: Int){
          getreviewcommentbyreviewidoffsetlimit(reviewid: $reviewid, offset: $offset, limit: $limit){
            id,
            userid,
            user{
              username,
              avatar
            },
            reviewid,
            comment,
          }
        }
      `,variables:{
        reviewid,
        offset,
        limit
      }
    })
  }

  getAllDiscussion():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getalldiscussion{
        getalldiscussion{
          id,
          userid,
          user{
            id,
            username,
            avatar
          }
          gameid,
          game{
            id,
            name,
            image
          },
          discussiontitle,
          discussioncontent
          
        }
      }
      `
    })
  }

  getDiscussionsWithGameName(gamename: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getalldiscussion($gamename:String){
        getdiscussionswithgamename(gamename:$gamename){
          id,
          userid,
          user{
            id,
            username,
            avatar
          }
          gameid,
          game{
            id,
            name,
            image
          },
          discussiontitle,
          discussioncontent
        }
      }
      `,variables:{
        gamename,
      }
    })
  }

  getDiscussionsWithId(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getdiscussion($id:Int){
        getdiscussionswithid(id:$id){
          id,
          userid,
          user{
            id,
            username,
            avatar
          }
          gameid,
          game{
            id,
            name,
            image
          },
          discussiontitle,
          discussioncontent
        }
      }
      `,variables:{
        id
      }
    })
  }

  getDiscussionsCommentWithDiscussionId(discussionid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getdiscussioncomment($discussionid:Int){
        getdiscussionscommentwithdiscussionid(discussionid:$discussionid){
          id,
          userid,
          user{
            id,
            username,
            avatar
          },
          discussionid,
          comment
          
        }
      }
      `,variables:{
        discussionid
      }
    })
  }


  getAllUserItemWithGameId(token: string, gameid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getuseritem($token:String, $gameid: Int){
        getalluseritemwithgameid(token:$token, gameid:$gameid){
          id,
          userid,
          itemid,
          item{
            id,
            gameid,
            itemname,
            itemtransaction,
            itemprice,
            itemimage,
            itemdescription,
          }
        }
      }
      `,variables:{
        token,
        gameid
      }
    })
  }

  getUserItemWithGameIdOffsetLimit(token: string, gameid: number, offset: number, limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getuseritem($token:String, $gameid: Int, $offset: Int, $limit: Int){
        getuseritemwithgameidoffsetlimit(token:$token, gameid:$gameid, offset:$offset, limit:$limit){
          id,
          userid,
          itemid,
          item{
            id,
            gameid,
            itemname,
            itemtransaction,
            itemprice,
            itemimage,
            itemdescription,
          }
        }
      }
      `,variables:{
        token,
        gameid,
        offset,
        limit
      }
    })
  }


  getUserItemWithGameIdOffsetLimitByName(token: string, gameid: number, offset: number, limit: number, gamename: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getuseritem($token:String, $gameid: Int, $offset: Int, $limit: Int, $gamename: String){
        getuseritemwithgameidoffsetlimitbygamename(token:$token, gameid:$gameid, offset:$offset, limit:$limit, gamename:$gamename){
          id,
          userid,
          itemid,
          item{
            id,
            gameid,
            itemname,
            itemtransaction,
            itemprice,
            itemimage,
            itemdescription,
          }
        }
      }
      `,variables:{
        token,
        gameid,
        offset,
        limit,
        gamename
      }
    })
  }

  getUserItemWithGameIdByName(token: string, gameid: number, gamename: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getuseritem($token:String, $gameid: Int, $gamename: String){
        getuseritemwithgameidbygamename(token:$token, gameid:$gameid, gamename:$gamename){
          id,
        }
      }
      `,variables:{
        token,
        gameid,
        gamename
      }
    })
  }


  getBuyListingQuantityPriceByItemId(itemid: number):Observable<Query>{
    return this.apollo.watchQuery<Query>({
      query: gql`
      query getBuyListing($itemid:Int){
        getbuylistingquantityandpricebyitemid(itemid:$itemid){
          id,
          qty,
          price
        }
      }
      `,variables:{
        itemid
      }, pollInterval: 5000
    }).valueChanges
  }

  getSellListingQuantityPriceByItemId(itemid: number):Observable<Query>{
    return this.apollo.watchQuery<Query>({
      query: gql`
      query getSellListing($itemid:Int){
        getselllistingquantityandpricebyitemid(itemid:$itemid){
          qty,
          price
        }
      }
      `,variables:{
        itemid
      },pollInterval: 5000
    }).valueChanges
  }


  getBuyListingByUserId(token: string, itemid : number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getBuyListing($token:String, $itemid: Int){
        getbuylistingbyuserid(token:$token, itemid: $itemid){
          id,
          userid,
          itemid,
          quantity,
          price,
          user{
            username,
          }

        }
      }
      `,variables:{
        token,
        itemid
      }
    })
  }

  getSellListingByUserId(token: string, itemid : number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getSellListing($token:String, $itemid: Int){
        getselllistingbyuserid(token:$token, itemid: $itemid){
          id,
          userid,
          itemid,
          quantity,
          price,
          user{
            username,
          }

        }
      }
      `,variables:{
        token,
        itemid
      }
    })
  }

  getAllUserBadgeByUserId(token: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getUserBadge($token:String){
        getalluserbadgebyuserid(token:$token){
          id,
          userid,
          badgeimg,
          badgename,
          badgexp,
        }
      }
      `,variables:{
        token,
      }
    })
  }

  getUserBadgeById(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getUserBadge($id:Int){
        getuserbadgebyid(id:$id){
          id,
          userid,
          badgeimg,
          badgename,
          badgexp,
        }
      }
      `,variables:{
        id,
      }
    })
  }

  getBadgeCardById(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getUserBadgeCard($id:Int){
        getbadgecardbyid(id:$id){
          id,
          userbadgeid,
          card,
          status
        }
      }
      `,variables:{
        id,
      }
    })
  }



  checkIfThereIsSellListing(itemid: number, price : number, quantity : number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getChecked($itemid:Int, $price: Int, $quantity: Int){
        checkifthereisselllisting(itemid:$itemid, price: $price, quantity: $quantity)
      }
      `,variables:{
        itemid,
        price,
        quantity
      }
    })
  }



  // ADMIN
  getAdmin(username: string, password : string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query getAdmin($username:String, $password: String){
        getadmin(username:$username, password: $password)
      }
      `,variables:{
        username,
        password
      }
    })
  }




  // MUTATION


  /* INSERT */

  buySoldItem(token: string, itemid: number, quantity: number, price: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $itemid: Int, $quantity: Int, $price: Int){
          buysolditem(token:$token, itemid: $itemid, quantity:$quantity, price: $price)
        }
      `,
      variables:{
        token,
        itemid,
        quantity,
        price
      }
    })
  }


  insertBuyListing(token: string, itemid: number, quantity: number, price: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $itemid: Int, $quantity: Int, $price: Int){
          insertbuylisting(token:$token, itemid: $itemid, quantity:$quantity, price: $price)
        }
      `,
      variables:{
        token,
        itemid,
        quantity,
        price
      }
    })
  }

  insertSellListing(token: string, itemid: number, quantity: number, price: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $itemid: Int, $quantity: Int, $price: Int){
          insertselllisting(token:$token, itemid: $itemid, quantity:$quantity, price: $price)
        }
      `,
      variables:{
        token,
        itemid,
        quantity,
        price
      }
    })
  }

  insertDiscussion(token: string, gameid: number, discussiontitle: string, discussioncontent: string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $gameid: Int, $discussiontitle: String, $discussioncontent: String){
          insertdiscussion(token:$token, gameid: $gameid, discussiontitle:$discussiontitle, discussioncontent: $discussioncontent)
        }
      `,
      variables:{
        token,
        gameid,
        discussiontitle,
        discussioncontent
      }
    })
  }

  insertDiscussionsComment(token: string, discussionid: number, comment: string){
    return this.apollo.mutate({
      mutation: gql`
      mutation insert($token: String, $discussionid:Int, $comment: String){
        insertdiscussioncomment(token:$token, discussionid:$discussionid, comment:$comment){
          id,
          userid,
          user{
            id,
            username,
            avatar
          },
          discussionid,
          comment
          
        }
      }
      `,variables:{
        token,
        discussionid,
        comment
      }
    })
  }

  insertreviewcommentbyreviewid(token: string, reviewid: number, comment: string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token: String, $reviewid:Int, $comment: String){
          insertreviewcommentbyreviewid(token:$token, reviewid:$reviewid, comment:$comment)
        }
      `,
      variables:{
        token,
        reviewid,
        comment
      }
    })
  }

  insertCommunityImageAndVideoLike(contentid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($contentid:Int){
          insertcommunityimageandvideolike(contentid:$contentid)
        }
      `,
      variables:{
        contentid,
      }
    })
  }

  insertCommunityImageAndVideoDislike(contentid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($contentid:Int){
          insertcommunityimageandvideodislike(contentid:$contentid)
        }
      `,
      variables:{
        contentid,
      }
    })
  }

  insertCommunityImageAndVideoComment(token:string, contentid:number, comment:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $contentid:Int, $comment:String){
          insertcommunityimageandvideocomment(token:$token, contentid:$contentid, comment:$comment)
        }
      `,
      variables:{
        token,
        contentid,
        comment
      }
    })
  }


  insertUser(username:string, password:string, email:string, country:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($username:String, $password:String, $email:String, $country:String){
          insertuser(username:$username, password:$password, email:$email, country:$country){
            id,
            username,
            password,
            email,
            country
          }
        }
      `,
      variables:{
        username,
        password,
        email,
        country
      }
    })
  }

  insertUserFrame(token:string, frame:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $frame:String){
          insertuserframe(token:$token, frame:$frame)
        }
      `,
      variables:{
        token,
        frame
      }
    })
  }

  insertUserBackground(token:string, background:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $background:String){
          insertuserbackground(token:$token, background:$background)
        }
      `,
      variables:{
        token,
        background
      }
    })
  }

  insertUserMiniBackground(token:string, minibackground:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $minibackground:String){
          insertuserminibackground(token:$token, minibackground:$minibackground)
        }
      `,
      variables:{
        token,
        minibackground
      }
    })
  }

  insertRecentActivity(token:string, activity:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $activity:String){
          insertrecentactivity(token:$token, activity:$activity)
        }
      `,
      variables:{
        token,
        activity
      }
    })
  }

  insertRecentActivityById(userid:number, activity:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($userid:Int, $activity:String){
          insertrecentactivitybyid(userid:$userid, activity:$activity)
        }
      `,
      variables:{
        userid,
        activity
      }
    })
  }

  insertFriend(userid:number, friendid:number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insertFriend($userid:Int, $friendid:Int){
          insertfriend(userid:$userid, friendid:$friendid)
        }
      `,
      variables:{
        userid: userid,
        friendid: friendid
      }
    })
  }

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

  insertUserGameById(userid:number, gameid:number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insertMutation($userid:Int, $gameid:Int){
          insertusergamebyid(userid:$userid, gameid:$gameid)
        }
      `,
      variables:{
        userid: userid,
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

  insertReport(token:string, reportedid: number, reportreason:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $reportedid:Int, $reportreason: String){
          insertreport(token:$token, reportedid:$reportedid, reportreason:$reportreason)
        }
      `,
      variables:{
        token: token,
        reportedid,
        reportreason
      }
    })
  }


  insertFriendRequest(userid:number, friendid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($userid:Int, $friendid:Int){
          insertfriendrequest(userid:$userid, friendid:$friendid)
        }
      `,
      variables:{
        userid,
        friendid
      }
    })
  }

  insertFriendRequestIgnored(userid:number, friendid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($userid:Int, $friendid:Int){
          insertfriendrequestignored(userid:$userid, friendid:$friendid)
        }
      `,
      variables:{
        userid,
        friendid
      }
    })
  }

  insertChatNotification(userid:number, friendid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($userid:Int, $friendid:Int){
          insertchatnotification(userid:$userid, friendid:$friendid)
        }
      `,
      variables:{
        userid,
        friendid
      }
    })
  }

  insertGiftNotification(userid:number, friendid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($userid:Int, $friendid:Int){
          insertgiftnotification(userid:$userid, friendid:$friendid)
        }
      `,
      variables:{
        userid,
        friendid
      }
    })
  }

  insertCommentNotification(userid:number, friendid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($userid:Int, $friendid:Int){
          insertcommentnotification(userid:$userid, friendid:$friendid)
        }
      `,
      variables:{
        userid,
        friendid
      }
    })
  }

  insertItemNotification(userid:number, itemid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($userid:Int, $itemid:Int){
          insertitemnotification(userid:$userid, itemid:$itemid)
        }
      `,
      variables:{
        userid,
        itemid
      }
    })
  }

  insertComment(token:string, friendid: number, commentdesc: string){
    return this.apollo.mutate({
      mutation:gql`
        mutation insert($token:String, $friendid:Int, $commentdesc:String){
          insertcomment(token:$token, friendid:$friendid, commentdesc: $commentdesc){
            id,
            userid,
            commentdesc,
            person{
              id,
              username,
              avatar
            }
          }
        }
      `,
      variables:{
        token,
        friendid,
        commentdesc
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

  updateDecreaseUserPoint(token: string, point: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($token:String, $point: Int){
          decreasepoint(token:$token, point:$point)
        }     
      `,
      variables:{
        token: token,
        point
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


  updateUserAbout(id:number, username:string, realname:string, customurl:string, country:string, summary:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($id:Int, $username: String, $realname: String, $customurl: String, $country: String, $summary: String){
          updateuserabout(id:$id, username:$username, realname:$realname, customurl:$customurl, country:$country, summary:$summary)
        }     
      `,
      variables:{
        id,
        username,
        realname,
        customurl,
        country,
        summary  
      }
    })
  }

  updateUserAvatar(id:number, avatar:string, frame:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($id:Int, $avatar: String, $frame: String){
          updateuseravatar(id:$id, avatar:$avatar, frame:$frame)
        }     
      `,
      variables:{
        id,
        avatar,
        frame
      }
    })
  }

  updateUserBackground(id:number, background:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($id:Int, $background: String){
          updateuserbackground(id:$id, background:$background)
        }     
      `,
      variables:{
        id,
        background
      }
    })
  }

  updateUserMiniProfile(id:number, miniprofile:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($id:Int, $miniprofile: String){
          updateuserminiprofile(id:$id, miniprofile:$miniprofile)
        }     
      `,
      variables:{
        id,
        miniprofile
      }
    })
  }

  updateUserTheme(id:number, theme:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($id:Int, $theme: String){
          updateusertheme(id:$id, theme:$theme)
        }     
      `,
      variables:{
        id,
        theme
      }
    })
  }

  updateUserBadge(id:number, badgename:string){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($id:Int, $badgename: String){
          updateuserbadge(id:$id, badgename:$badgename)
        }     
      `,
      variables:{
        id,
        badgename
      }
    })
  }

  /* SAVE AVATAR */
  saveAvatar(encoded: string, filename: string){
    return this.apollo.mutate({
      mutation:gql`
        mutation update($encoded:String, $filename: String){
          saveavatar(encoded:$encoded, filename:$filename)
        }     
      `,
      variables:{
        encoded,
        filename
      }
    })
  }


  /* DELETE */

  deleteItemNotification(id: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation deleteMutation($id:Int){
          deleteitemnotification(id: $id)
        }
      `,
      variables:{
        id
      }
    })
  }

  deleteCommentNotification(userid:number, friendid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation deleteMutation($userid:Int, $friendid: Int){
          deletecommentnotification(userid:$userid, friendid: $friendid)
        }
      `,
      variables:{
        userid: userid,
        friendid
      }
    })
  }

  deleteGiftNotification(userid:number, friendid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation deleteMutation($userid:Int, $friendid: Int){
          deletegiftnotification(userid:$userid, friendid: $friendid)
        }
      `,
      variables:{
        userid: userid,
        friendid
      }
    })
  }

  deleteChatNotification(userid:number, friendid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation deleteMutation($userid:Int, $friendid: Int){
          deletechatnotification(userid:$userid, friendid: $friendid)
        }
      `,
      variables:{
        userid: userid,
        friendid
      }
    })
  }

  deleteFriendRequest(userid:number){
    return this.apollo.mutate({
      mutation:gql`
        mutation deleteMutation($userid:Int){
          deletefriendrequest(userid:$userid)
        }
      `,
      variables:{
        userid: userid,
      }
    })
  }

  deleteFriendRequest2(userid:number, friendid: number){
    return this.apollo.mutate({
      mutation:gql`
        mutation deleteMutation($userid:Int, $friendid:Int){
          deletefriendrequest2(userid:$userid, friendid: $friendid)
        }
      `,
      variables:{
        userid: userid,
        friendid
      }
    })
  }

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

  deleteGameFromWishlist(gameid:number){
    return this.apollo.mutate({
      mutation:gql`
        mutation deleteMutation($gameid:Int){
          deletegamefromwishlist(gameid:$gameid)
        }
      `,
      variables:{
        gameid
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

  subscriptionSetterMarket(itemid: number){
    return this.apollo.subscribe({
      query: gql`
        subscription sub($itemid:Int){
          getlastmarketactivity(itemid:$itemid){
            id,
            userid,
            itemid,
            activity,
            price,
            user{
              id,
              username,
              avatar
            }
          }
        }
      `,
      variables:{
        itemid,  // BISA KEK GINI
      }
    })
  }

  insertMarketActivity(userid: number, itemid: number, activity: string, price: number){
    return this.apollo.mutate({
      mutation: gql`
        mutation insertMarketActivity($userid:Int, $itemid:Int, $activity:String, $price:Int){
          insertmarketactivity(userid:$userid, itemid:$itemid, activity:$activity, price: $price)
        }
      `,
      variables:{
        userid,  // BISA KEK GINI
        itemid,
        activity,
        price
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

  getAllMarketActivity(itemid: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getAllMarketActivity($itemid:Int){
          getallmarketactivity(itemid:$itemid){
            id,
            userid,
            itemid,
            activity,
            price,
            user{
              id,
              username,
              avatar
            }
          }
        }
      `,
      variables:{
        itemid
      }
    })
  }


  // ADMIN
  insertGame(encoded: string, filename: string, title: string, description: string, price: number, tags: string){
    return this.apollo.mutate({
      mutation: gql`
        mutation insertGame($encoded:String, $filename:String, $title:String, $description:String, $price:Int, $tags: String){
          insertgame(encoded:$encoded, filename:$filename, title:$title, description: $description, price: $price, tags: $tags)
        }
      `,
      variables:{
        encoded,
        filename,
        title,
        description,
        price,
        tags
      }
    })
  }

  updateGame(id: number, encoded: string, filename: string, title: string, description: string, price: number, tags: string){
    return this.apollo.mutate({
      mutation: gql`
        mutation updateGame($id: Int, $encoded:String, $filename:String, $title:String, $description:String, $price:Int, $tags: String){
          updategame(id: $id, encoded:$encoded, filename:$filename, title:$title, description: $description, price: $price, tags: $tags)
        }
      `,
      variables:{
        id,
        encoded,
        filename,
        title,
        description,
        price,
        tags
      }
    })
  }

  deleteGame(id: number){
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteGame($id: Int!){
          deletegame(id:$id)
        }
      `,
      variables:{
        id
      }
    })
  }



  // 2
  getAllPromoGames(auth: string):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getPromoGames($auth:String){
          getallpromogames(auth:$auth){
            id,
            name,
            image,
            discount,
            price
          }
        }
      `,
      variables:{
        auth
      }
    })
  }

  getPromoGamesOffsetLimit(auth: string, offset: number, limit: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getPromoGames($auth:String, $offset: Int, $limit: Int){
          getpromogamesoffsetlimit(auth:$auth, offset:$offset, limit:$limit){
            id,
            name,
            image,
            discount,
            price
          }
        }
      `,
      variables:{
        auth,
        offset,
        limit
      }
    })
  }

  insertUpdateDeletePromo(id:number, promo:number){
    return this.apollo.mutate({
      mutation: gql`
        mutation insertUpdateDeletePromo($id: Int, $promo: Int){
          insertupdatedeletepromo(id:$id, promo:$promo)
        }
      `,
      variables:{
        id,
        promo
      }
    })
  }


  // 3

  getReportByReportedId(id: number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getReport($id:Int){
          getreportbyreportedid(id:$id){
            id,
            reportedid,
            reported{
              username,
              avatar,
            },
            reporterid,
            reporter{
              username,
              avatar,
            },
            reportreason
          }
        }
      `,
      variables:{
        id
      }
    })
  }


  getAllUnsuspendRequest():Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
        query getUnsuspendRequest{
          getallunsuspendrequest{
            id, 
            username,
            user{
              id,
              username,
              avatar,
            }
          }
        }
      `
    })
  }


  insertUnsuspendRequest(username: string){
    return this.apollo.mutate({
      mutation: gql`
        mutation insertUnsuspendRequest($username: String){
          insertunsuspendrequest(username:$username)
        }
      `,
      variables:{
        username
      }
    })
  }

  deleteUnsuspendRequest(id: number){
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteUnsuspendRequest($id: Int!){
          deleteunsuspendrequest(id:$id)
        }
      `,
      variables:{
        id
      }
    })
  }

  checkUserByUsername(username: string){
    return this.apollo.query<Query>({
      query: gql`
        query check($username: String){
          checkuserbyusername(username: $username)
        }
      `, variables:{
        username
      }
    })
  }

  deleteReportByReportedId(reportedid: number){
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteReport($reportedid: Int!){
          deletereportbyreportedid(reportedid:$reportedid)
        }
      `,
      variables:{
        reportedid
      }
    })
  }

}
