import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  private base_url =
    "http://210.16.76.202:8080/";
  constructor(private http: HttpClient) { }
  post(data: any, url: string) {
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
}