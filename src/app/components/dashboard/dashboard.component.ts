import { Router } from "@angular/router";
import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  template: `
    <div class="card">
      <div class="card-header mb-0 d-flex justify-content-around">
        <div class="card-title">
          <h4>{{ user.name }}, {{ user.pincode }}</h4>
          <p class="card-subtitle">{{ user.email }}</p>
        </div>

        <div class="d-flex justify-content-end">
          <img
            src="assets/images/logo.png"
            class="img"
            height="60px"
            alt="logo"
          />
        </div>
      </div>
      <div class="card-body table-responsive">
        <table class="table table-sm table-striped">
          <thead>
            <th>Pincode</th>
            <th>District Name</th>
            <th>Center Name</th>
            <th>Fee Type</th>
            <th>State Name</th>
            <th>Vaccine</th>
            <th>Age Limit</th>
            <th>Slots</th>
          </thead>
          <tbody>
            <tr
              *ngFor="
                let center of centersData
                  | slice
                    : (paginationObj.page - 1) * paginationObj.pageSize
                    : (paginationObj.page - 1) * paginationObj.pageSize +
                        paginationObj.pageSize
              "
            >
              <td>{{ center.pincode }}</td>
              <td>{{ center.district_name }}</td>
              <td>{{ center.name }}</td>
              <td>{{ center.fee_type }}</td>
              <td>{{ center.state_name }}</td>
              <td>{{ center.sessions[0].vaccine }}</td>
              <td>{{ center.sessions[0].min_age_limit }}</td>
              <td>{{ center.sessions[0].available_capacity }}</td>
            </tr>
          </tbody>
        </table>
        <div
          class="text-center d-flex justify-content-center"
          *ngIf="centersData?.length === 0"
        >
          <p>No Data Avaliable for Current Pincode</p>
        </div>
        <ngb-pagination
          *ngIf="centersData?.length > 10"
          [(page)]="paginationObj.page"
          [pageSize]="paginationObj.pageSize"
          [collectionSize]="centersData?.length"
          [maxSize]="5"
          [boundaryLinks]="true"
        >
        </ngb-pagination>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-primary btn-sm"
          (click)="backToLogin()"
        >
          <i class="fa fa-arrow-circle-left"></i> Back
        </button>
        <button
          type="button"
          class="btn btn-info ml-2 btn-sm"
          (click)="getData()"
        >
          <i class="fa fa-repeat" [ngClass]="{ 'fa-spin': dataLoaded }"></i>
          Update Data
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  user;
  centersData;
  dataLoaded = false;
  paginationObj = {
    page: 1,
    pageSize: 10,
    collectionSize: 0,
    reverse: true,
  };
  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.ds.getUserD();
    this.getData();
  }

  backToLogin() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  getData() {
    this.dataLoaded = true;
    this.ds.getPinCode(this.user.pincode).subscribe(
      (res: any) => {
        this.centersData = res.centers;
        this.dataLoaded = false;
      },
      (err) => {
        this.dataLoaded = false;
      }
    );
  }
}
