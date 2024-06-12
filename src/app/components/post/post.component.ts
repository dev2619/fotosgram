import { Component, Input, OnInit } from '@angular/core';
import { PostElement } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: PostElement = {};

  img1 = '/assets/perro-1.jpg'

  constructor() { }

   ngOnInit() { }

}
