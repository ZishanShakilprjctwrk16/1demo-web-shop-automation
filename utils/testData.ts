export type TestUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
  country: string;
  city: string;
  address1: string;
  zip: string;
  phone: string;
};

export function generateUser(): TestUser {
  const unique = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

  return {
    firstName: 'Automation',
    lastName: 'Student',
    email: `automation.${unique}@example.com`,
    password: 'Test@123456',
    company: 'Automation Test Company',
    country: 'Bangladesh',
    city: 'Dhaka',
    address1: '123 Test Road',
    zip: '1207',
    phone: '01700000000'
  };
}
