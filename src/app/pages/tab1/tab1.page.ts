import { Component, OnInit } from '@angular/core';
import { PostElement } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  posts: PostElement[] = [];
  enable = true;

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.onIonInfinite();
  }
  onIonInfinite(event?: any, pull: boolean = false) {
    this.postService.getPosts(pull).subscribe(resp => {
      this.posts.push(...resp.posts);
      if (event) {
        event.target.complete();
        if (resp.posts.length === 0) {
          this.enable = false;
        }
      }

    });

  }
  handleRefresh(event: any) {
    this.posts = [];
    this.enable = true;
    this.onIonInfinite(event, true);
  }
}
