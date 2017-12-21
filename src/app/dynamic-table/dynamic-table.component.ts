import { Component, OnInit, Input} from '@angular/core';
import { DynamicTableService } from './dynamic-table.service';
// use this only for model driven forms (here used for an example)
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dynamic-table',
  providers: [DynamicTableService],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})

export class DynamicTableComponent implements OnInit {

  list = {};
  editable = {};
  showForm = false;
  createbtn = true;
  editbtn = false;
  editItem = null;

  // model driven form

  userFrom =  new FormGroup({
    firstname: new FormControl('Johnson', Validators.required), // the first param is deafult val and second is the validators
    lastname: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]), // validators can also be array
    email: new FormControl(),
    address: new FormGroup({
      street: new FormControl(),
      postal: new FormControl(null, [Validators.pattern('^[1-9][0-9]{3}'), Validators.required])
    })
  })

  // delcaring the attributes used for retriving data from parent component using @Input()
  @Input() rejectColumns: string[];
  @Input() dataUrl: string[];

  constructor(private dataProvider: DynamicTableService) { }

  ngOnInit() {
    this.getList(); // populate the list for table generation
  }

  getList() {
    this.dataProvider.getData(this.dataUrl, this.rejectColumns)
      .subscribe(data =>
        {
          this.list = data;
        }, error => {
          console.log(error.message);
        });
  }

  // new item addition
  addtoList(formData) {
    let data = this.dataProvider.addItem(formData)
    this.list['records'].push(data);
    this.showForm = false;
    formData = {};
  }

  // edit the existing record
  editList(index) {
    let selected = this.list['records'][index]
    this.showForm = true;
    this.editItem = index;
    for(let rec in selected){
      this.editable[rec] = selected[rec];
    }
  }

  // update the eddited list
  updateList(formData, editItem){
    let updatedData = this.dataProvider.updateItem(formData)
    this.list['records'][editItem] = updatedData;
    this.editable = {};
    this.showForm = false;
  }

  // remove record from list
  removeformList(index) {
    if (confirm("Do you want to delete ?")) {
      this.list['records'].splice(index, 1);
    }
  }

  mdfTest(data) {
    console.log(this.userFrom.value);
  }
}
