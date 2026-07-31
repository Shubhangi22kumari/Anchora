#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, BytesN, Env, Symbol};

#[cfg(test)]
mod test;

#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum InvoiceStatus {
    Pending = 0,
    Verified = 1,
    Funded = 2,
    Repaid = 3,
    Defaulted = 4,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Invoice {
    pub id: u64,
    pub sme: Address,
    pub buyer_id: Symbol,
    pub amount: i128,
    pub due_date: u64,
    pub discount_rate_bps: u32,
    pub status: InvoiceStatus,
    pub doc_hash: BytesN<32>,
    pub verified_by: Option<Address>,
}

#[contracttype]
pub enum DataKey {
    Admin,
    InvoiceCount,
    Invoice(u64),
}

#[contract]
pub struct InvoiceRegistryContract;

#[contractimpl]
impl InvoiceRegistryContract {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::InvoiceCount, &0u64);
    }

    pub fn submit_invoice(
        env: Env,
        sme: Address,
        buyer_id: Symbol,
        amount: i128,
        due_date: u64,
        doc_hash: BytesN<32>,
    ) -> u64 {
        sme.require_auth();
        if amount <= 0 {
            panic!("amount must be positive");
        }

        let mut count: u64 = env
            .storage()
            .instance()
            .get(&DataKey::InvoiceCount)
            .unwrap_or(0);
        count += 1;

        let invoice = Invoice {
            id: count,
            sme,
            buyer_id,
            amount,
            due_date,
            discount_rate_bps: 0,
            status: InvoiceStatus::Pending,
            doc_hash,
            verified_by: None,
        };

        env.storage().instance().set(&DataKey::Invoice(count), &invoice);
        env.storage().instance().set(&DataKey::InvoiceCount, &count);

        count
    }

    pub fn verify_and_tokenize(
        env: Env,
        invoice_id: u64,
        discount_rate_bps: u32,
        verifier: Address,
    ) -> bool {
        verifier.require_auth();
        
        let admin: Address = env.storage().instance().get(&DataKey::Admin).expect("not initialized");
        if verifier != admin {
            panic!("unauthorized verifier");
        }

        let mut invoice: Invoice = env
            .storage()
            .instance()
            .get(&DataKey::Invoice(invoice_id))
            .expect("invoice not found");

        if invoice.status != InvoiceStatus::Pending {
            panic!("invoice not in pending state");
        }

        invoice.status = InvoiceStatus::Verified;
        invoice.discount_rate_bps = discount_rate_bps;
        invoice.verified_by = Some(verifier);

        env.storage().instance().set(&DataKey::Invoice(invoice_id), &invoice);
        true
    }

    pub fn update_status(env: Env, invoice_id: u64, new_status: InvoiceStatus, caller: Address) {
        caller.require_auth();
        let mut invoice: Invoice = env
            .storage()
            .instance()
            .get(&DataKey::Invoice(invoice_id))
            .expect("invoice not found");

        invoice.status = new_status;
        env.storage().instance().set(&DataKey::Invoice(invoice_id), &invoice);
    }

    pub fn get_invoice(env: Env, invoice_id: u64) -> Invoice {
        env.storage()
            .instance()
            .get(&DataKey::Invoice(invoice_id))
            .expect("invoice not found")
    }

    pub fn get_invoice_count(env: Env) -> u64 {
        env.storage()
            .instance()
            .get(&DataKey::InvoiceCount)
            .unwrap_or(0)
    }
}
