import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  items = [
    {
     id: 1,
     name: 'Jack',
    },
    {
      id: 2,
      name: 'Frank',
    },
    {
      id: 3,
      name: 'Izzy',
    }];

  constructor() { }

  ngOnInit() {
  }

  displayUser(user: {id: string; name: string}) {
    console.log(user);
    return user ? user.name : '';
  }
  onClick() {

  }
}
