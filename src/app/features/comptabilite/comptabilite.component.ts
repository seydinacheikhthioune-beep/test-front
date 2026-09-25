import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComptabiliteService } from '../../core/services/comptabilite.service';
import { ComptabiliteResume, PaiementEmploye } from '../../core/models/comptabilite.model';
import { Utilisateur } from '../../core/models/user.model';

@Component({
  selector: 'app-comptabilite', standalone: true, imports: [CommonModule, FormsModule],
  template: `
    <h4><i class="bi bi-calculator"></i> Comptabilité & employés</h4>
    <div class="row g-3 my-2" *ngIf="resume">
      <div class="col-md-3"><div class="card p-3"><small>Consultations</small><strong>{{ resume.totalConsultations | number:'1.0-0' }} FCFA</strong></div></div>
      <div class="col-md-3"><div class="card p-3"><small>Hospitalisations</small><strong>{{ resume.totalHospitalisations | number:'1.0-0' }} FCFA</strong></div></div>
      <div class="col-md-3"><div class="card p-3"><small>Paiements employés</small><strong>{{ resume.totalPaiementsEmployes | number:'1.0-0' }} FCFA</strong></div></div>
      <div class="col-md-3"><div class="card p-3"><small>Solde</small><strong>{{ resume.solde | number:'1.0-0' }} FCFA</strong></div></div>
    </div>
    <div class="row g-3"><div class="col-12"><div class="card p-3"><h6>Effectuer un paiement</h6>
        <select class="form-select mb-2" [(ngModel)]="paiement.employeId"><option [ngValue]="null">-- Employé --</option><option *ngFor="let e of employes" [ngValue]="e.id">{{ e.prenom }} {{ e.nom }} - {{ e.profession || e.role }}</option></select>
        <input class="form-control mb-2" type="number" placeholder="Montant FCFA" [(ngModel)]="paiement.montant">
        <input class="form-control mb-2" placeholder="Période (ex: Septembre 2026)" [(ngModel)]="paiement.periode">
        <input class="form-control mb-2" placeholder="Motif" [(ngModel)]="paiement.motif">
        <button class="btn btn-success" (click)="payer()">Enregistrer le paiement</button>
        <hr><h6>Historique traçable</h6><div *ngFor="let p of paiements" class="border-bottom py-2">{{ p.datePaiement | date:'dd/MM/yyyy HH:mm' }} - {{ p.employeNom }} : <strong>{{ p.montant | number:'1.0-0' }} FCFA</strong> ({{ p.periode }})</div>
      </div></div>
    </div>
  `
})
export class ComptabiliteComponent implements OnInit {
  resume?: ComptabiliteResume; employes: Utilisateur[] = []; paiements: PaiementEmploye[] = [];
  nouveau: any = { role: 'EMPLOYE', actif: true }; paiement: any = {};
  constructor(private service: ComptabiliteService) {}
  ngOnInit(): void { this.charger(); }
  charger(): void { this.service.resume().subscribe(r => this.resume = r); this.service.employes().subscribe(e => this.employes = e); this.service.paiements().subscribe(p => this.paiements = p); }
  creerEmploye(): void { this.service.creerEmploye(this.nouveau).subscribe(() => { this.nouveau = { role: 'EMPLOYE', actif: true }; this.charger(); }); }
  payer(): void { this.service.payer(this.paiement).subscribe(() => { this.paiement = {}; this.charger(); }); }
}