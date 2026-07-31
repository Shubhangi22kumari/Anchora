#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[cfg(test)]
mod test;

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PoolStats {
    pub total_liquidity: i128,
    pub allocated_capital: i128,
    pub total_yield_earned: i128,
    pub active_invoices_count: u32,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InvestorPosition {
    pub investor: Address,
    pub deposited_amount: i128,
    pub pool_shares: i128,
    pub last_deposit_timestamp: u64,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Stats,
    Position(Address),
}

#[contract]
pub struct FundingPoolContract;

#[contractimpl]
impl FundingPoolContract {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);

        let initial_stats = PoolStats {
            total_liquidity: 0,
            allocated_capital: 0,
            total_yield_earned: 0,
            active_invoices_count: 0,
        };
        env.storage().instance().set(&DataKey::Stats, &initial_stats);
    }

    pub fn deposit(env: Env, investor: Address, amount: i128) -> i128 {
        investor.require_auth();
        if amount <= 0 {
            panic!("deposit amount must be positive");
        }

        let mut stats: PoolStats = env
            .storage()
            .instance()
            .get(&DataKey::Stats)
            .expect("not initialized");

        let mut pos: InvestorPosition = env
            .storage()
            .instance()
            .get(&DataKey::Position(investor.clone()))
            .unwrap_or(InvestorPosition {
                investor: investor.clone(),
                deposited_amount: 0,
                pool_shares: 0,
                last_deposit_timestamp: env.ledger().timestamp(),
            });

        stats.total_liquidity += amount;
        pos.deposited_amount += amount;
        pos.pool_shares += amount;
        pos.last_deposit_timestamp = env.ledger().timestamp();

        env.storage().instance().set(&DataKey::Stats, &stats);
        env.storage().instance().set(&DataKey::Position(investor), &pos);

        pos.pool_shares
    }

    pub fn withdraw(env: Env, investor: Address, amount: i128) -> i128 {
        investor.require_auth();
        let mut pos: InvestorPosition = env
            .storage()
            .instance()
            .get(&DataKey::Position(investor.clone()))
            .expect("position not found");

        if amount <= 0 || amount > pos.deposited_amount {
            panic!("invalid withdrawal amount");
        }

        let mut stats: PoolStats = env
            .storage()
            .instance()
            .get(&DataKey::Stats)
            .expect("not initialized");

        let available_unallocated = stats.total_liquidity - stats.allocated_capital;
        if amount > available_unallocated {
            panic!("insufficient pool unallocated liquidity");
        }

        stats.total_liquidity -= amount;
        pos.deposited_amount -= amount;
        pos.pool_shares -= amount;

        env.storage().instance().set(&DataKey::Stats, &stats);
        env.storage().instance().set(&DataKey::Position(investor), &pos);

        amount
    }

    pub fn allocate_to_invoice(env: Env, admin: Address, invoice_amount: i128, discount_rate_bps: u32) -> i128 {
        admin.require_auth();
        let current_admin: Address = env.storage().instance().get(&DataKey::Admin).expect("not initialized");
        if admin != current_admin {
            panic!("unauthorized admin");
        }

        let mut stats: PoolStats = env
            .storage()
            .instance()
            .get(&DataKey::Stats)
            .expect("not initialized");

        let advance_payout = (invoice_amount * (10000 - discount_rate_bps as i128)) / 10000;

        let available = stats.total_liquidity - stats.allocated_capital;
        if advance_payout > available {
            panic!("insufficient liquidity to fund invoice advance");
        }

        stats.allocated_capital += advance_payout;
        stats.active_invoices_count += 1;

        env.storage().instance().set(&DataKey::Stats, &stats);

        advance_payout
    }

    pub fn get_pool_stats(env: Env) -> PoolStats {
        env.storage()
            .instance()
            .get(&DataKey::Stats)
            .expect("not initialized")
    }

    pub fn get_investor_position(env: Env, investor: Address) -> InvestorPosition {
        env.storage()
            .instance()
            .get(&DataKey::Position(investor.clone()))
            .unwrap_or(InvestorPosition {
                investor,
                deposited_amount: 0,
                pool_shares: 0,
                last_deposit_timestamp: 0,
            })
    }
}
