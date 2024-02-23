export class PaymentProcessorError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UnsupportedPaymentProcessor extends PaymentProcessorError {
  constructor(processor: unknown) {
    super(`Unsupported processor ${processor} provided`);
  }
}
