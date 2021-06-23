import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DataService {
  userdata:any;
  today = new Date();
  todayDate = `${String(this.today.getDate()).padStart(2, "0")}-${String(
    this.today.getMonth() + 1
  ).padStart(2, "0")}-${this.today.getFullYear()}`;
  api_uri = environment.cowin_api;
  constructor(private http: HttpClient) {}

  setData(data) {
    this.userdata = data;
    localStorage.setItem('userdata', JSON.stringify(data));
  }

  getUserD() {
    let user = localStorage.getItem('userdata')
    return JSON.parse(user);
  }

  getPinCode(pincode: any) {
    return this.http.get(`${this.api_uri}/appointment/sessions/public/calendarByPin`, {
      params: new HttpParams()
        .set("pincode", pincode)
        .set("date", this.todayDate),
    });
  }

  getStateList() {
    return this.http.get(`${this.api_uri}/admin/location/states`);
  }

  getDistrictList(stateId: any) {
    return this.http.get(`${this.api_uri}/admin/location/districts/${stateId}`);
  }
}
