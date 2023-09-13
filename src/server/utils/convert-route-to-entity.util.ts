const mapping: Record<string, string> = {
  accounts: 'account',
  blogs: 'blog',
  pricings: 'pricing',
  referrals: 'referral',
  subscriptions: 'subscription',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
