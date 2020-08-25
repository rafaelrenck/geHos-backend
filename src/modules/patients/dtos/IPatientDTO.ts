export default interface IPatientDTO {
  patient: string;
  gender: string;
  date_of_birth: Date;
  mom: string;
  dad?: string;
  cpf?: string;
  rg?: string;
  cns?: string;
  telephone?: string;
  email?: string;
}
