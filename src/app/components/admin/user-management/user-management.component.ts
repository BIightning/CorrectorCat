import { User } from 'src/app/classes/users';
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
  currentUser: User;
  loaded: boolean = false;
  bShowModal:boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = [];
    this.filteredUsers = [];
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      this.copyOriginal();
      this.loaded = true;
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


onDeleteClick(user: User): void{
  this.bShowModal = true;
  this.currentUser = user;
  console.log(`show delete modal for book: ${user._id}`);
}

onDeleteConfirm(): void {
  
}

hideModal(): void {
 this.bShowModal = false;
}


}
