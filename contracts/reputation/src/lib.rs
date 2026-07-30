#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct SMEReputation {
    pub sme: Address,
    pub score: u32,
    pub total_invoices: u32,
    pub fulfilled_on_time: u32,
    pub defaulted_count: u32,
    pub total_volume_funded: i128,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Reputation(Address),
}

#[contract]
pub struct ReputationContract;

#[contractimpl]
impl ReputationContract {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    pub fn record_fulfillment(env: Env, admin: Address, sme: Address, volume: i128) -> u32 {
        admin.require_auth();
        let current_admin: Address = env.storage().instance().get(&DataKey::Admin).expect("not initialized");
        if admin != current_admin {
            panic!("unauthorized caller");
        }

        let mut rep = env
            .storage()
            .instance()
            .get(&DataKey::Reputation(sme.clone()))
            .unwrap_or(SMEReputation {
                sme: sme.clone(),
                score: 750,
                total_invoices: 0,
                fulfilled_on_time: 0,
                defaulted_count: 0,
                total_volume_funded: 0,
            });

        rep.total_invoices += 1;
        rep.fulfilled_on_time += 1;
        rep.total_volume_funded += volume;
        rep.score = if rep.score + 25 > 1000 { 1000 } else { rep.score + 25 };

        env.storage().instance().set(&DataKey::Reputation(sme), &rep);
        rep.score
    }

    pub fn record_default(env: Env, admin: Address, sme: Address) -> u32 {
        admin.require_auth();
        let current_admin: Address = env.storage().instance().get(&DataKey::Admin).expect("not initialized");
        if admin != current_admin {
            panic!("unauthorized caller");
        }

        let mut rep = env
            .storage()
            .instance()
            .get(&DataKey::Reputation(sme.clone()))
            .unwrap_or(SMEReputation {
                sme: sme.clone(),
                score: 750,
                total_invoices: 0,
                fulfilled_on_time: 0,
                defaulted_count: 0,
                total_volume_funded: 0,
            });

        rep.total_invoices += 1;
        rep.defaulted_count += 1;
        rep.score = if rep.score < 200 { 100 } else { rep.score - 200 };

        env.storage().instance().set(&DataKey::Reputation(sme), &rep);
        rep.score
    }

    pub fn get_recommended_discount_bps(env: Env, sme: Address) -> u32 {
        let rep = env
            .storage()
            .instance()
            .get(&DataKey::Reputation(sme.clone()))
            .unwrap_or(SMEReputation {
                sme,
                score: 750,
                total_invoices: 0,
                fulfilled_on_time: 0,
                defaulted_count: 0,
                total_volume_funded: 0,
            });

        if rep.score >= 900 {
            500 // Tier A+ (5%)
        } else if rep.score >= 800 {
            800 // Tier A (8%)
        } else if rep.score >= 700 {
            1000 // Tier B (10%)
        } else if rep.score >= 600 {
            1500 // Tier C (15%)
        } else {
            2500 // Tier D (25%)
        }
    }

    pub fn get_reputation(env: Env, sme: Address) -> SMEReputation {
        env.storage()
            .instance()
            .get(&DataKey::Reputation(sme.clone()))
            .unwrap_or(SMEReputation {
                sme,
                score: 750,
                total_invoices: 0,
                fulfilled_on_time: 0,
                defaulted_count: 0,
                total_volume_funded: 0,
            })
    }
}
