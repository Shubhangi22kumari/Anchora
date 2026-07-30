#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct SettlementRecord {
    pub invoice_id: u64,
    pub amount_paid: i128,
    pub pool_principal_returned: i128,
    pub yield_distributed: i128,
    pub sme_residual_payout: i128,
    pub timestamp: u64,
    pub settled: bool,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Settlement(u64),
}

#[contract]
pub struct SettlementContract;

#[contractimpl]
impl SettlementContract {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    pub fn process_repayment(
        env: Env,
        caller: Address,
        invoice_id: u64,
        invoice_amount: i128,
        advance_payout: i128,
    ) -> SettlementRecord {
        caller.require_auth();

        let admin: Address = env.storage().instance().get(&DataKey::Admin).expect("not initialized");
        if caller != admin {
            panic!("unauthorized oracle/settler");
        }

        if invoice_amount <= 0 || advance_payout >= invoice_amount {
            panic!("invalid invoice amounts for waterfall settlement");
        }

        let total_yield = invoice_amount - advance_payout;
        let pool_yield = (total_yield * 80) / 100;
        let sme_residual = total_yield - pool_yield;

        let record = SettlementRecord {
            invoice_id,
            amount_paid: invoice_amount,
            pool_principal_returned: advance_payout,
            yield_distributed: pool_yield,
            sme_residual_payout: sme_residual,
            timestamp: env.ledger().timestamp(),
            settled: true,
        };

        env.storage().instance().set(&DataKey::Settlement(invoice_id), &record);
        record
    }

    pub fn get_settlement(env: Env, invoice_id: u64) -> SettlementRecord {
        env.storage()
            .instance()
            .get(&DataKey::Settlement(invoice_id))
            .expect("settlement record not found")
    }
}
