import { User } from './../../../../assets/classes/users';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[];
  filteredUsers: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = [];
    this.filteredUsers = [];
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      this.copyOriginal();
    })
  }

  filterItem(value){
    if(!value){
        this.copyOriginal();
    }
    this.filteredUsers = Object.assign([], this.users).filter(
       item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
 }
copyOriginal(){
  this.filteredUsers = Object.assign([], this.users);
}

}
