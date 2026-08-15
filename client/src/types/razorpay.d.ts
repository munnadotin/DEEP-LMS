type RazorpayOptions = {
    key: string;
    amount: number | string;
    currency: string;
    order_id: string;
    name: string;
    description: string;
    handler?: (response: Record<string, string>) => void | Promise<void>;
    prefill?: {
        name?: string;
        email?: string;
    };
    theme?: {
        color?: string;
    };
};

type RazorpayInstance = {
    open: () => void;
};

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

export { };