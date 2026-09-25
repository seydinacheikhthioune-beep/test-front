import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComptabiliteService } from '../../core/services/comptabilite.service';
import { Utilisateur } from '../../core/models/user.model';

@Component({ selector: 'app-employes', standalone: true, imports: [CommonModule, FormsModule], template: `
  <div class="d-flex justify-content-between align-items-center mb-3"><h4><i class="bi bi-person-badge"></i> Employés</h4><button class="btn btn-primary" (click)="formulaire = !formulaire"><i class="bi bi-plus-lg"></i> Nouvel employé</button></div>
  <div class="card p-3 mb-3" *ngIf="formulaire"><div class="row g-2">
    <div class="col-md-4"><input class="form-control" placeholder="Nom" [(ngModel)]="nouveau.nom"></div><div class="col-md-4"><input class="form-control" placeholder="Prénom" [(ngModel)]="nouveau.prenom"></div><div class="col-md-4"><input class="form-control" placeholder="Email" [(ngModel)]="nouveau.email"></div>
    <div class="col-md-4"><input class="form-control" placeholder="Numéro" [(ngModel)]="nouveau.telephone"></div><div class="col-md-4"><input class="form-control" placeholder="Profession" [(ngModel)]="nouveau.profession"></div><div class="col-md-4"><input class="form-control" type="number" placeholder="Taux horaire FCFA" [(ngModel)]="nouveau.tauxHoraire"></div>
    <div class="col-md-4"><input class="form-control" type="number" placeholder="Expérience (années)" [(ngModel)]="nouveau.anneesExperience"></div><div class="col-md-4"><input class="form-control" placeholder="Nom utilisateur" [(ngModel)]="nouveau.username"></div><div class="col-md-4"><input class="form-control" type="password" placeholder="Mot de passe" [(ngModel)]="nouveau.password"></div>
    <div class="col-md-4"><select class="form-select" [(ngModel)]="nouveau.role"><option value="EMPLOYE">Employé simple</option><option value="MEDECIN">Médecin</option></select></div><div class="col-12"><button class="btn btn-success" (click)="creer()">Enregistrer</button></div>
  </div></div>
  <div class="card"><div class="table-responsive"><table class="table mb-0"><thead><tr><th>Nom</th><th>Type</th><th>Profession</th><th>Email</th><th>Taux horaire</th><th>Téléphone</th></tr></thead><tbody><tr *ngFor="let e of employes"><td>{{ e.prenom }} {{ e.nom }}</td><td>{{ e.role === 'MEDECIN' ? 'Médecin' : 'Employé' }}</td><td>{{ e.profession || '-' }}</td><td>{{ e.email || '-' }}</td><td>{{ e.tauxHoraire ? (e.tauxHoraire | number:'1.0-0') + ' FCFA' : '-' }}</td><td>{{ e.telephone || '-' }}</td></tr></tbody></table></div></div>
  <div class="d-flex justify-content-between align-items-center mt-3"><small>Page {{ page + 1 }} / {{ totalPages || 1 }} ({{ totalElements }} employés)</small><div><button class="btn btn-sm btn-outline-secondary me-2" [disabled]="page === 0" (click)="charger(page - 1)">Précédent</button><button class="btn btn-sm btn-outline-secondary" [disabled]="page + 1 >= totalPages" (click)="charger(page + 1)">Suivant</button></div></div>
` })
export class EmployesComponent implements OnInit {
  employes: Utilisateur[] = []; page = 0; totalPages = 0; totalElements = 0; formulaire = false; nouveau: any = { role: 'EMPLOYE', actif: true };
  constructor(private service: ComptabiliteService) {}
  ngOnInit(): void { this.charger(0); }
  charger(page: number): void { this.page = page; this.service.employesPage(page, 8).subscribe(result => { this.employes = result.content; this.totalPages = result.totalPages; this.totalElements = result.totalElements; }); }
  creer(): void { this.service.creerEmploye(this.nouveau).subscribe(() => { this.nouveau = { role: 'EMPLOYE', actif: true }; this.formulaire = false; this.charger(this.page); }); }
}