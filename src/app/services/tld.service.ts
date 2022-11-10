import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { APIResponse } from '../interfaces/apiresponse';
import { RecognizeResponse } from '../interfaces/recognize-response';

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
}
