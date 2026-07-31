#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_settlement_waterfall() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);

    let contract_id = env.register(SettlementContract, ());
    let client = SettlementContractClient::new(&env, &contract_id);

    client.initialize(&admin);

    let record = client.process_repayment(&admin, &1, &10_000, &9_500);
    assert!(record.settled);
    assert_eq!(record.pool_principal_returned, 9_500);
    assert_eq!(record.yield_distributed, 400);
    assert_eq!(record.sme_residual_payout, 100);
}
