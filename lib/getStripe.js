import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe('pk_test_51L51iNSAEaJLLBxp3Yc4buaIa8s8GAcSSvGfg3otCNcT1vAN1CcMUaHd0fwWlOLlXJGGdy4zgEGcYKIRQvkAwjt800jSk4x2Dt');
  }

  return stripePromise;
}

export default getStripe;