import { Component } from '@angular/core';

@Component({
  template: `<dynamic-table [dataUrl] = "'https://jsonplaceholder.typicode.com/posts'" [rejectColumns] = "['userId', 'body']"></dynamic-table>`
})

export class PostComponent {}
