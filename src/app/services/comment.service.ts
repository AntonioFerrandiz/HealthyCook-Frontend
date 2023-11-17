import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  myAppUrl: string;
  myApiUrl: string;
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl =  '/api/Comment/GetCommentById/';
   }

  getAllCommentsById(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.myAppUrl + this.myApiUrl + id);
  }

  addComment(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(this.myAppUrl + '/api/Comment/', comment);
  }
}
