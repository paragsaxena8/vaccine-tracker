import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  template: `
    <div class="d-lg-flex">
      <div class="col-lg-7 col-sm-12 px-0">
        <div class="bg-banner text-white vh-100 p-4">
          <h2>Vaccine Tracker</h2>
          <p class="w-50">
            Find all the important information and all the things related to
            COVID Vaccine here.
          </p>
        </div>
      </div>
      <div class="col-lg-5 col-sm-12 vh-100">
        <form
          class="form"
          #login="ngForm"
          (ngSubmit)="submit(login)"
          ngNativeValidate
        >
          <div class="d-flex justify-content-center">
            <img
              src="assets/images/logo.png"
              class="img-fluid"
              height="80px"
              alt="logo"
            />
          </div>
          <div class="form-group">
            <label class="col-form-label">Name*</label>
            <input
              type="text"
              [(ngModel)]="inputObj.name"
              placeholder="Enter Name"
              class="form-control"
              name="name"
              required
            />
          </div>
          <div class="form-group">
            <label class="col-form-label">Email*</label>
            <input
              type="email"
              [(ngModel)]="inputObj.email"
              placeholder="Enter Email"
              class="form-control"
              #email
              required
              name="email"
            />
          </div>
          <div class="form-group">
            <label class="col-form-label">Pincode*</label>
            <input
              type="number"
              [(ngModel)]="inputObj.pincode"
              placeholder="Enter your Pincode"
              class="form-control"
              name="pincode"
              required
            />
          </div>

          <div class="form-group mt-5">
            <button type="submit" class="btn btn-primary btn-block">
              Show Statistics
            </button>
            <button
              type="button"
              class="btn btn-danger btn-block mt-lg-4"
              (click)="reset(login)"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(private ds: DataService, private router: Router) {}

  inputObj = {
    name: "",
    email: "",
    pincode: null,
  };

  ngOnInit(): void {}

  submit(form: NgForm) {
    console.log("obj", this.inputObj);
    this.ds.setData(this.inputObj);
    this.router.navigate(["/dashboard"]);
  }

  reset(form: NgForm) {
    form.reset();
  }
}
