/* Module dependencies */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // provideds support for (ngIF, ngFor, ...)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
/* Components required */
import { AppComponent } from './app.component';
import { HomeComponent } from './homepage/home.component';
import { UserComponent } from './userList/userlist.component';
import { PostComponent } from './postList/postList.component';
import { CommentComponent } from './commentList/commentList.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
 /* Declaring the routes to the module */
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'posts', component: PostComponent },
  { path: 'comments', component: CommentComponent },

  { path: '**', component: HomeComponent }
]
/*
*The above Routing is implemented with child path
*
* comment routes and uncomment the routesChildren routes in  RouterModule
*
* Ref: https://angular-2-training-book.rangle.io/handout/routing/child_routes.html
*/
const routesChildren: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'users', component: UserComponent },
      { path: 'posts', component: PostComponent },
      { path: 'comments', component: CommentComponent }
    ]},

  { path: '**', component: HomeComponent } //wildcard routing
]

@NgModule({
  declarations: [ // used for registering the components
    AppComponent,
    DynamicTableComponent,
    HomeComponent,
    UserComponent,
    PostComponent,
    CommentComponent
  ],
  imports: [ // used to import other dependent modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // used for model driven forms
    HttpClientModule,
    RouterModule.forRoot(routesChildren)  //this routes enables the child routing within components
    // RouterModule.forRoot(routes)
  ],
  providers: [], // used for injecting the services
  bootstrap: [AppComponent] // bootstrap's the components
})
export class AppModule { }
