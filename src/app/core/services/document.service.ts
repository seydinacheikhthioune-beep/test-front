import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Récupère les PDF (reçus, rapports médicaux) et gère leur ouverture/impression. */
@Injectable({ providedIn: 'root' })
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/documents`;

  constructor(private http: HttpClient) {}

  recuFacture(factureId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/factures/${factureId}/recu`, { responseType: 'blob' });
  }

  rapportMedical(patientId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/patients/${patientId}/rapport-medical`, { responseType: 'blob' });
  }

  ouvrirEtImprimer(blob: Blob): void {
    const url = window.URL.createObjectURL(blob);
    const fenetre = window.open(url, '_blank');
    if (fenetre) {
      fenetre.onload = () => fenetre.print();
    }
  }

  imprimerPage(): void {
    window.print();
  }
}
