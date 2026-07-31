#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, BytesN, Env, Symbol};

#[test]
fn test_invoice_registry_flow() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let sme = Address::generate(&env);

    let contract_id = env.register_contract(None, InvoiceRegistryContract);
    let client = InvoiceRegistryContractClient::new(&env, &contract_id);

    client.initialize(&admin);
    assert_eq!(client.get_invoice_count(), 0);

    let buyer_id = Symbol::new(&env, "BUYER_A");
    let doc_hash = BytesN::from_array(&env, &[1u8; 32]);
    let inv_id = client.submit_invoice(&sme, &buyer_id, &100_000, &1700000000, &doc_hash);
    assert_eq!(inv_id, 1);
    assert_eq!(client.get_invoice_count(), 1);

    let verified = client.verify_and_tokenize(&1, &500, &admin);
    assert!(verified);

    let invoice = client.get_invoice(&1);
    assert_eq!(invoice.status, InvoiceStatus::Verified);
    assert_eq!(invoice.discount_rate_bps, 500);
}
