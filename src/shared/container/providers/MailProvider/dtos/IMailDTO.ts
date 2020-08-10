import IMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface IMailDTO {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IMailTemplateDTO;
}
