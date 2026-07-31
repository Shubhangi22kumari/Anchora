#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_reputation_scoring() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let sme = Address::generate(&env);

    let contract_id = env.register_contract(None, ReputationContract);
    let client = ReputationContractClient::new(&env, &contract_id);

    client.initialize(&admin);

    let score = client.record_fulfillment(&admin, &sme, &10_000);
    assert_eq!(score, 775);

    let bps = client.get_recommended_discount_bps(&sme);
    assert_eq!(bps, 1000);
}
