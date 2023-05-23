import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private API_SERVER = 'http://localhost:8080/persona/';

  constructor(private httpClient: HttpClient) {}

  public save(persona: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + 'save', persona);
  }

  public findById(idPersona: number): Observable<any> {
    return this.httpClient.get(this.API_SERVER + 'findById/' + idPersona);
  }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + 'findAll');
  }

  public buscarPersonas(filtro: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + 'filter', filtro);
  }
}
