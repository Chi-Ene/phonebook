import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from './data';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Phone Book';
  lastId = 0;

  data: Data[];
  selectedContact: Data;

  addForm: FormGroup;

  actionTitle = 'Add Contact';

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    // this.getData();
    this.data = this.dataService.getData();

    this.addForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: [''],
    });
  }

  getUniqueId = () => this.lastId++;

  onSubmit() {
    const data: Data = { ...this.addForm.value};

    if (this.actionTitle === 'Add Contact') {
      console.log('testing', data);
      this.dataService.saveData(data);
      this.data = this.dataService.getData();
    } else {
      this.dataService.updateData(data);
      console.log('edit', data);
      this.data = this.dataService.getData();
    }
    this.addForm.reset();
    this.actionTitle = 'Add Contact';
  }

  deleteItem(id) {
    console.log('delete test');
    this.dataService.deleteData(id);
    this.data = this.dataService.getData();
  }

  onSelect(contact: Data) {
    // Set the selectedContact property to the clicked row data
    this.selectedContact = contact;

    // Patch the input fields with the selectedContact data
    this.addForm.patchValue({
      name: this.selectedContact.name,
      phoneNumber: this.selectedContact.phoneNumber,
      email: this.selectedContact.email,
      id: this.selectedContact.id
    });

    this.actionTitle = 'Edit Contact';
  }

  // updateForm() {
  //   this.onSelect(this);

  // }
}
