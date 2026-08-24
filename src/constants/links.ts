/** TradeLocker login. Every "Trade" / "Trade Now" action sends the user here. */
export const TRADELOCKER_AUTH_URL =
  'https://auth.tradelocker.com/realms/tradelocker/protocol/openid-connect/auth?client_id=frontend-web-live&redirect_uri=https%3A%2F%2Flive.tradelocker.com%2Fes%2Fauth%2Flogin&scope=openid&response_type=code&state=Z7Q47IxNVirBk8Df&nonce=VArphfrP6k4G&code_challenge=wJrcfXsXiHzGARZ7-FnBp29diszBwGEt3StM7rICgnQ&code_challenge_method=S256'

export function openTradeLocker() {
  window.location.assign(TRADELOCKER_AUTH_URL)
}
