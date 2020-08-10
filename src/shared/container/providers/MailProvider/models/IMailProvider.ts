import IMailDTO from '@shared/container/providers/MailProvider/dtos/IMailDTO';

export default interface IMailProvider {
  sendMail(data: IMailDTO): Promise<void>;
}
