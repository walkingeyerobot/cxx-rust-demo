
use wasm_bindgen::prelude::*;
use js_sys::*;

extern crate mls_rs_crypto_webcrypto;
use rand::Rng;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;
use mls_rs::{
    client_builder::{ClientBuilder, MlsConfig},
    error::MlsError,
    identity::{
        basic::{BasicCredential, BasicIdentityProvider},
        SigningIdentity,
    },
    mls_rules::{CommitOptions, DefaultMlsRules},
    CipherSuite, CipherSuiteProvider, Client, CryptoProvider, ExtensionList,
};
use mls_rs_crypto_webcrypto::ec::EcSigner;
use mls_rs_crypto_webcrypto::WebCryptoProvider;
use mls_rs_crypto_webcrypto::CryptoError;
const CIPHERSUITE: CipherSuite = CipherSuite::P256_AES128;

use wasm_bindgen::prelude::*;
use web_sys::Window;

fn get_date() -> Date {
    Date::new(&"August 19, 1975 23:15:30".into())
}

#[wasm_bindgen]
pub fn grab_date() -> Date {
    return get_date();
}



async fn make_client<P: CryptoProvider + Clone>(
    crypto_provider: P,
    name: &str,
) -> Result<Client<impl MlsConfig>, MlsError> {
    let cipher_suite = crypto_provider.cipher_suite_provider(CIPHERSUITE).unwrap();

    let signer = EcSigner::new(CipherSuite::P256_AES128).unwrap();
    let (secret, public) = signer.generate().await.unwrap();
    //let (secret, public) = cipher_suite.signature_key_generate().await.unwrap_or();

    // Create a basic credential for the session.
    // NOTE: BasicCredential is for demonstration purposes and not recommended for production.
    // X.509 credentials are recommended.
    let basic_identity = BasicCredential::new(name.as_bytes().to_vec());
    let signing_identity = SigningIdentity::new(basic_identity.into_credential(), public);
    let mls_rules =
        DefaultMlsRules::default().with_commit_options(None.unwrap_or_default());

    Ok(ClientBuilder::new()
        .identity_provider(BasicIdentityProvider::new())
        .crypto_provider(crypto_provider.clone())
        .signing_identity(signing_identity, secret, CIPHERSUITE)
        .build())


        // let mut builder = ClientBuilder::new()
        // .crypto_provider(crypto.clone())
        // .identity_provider(BasicIdentityProvider::new())
        // .mls_rules(mls_rules)
        // .psk(
        //     ExternalPskId::new(TEST_EXT_PSK_ID.to_vec()),
        //     make_test_ext_psk().into(),
        // )
        // .used_protocol_version(protocol_version)
        // .signing_identity(identity, secret_key, cipher_suite);


}

pub async fn basic_mlsrs_usage() -> Result<(), MlsError> {
    let crypto_provider = mls_rs_crypto_webcrypto::WebCryptoProvider::default();

    // // Create clients for Alice and Bob
    let alice = make_client(crypto_provider.clone(), "alice").await?;
    let bob = make_client(crypto_provider.clone(), "bob").await?;

    // // Alice creates a new group.
    let bob_key_pkg = bob
    .generate_key_package_message(Default::default(), Default::default())
    .await
    .unwrap();


    let mut alice_group = alice
    .create_group_with_id(b"group".to_vec(), Default::default(), Default::default())
    .await
    .unwrap();

    let commit_builder = alice_group.commit_builder();

    let res = commit_builder
        .add_member(bob_key_pkg)
        .unwrap()
        .build()
        .await
        .unwrap();
    // println!("welcome object {:?}", res.proposals);

    // let welcome_builder = res.build().await.unwrap();
   //let js_welcome_builder = future_to_promise(welcome_builder);
        // .build()
        // .await
        // .unwrap();
        // .welcome_messages[0];

    // // Upon server confirmation, alice applies the commit to her own state
    // alice_group.apply_pending_commit().await.unwrap();

    // // Bob receives the welcome message and joins the group
    // let (bob_group, _) = bob.join_group(None, welcome).await.unwrap();

    Ok(())
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}


#[wasm_bindgen]
pub async fn basic_example() {
    let res = basic_mlsrs_usage().await;
    println!("Return value of basic_mlsrs_usage is: {:?}", res);
}

#[wasm_bindgen]
pub fn make_the_window_small() {
    // Resize the window to 500px by 500px.
    let window = web_sys::window().unwrap();
    window.btoa("a string")
        .expect("could not resize the window");
}