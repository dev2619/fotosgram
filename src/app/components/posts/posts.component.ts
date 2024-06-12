import { Component, Input, OnInit } from '@angular/core';
import { PostElement } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent  implements OnInit {

  @Input() posts: PostElement[] = [];

  constructor() { }

  ngOnInit() {
  }

}
