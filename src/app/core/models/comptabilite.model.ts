export interface ComptabiliteResume {
  totalFactures: number;
  totalConsultations: number;
  totalHospitalisations: number;
  totalPaiementsEmployes: number;
  solde: number;
}

export interface PaiementEmploye {
  id?: number;
  employeId: number;
  employeNom: string;
  montant: number;
  periode: string;
  motif?: string;
  datePaiement: string;
}