import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { APIResponse } from '../interfaces/apiresponse';
import { RecognizeResponse } from '../interfaces/recognize-response';
import { Vote } from '../interfaces/vote';
import { Result } from '../interfaces/result';

@Injectable({
  providedIn: 'root',
})
export class TLDService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  checkOCR(ocr: string): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.baseUrl + 'main/api/verify', {
      ocr,
    });
  }

  checkFace(token: string, base64: string ): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.baseUrl + 'main/api/recognize', 
    {
      token,
      face: base64
    });
  }

  vote( vote: Vote ): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.baseUrl + 'main/api/vote', vote );
  }

  getResults(): Observable<Result[]> {
    return this.http.get<Result[]>(this.baseUrl + 'main/api/retriever' );
  }
}
