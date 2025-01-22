import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http:HttpClient) { }
  get_api_data(){
    return this.http.get('http://localhost:3000/customerdata')
  }
  post_api_data(objdata:any){
    return this.http.post('http://localhost:3000/customerdata',objdata)
  }
  delete_api_data(id:any){
    return this.http.delete(`http://localhost:3000/customerdata/${id}`)
  }
  edit_api_dat(id:any,objdata:any){
    return this.http.put(`http://localhost:3000/customerdata/${id}`,objdata)
  }

}
