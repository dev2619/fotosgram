import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL = environment.url

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, userId:string): string {
    return `${URL}/post/image/${userId}/${img}`;
  }

}
