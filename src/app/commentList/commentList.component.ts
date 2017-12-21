import { Component } from '@angular/core';

@Component({
  template: `<dynamic-table [dataUrl] = "'https://jsonplaceholder.typicode.com/comments'" [rejectColumns] = "['postId', 'body']"></dynamic-table>`
})

export class CommentComponent {}
