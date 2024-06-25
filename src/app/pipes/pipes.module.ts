import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImagePipe } from './image.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagePipe,
    DomSanitizerPipe
  ] 
})
export class PipesModule { }
