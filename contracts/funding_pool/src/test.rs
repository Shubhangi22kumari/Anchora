#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_funding_pool_flow() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let investor = Address::generate(&env);

    let contract_id = env.register_contract(None, FundingPoolContract);
    let client = FundingPoolContractClient::new(&env, &contract_id);

    client.initialize(&admin);

    let shares = client.deposit(&investor, &50_000);
    assert_eq!(shares, 50_000);

    let stats = client.get_pool_stats();
    assert_eq!(stats.total_liquidity, 50_000);

    let advance = client.allocate_to_invoice(&admin, &10_000, &500);
    assert_eq!(advance, 9500);

    let stats_after = client.get_pool_stats();
    assert_eq!(stats_after.allocated_capital, 9500);
}
