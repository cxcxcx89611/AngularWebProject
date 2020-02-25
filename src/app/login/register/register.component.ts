import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  items: string[];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const img = 'avatars:svg-1';
    const nums = [1, 2];
    this.items = nums.map(d => `avatar${d}`);
    this.form = this.fb.group({
      email: [],
      dnumber: [],
      password: [],
      passwordrepeat: [],
      avatar: [img],
      dateOfBirth: ['1990-01-01']
    })
  }
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }

}
