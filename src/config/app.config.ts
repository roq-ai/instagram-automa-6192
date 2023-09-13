interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Team Admin'],
  customerRoles: ['Trial'],
  tenantRoles: ['Team Member'],
  tenantName: 'Account',
  applicationName: 'Instagram Automation',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Register and start using the application',
    "View application's capabilities on the landing page",
    'Access detailed pricing page',
  ],
  ownerAbilities: [
    'Invite team members',
    'Manage subscription updates',
    'Monitor sign-ups and purchases',
    'Adjust pricing structure',
    'Track user activity and expected MRR',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/a18d1caf-6b60-47f4-adbb-2b06c0e36cb8',
};
