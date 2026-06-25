use anchor_lang::prelude::*;
#[account]
pub struct TokenState{
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub supply: u64,
    pub description: String,
    pub logo_url: String,
    pub metadata_url: String,
}