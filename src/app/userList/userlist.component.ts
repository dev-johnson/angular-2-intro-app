import { Component } from '@angular/core';

@Component({
  template: `<dynamic-table [dataUrl] = "'https://jsonplaceholder.typicode.com/users'" [rejectColumns] = "['company', 'address', 'phone']"></dynamic-table>`
})

export class UserComponent {}
