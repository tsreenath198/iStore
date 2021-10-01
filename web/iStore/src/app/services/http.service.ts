import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private localIp: string = 'localhost';
  private prodIp: string = '210.16.76.202';
  private base_url = `http://${this.prodIp}:8081/`;
  constructor(private http: HttpClient,
    private toastr: ToastrService) { }
  post(data: any, url: string) {
    return this.http.post(this.base_url + url, data);
  }
  put(data: any, url: string) {
    return this.http.put(this.base_url + url, data);
  }
  postImage(url: string, data: any) {
    return this.http.post(this.base_url + url, data);
  }
  get(URL: string) {
    return this.http.get(this.base_url + URL);
  }
  update(data: any, URL) {
    return this.http.put(this.base_url + URL, data);
  }
  delete(URL: string) {
    return this.http.delete(this.base_url + URL);
  }
  successToastr(message: string, component: string) {
    this.toastr.success(message, component,{timeOut:1000});
  }
  errorToastr(message: string, component: string) {
    this.toastr.error(message, component,{timeOut:1000});
  }
}