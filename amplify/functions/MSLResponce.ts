export class MSLResponce {
  id: string = '';
  name: string = '';
  title: string = '';
  email: string = '';
  phone: string = '';
  firstName: string = '';
  lastName: string = '';
  company: string = '';
  accountId: string = '';
  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.title) this.title = initializer.title;
    if (initializer.email) this.email = initializer.email;
    if (initializer.phone) this.phone = initializer.phone;
    if (initializer.firstName) this.firstName = initializer.firstName;
    if (initializer.lastName) this.lastName = initializer.lastName;
    if (initializer.company) this.company = initializer.company;
    if (initializer.accountId) this.accountId = initializer.accountId;
  }
}