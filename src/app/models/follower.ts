
export class Follower{
  userID?: number;
  followerUsername: string;
  followedUsername: string;
  followedUserID: string;

  constructor(userID: number, followerUsername: string, followedUsername: string, followedUserID: string) {
    this.userID = userID;
    this.followerUsername = followerUsername;
    this.followedUsername = followedUsername;
    this.followedUserID = followedUserID;
  }

}

