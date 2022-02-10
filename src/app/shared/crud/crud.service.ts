import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { AuthService } from '../auth/auth.service';
import { environment } from './../../../environments/environment';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  private base_url:string= `${environment.apiURL}core/api/v1/`;
  headers = new HttpHeaders().set('Content-Type','application/json; charset=utf-8').set('Authorization', `Bearer ${this.authService.tokenSource.getValue()}`);

  constructor(
    protected _http: HttpClient,
    protected _base: string,
    protected authService: AuthService
  ) {
    this._base=this.base_url+this._base;
  }

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t,{headers:this.headers});
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + "/" + id, t, {headers:this.headers});
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + id, {headers:this.headers});
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base, {headers:this.headers});
  }

  findAllFilter(filter:String,page:number,size:number){
    return this._http.get<T[]>(this._base + "?filter="+filter+"&page="+page+"&size="+size, {headers:this.headers});
  }

  count(){
    return this._http.get<number>(this._base + "/count", {headers:this.headers});
  }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base + '/all', {headers:this.headers})
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id, {headers:this.headers});
  }

}
