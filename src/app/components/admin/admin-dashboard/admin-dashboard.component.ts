import { StatusService } from './../../../services/status.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  bLoaded: boolean = false;
  dbConnected: boolean;
  gameletConnected: boolean;
  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.statusService.getDatabaseStatus().subscribe(res => {
      this.dbConnected = res;

      this.statusService.getGameletServerStatus().subscribe(res => {
        this.gameletConnected = res;
        this.bLoaded = true;
      });

    });

  }

}
