/*
  Redbelly Explained: content for all 11 infographics.

  Edit the words here, then run `npm run build` to rebuild every file.
  House rules (Task Board voice): plain language, no em or en dashes, no emoji,
  say the number, lead with the answer. Keep it short: every line has to stay
  at 11 pt or more when the image is shown on a phone (tools/check.mjs).

  Each topic carries:
    title, lead     the headline and the one sentence answer
    visual          the diagram type and its words (see build.js)
    labels          printed words that only name a column, lane or role and
                    make no claim of their own (tools/check-claims.mjs skips them)
    foot            the short source line printed on the artwork
    facts           every claim on the artwork:
                      claim  what the infographic says, in full
                      src    the page it comes from (a key of RX.src)
                      quote  words copied from that page (tools/verify-sources.mjs
                             finds them on the live page)
                      on     the exact printed lines this fact supports
                             (tools/check-claims.mjs traces every printed line
                             to at least one fact)
                      when   optional: a condition the source attaches to the
                             claim, which must also be printed on the artwork
*/
window.RX = window.RX || {};

RX.verified = "31 Oct 2026";

RX.src = {
  home:       { name: "Redbelly Network website", url: "https://redbelly.network" },
  wpPage:     { name: "Redbelly whitepaper page", url: "https://redbelly.network/whitepaper" },
  wpPdf:      { name: "Redbelly whitepaper (PDF, 28 Aug 2025)", url: "https://redbelly.network/redbelly-network-whitepaper.pdf" },
  research:   { name: "Redbelly research hub", url: "https://redbelly.network/research" },
  rsSecure:   { name: "Research: Redbelly, A Secure, Fair and Scalable Open Blockchain", url: "https://redbelly.network/research/redbelly-a-secure-fair-and-scalable-open-blockchain" },
  rsDbft:     { name: "Research: DBFT, Efficient Leaderless Byzantine Consensus", url: "https://redbelly.network/research/dbft-ef-cient-leaderless-byzantine-consensus" },
  rsHolistic: { name: "Research: Holistic Verification of Blockchain Consensus", url: "https://redbelly.network/research/holistic-verification-of-blockchain-consensus" },
  rsPolygraph: { name: "Research: Polygraph, Accountable Byzantine Agreement", url: "https://redbelly.network/research/polygraph-accountable-byzantine-agreement" },
  docs:       { name: "Redbelly docs", url: "https://docs.redbelly.network" },
  receptor:   { name: "Redbelly docs: Receptor overview", url: "https://docs.redbelly.network/pages/receptor/" },
  issuer:     { name: "Redbelly docs: Issuer module", url: "https://docs.redbelly.network/pages/modules/issuer/" },
  holder:     { name: "Redbelly docs: Holder module", url: "https://docs.redbelly.network/pages/modules/holder/" },
  pbq:        { name: "Redbelly docs: Proof by Query", url: "https://docs.redbelly.network/pages/methods/proof-by-query/" },
  sdzk:       { name: "Redbelly docs: Selective disclosure vs zero knowledge", url: "https://docs.redbelly.network/pages/eligibility-sdk/selective-disclosure-vs-zero-knowledge/" },
  eligKit:    { name: "Redbelly docs: Eligibility Kit overview", url: "https://docs.redbelly.network/pages/eligibility-sdk/overview/" },
  tkHome:     { name: "Tokeniser website", url: "https://tokeniser.com" },
  tkProduct:  { name: "Tokeniser: product", url: "https://tokeniser.com/product" },
  tkTech:     { name: "Tokeniser: our technology", url: "https://tokeniser.com/technology" },
  tkComp:     { name: "Tokeniser: automated compliance", url: "https://tokeniser.com/product/superpowers/automated-compliance" },
  assetTok:   { name: "Redbelly asset tokenisation", url: "https://redbelly.network/asset-tokenisation" },
  acacia:     { name: "Redbelly Project Acacia page", url: "https://redbelly.network/projectacacia" },
  task07:     { name: "TASK-07 Project Acacia deep dive (winning entry)", url: "https://khalyd.substack.com/p/redbelly-network-and-the-rbas-project" },
  task23:     { name: "TASK-23 DAO structural changes changelog (sourced to 1 Aug 2026)", url: "https://redbelly.smartcodedbot.com/changelog/" },
  vote:       { name: "DAO voting platform", url: "https://redbelly-governance.vercel.app/" },
  voteCreate: { name: "DAO voting platform: new proposal form", url: "https://redbelly-governance.vercel.app/create" },
  voteSafety: { name: "DAO voting platform: wallet safety", url: "https://redbelly-governance.vercel.app/safety" },
  voteList:   { name: "DAO voting platform: proposals", url: "https://redbelly-governance.vercel.app/proposals" },
  voteOpov:   { name: "DAO voting platform: proposal counted as one verified address, one vote", url: "https://redbelly-governance.vercel.app/proposal/13eebe46-d2e2-4fd2-9f18-1e202d3dce36" },
  voteImported: { name: "DAO voting platform: a proposal imported from Snapshot", url: "https://redbelly-governance.vercel.app/proposal/5f0845f0-7bc3-4db7-a79e-0fdb74613c1f" }
};

RX.topics = [
  /* ------------------------------------------------------------------ 01 */
  {
    n: 1,
    slug: "what-is-redbelly",
    title: "What is Redbelly?",
    lead: "A public layer 1 blockchain, built for tokenising real world assets.",
    visual: {
      type: "hub",
      core: { name: "Redbelly Network" },
      items: [
        { icon: "bond",      title: "Real world assets",   text: "Bonds, credit, real estate." },
        { icon: "idbadge",   title: "Identity verified",   text: "Every participant is known." },
        { icon: "lockblock", title: "Final in seconds",    text: "DBFT consensus. No forks." },
        { icon: "code",      title: "Ethereum compatible", text: "Runs Solidity smart contracts." }
      ],
      note: "Born at the University of Sydney, developed with CSIRO."
    },
    labels: ["Redbelly Network"],
    foot: ["Redbelly whitepaper", "Redbelly docs"],
    facts: [
      { claim: "Redbelly is a layer 1 blockchain built for real world asset tokenisation.", src: "docs", quote: "The Redbelly Network is a layer 1 blockchain, built and optimised for real world asset tokenisation.",
        on: ["A public layer 1 blockchain, built for tokenising real world assets."] },
      { claim: "Redbelly is a public network.", src: "tkTech", quote: "No. Redbelly is a public network",
        on: ["A public layer 1 blockchain, built for tokenising real world assets."] },
      { claim: "Real world assets on Redbelly include bonds, (private) credit and real estate.", src: "home", quote: "TREASURIES & BONDS PRIVATE CREDIT CARBON CREDITS DERIVATIVES & COMMODITIES INSURANCE REAL ESTATE",
        on: ["Real world assets", "Bonds, credit, real estate."] },
      { claim: "Identity verified: every participant on the network is known.", src: "wpPdf", quote: "all network participants are known. We enforce mandatory identity verification for all network participants",
        on: ["Identity verified", "Every participant is known."] },
      { claim: "Final in seconds: transactions are confirmed as irreversible within seconds.", src: "wpPdf", quote: "transactions are confirmed as irreversible within seconds",
        on: ["Final in seconds"] },
      { claim: "The consensus is DBFT and the chain cannot fork.", src: "wpPdf", quote: "Democratic Byzantine Fault Tolerant (DBFT) consensus. DBFT is a significant leap in the capabilities of blockchain technology. As a leaderless consensus algorithm, it eliminates single points of failure while enabling exceptional throughput and near-instant finality [1]. It cannot fork",
        on: ["DBFT consensus. No forks."] },
      { claim: "Ethereum compatible, through an Ethereum Virtual Machine.", src: "wpPdf", quote: "Ethereum compatibility through the Scalable Ethereum Virtual Machine (SEVM)",
        on: ["Ethereum compatible"] },
      { claim: "Runs Solidity smart contracts.", src: "wpPdf", quote: "This includes the largest pool of developers already proficient in the Solidity programming language",
        on: ["Runs Solidity smart contracts."] },
      { claim: "Born at the University of Sydney.", src: "rsSecure", quote: "Redbelly was born at the University of Sydney",
        on: ["Born at the University of Sydney, developed with CSIRO."] },
      { claim: "Developed with CSIRO (its Data61 unit).", src: "wpPage", quote: "developed with The University of Sydney and CSIRO’s Data61",
        on: ["Born at the University of Sydney, developed with CSIRO."] }
    ]
  },

  /* ------------------------------------------------------------------ 02 */
  {
    n: 2,
    slug: "why-tokenise-real-world-assets",
    title: "Why tokenise real world assets?",
    lead: "A token records who owns an asset and can carry its rules. The benefits depend on the setup.",
    visual: {
      type: "compare",
      left: "Today",
      right: "Tokenised",
      needs: "Only if",
      rows: [
        { icon: "clock",     label: "Settlement", before: "A bond trade can take 2 to 4 days", after: "Asset and payment swap in one step", needs: "The payment is on the same ledger" },
        { icon: "checklist", label: "Rules",      before: "Rule breaches often found late",            after: "Checked before every trade",        needs: "Identity is built into the network" },
        { icon: "pie",       label: "Access",     before: "Higher minimums to invest",                 after: "Fractions, traded 24/7",            needs: "A market runs 24/7" }
      ]
    },
    labels: ["Today", "Tokenised", "Only if", "Settlement", "Rules", "Access"],
    foot: ["tokeniser.com", "TASK-07", "whitepaper"],
    facts: [
      { claim: "Tokenisation records ownership as digital tokens and lets the asset's rules be programmed.", src: "tkHome", quote: "Tokenisation records ownership of financial products and services as digital tokens, and lets you program the rules of the asset.",
        on: ["A token records who owns an asset and can carry its rules."] },
      { claim: "The benefits depend on the setup around the token: the payment on the same ledger for one step settlement, identity in the network for rule checks, a market for 24/7 trading (the three rows of the Only if column).", src: "task07", quote: "Tokenisation’s core proposition is to place the asset and the means of payment on the same programmable ledger, so that a single atomic transaction can exchange both simultaneously",
        on: ["The benefits depend on the setup."] },
      { claim: "Today: a (corporate) bond trade can take 2 to 4 business days to settle, because asset, payment and paperwork sit on separate systems.", src: "task07", quote: "yet take two to four business days to settle, because the asset record, the payment instruction, and the legal documentation typically live on different systems operated by different institutions",
        on: ["A bond trade can take 2 to 4 days"] },
      { claim: "Tokenised: asset and payment swap in one step, but only when the payment is also on the same ledger.", src: "task07", quote: "place the asset and the means of payment on the same programmable ledger, so that a single atomic transaction can exchange both simultaneously",
        on: ["Asset and payment swap in one step", "The payment is on the same ledger"], when: "same ledger" },
      { claim: "The payment leg is itself a token on the same ledger (in Acacia: pilot wCBDC, a deposit token or a stablecoin).", src: "task07", quote: "the buyer’s payment token (whether pilot wCBDC, a deposit token, or a stablecoin) is locked into the same contract",
        on: ["The payment is on the same ledger"] },
      { claim: "Today: breaches are often found after the trade.", src: "tkComp", quote: "Breaches are often identified after the trade",
        on: ["Rule breaches often found late"] },
      { claim: "Tokenised: each trade is checked against the rules before it executes.", src: "tkComp", quote: "each trade is checked against your fund's rules before execution",
        on: ["Checked before every trade"] },
      { claim: "Those checks rely on identity and eligibility built into the network (Tokeniser on Redbelly).", src: "tkHome", quote: "Tokeniser operates on Redbelly Network, Australia's public digital token infrastructure, with identity and eligibility built into the protocol.",
        on: ["Identity is built into the network", "Checked before every trade", "The benefits depend on the setup."], when: "built into the network" },
      { claim: "Tokenised: lower investment thresholds (so, today, higher minimums).", src: "wpPdf", quote: "lowering investment thresholds",
        on: ["Higher minimums to invest"] },
      { claim: "Tokenised: fractional ownership and 24/7 trading, which comes through protocol finance (a market for the tokens).", src: "tkHome", quote: "Holders gain fractional ownership, direct custody, atomic settlement, and 24/7 secondary trading through protocol finance.",
        on: ["Fractions, traded 24/7", "A market runs 24/7", "The benefits depend on the setup."], when: "market" },
      { claim: "The 24/7 liquidity is created by protocol finance, not by the token alone.", src: "tkHome", quote: "24/7 liquidity options, created by protocol finance",
        on: ["A market runs 24/7"] }
    ]
  },

  /* ------------------------------------------------------------------ 03 */
  {
    n: 3,
    slug: "dbft-consensus",
    title: "DBFT consensus",
    kicker: "Democratic Byzantine Fault Tolerance",
    lead: "How Redbelly’s nodes agree on the next block, with no leader.",
    visual: {
      type: "dbft",
      old: { label: "Classical chains", title: "Nodes compete", text: "One block wins. The rest is wasted." },
      dbft: { label: "DBFT", title: "Nodes cooperate", text: "Transactions join a superblock." },
      chips: [
        { icon: "ring",      title: "No leader",      text: "Every node plays a similar role." },
        { icon: "lockblock", title: "No forks",       text: "A decided block is final." },
        { icon: "proof",     title: "Fault tolerant", text: "Proven safe if under 1 in 3 nodes are faulty." }
      ]
    },
    labels: ["DBFT"],
    foot: ["Redbelly whitepaper", "research hub"],
    facts: [
      { claim: "DBFT stands for Democratic Byzantine Fault Tolerant consensus.", src: "wpPdf", quote: "Democratic Byzantine Fault Tolerant (DBFT) consensus",
        on: ["Democratic Byzantine Fault Tolerance"] },
      { claim: "DBFT is how the nodes reach consensus on the next block, and it is leaderless.", src: "wpPdf", quote: "As a leaderless consensus algorithm, it eliminates single points of failure",
        on: ["How Redbelly’s nodes agree on the next block, with no leader.", "No leader"] },
      { claim: "In classical blockchains nodes compete; one block wins and the rest is wasted.", src: "wpPdf", quote: "In classical blockchains, participants solve consensus by having different participants engage in ‘fierce’ competition: proposing their own block and trying to impose it on the system. If they succeed, then all other participants lose: their block is the only one appended at the next available index of the chain. This is a waste of resources as only one participant succeeds and the rest fail.",
        on: ["Classical chains", "Nodes compete", "One block wins. The rest is wasted."] },
      { claim: "DBFT nodes cooperate: their transactions are combined into one superblock.", src: "wpPdf", quote: "Redbelly nodes, on the other hand, solve consensus by combining distinct sets of transactions into a ‘superblock’ in a leaderless manner",
        on: ["Transactions join a superblock."] },
      { claim: "Redbelly consensus is collaborative instead of competitive.", src: "wpPdf", quote: "Redbelly consensus is collaborative instead of competitive",
        on: ["Nodes cooperate"] },
      { claim: "No leader: every node plays a similar role.", src: "rsDbft", quote: "each node plays a similar role in the execution of the consensus",
        on: ["No leader", "Every node plays a similar role."] },
      { claim: "No forks: once decided, a block is final.", src: "wpPdf", quote: "It cannot fork and has been mathematically proven to be correct through a process of formal verification through parameterised model checking",
        on: ["No forks", "A decided block is final."] },
      { claim: "Finality is deterministic: a confirmed transaction cannot be reversed.", src: "assetTok", quote: "Deterministic finality ensures transactions are confirmed once and cannot be reversed",
        on: ["A decided block is final."] },
      { claim: "Fault tolerant: proven (by model checking) safe for any number of nodes while fewer than 1 in 3 are faulty.", src: "rsHolistic", quote: "for any number n of processes and any number f < n/3 of Byzantine processes",
        on: ["Fault tolerant", "Proven safe if under 1 in 3 nodes are faulty."], when: "under 1 in 3" },
      { claim: "The proof covers safety (and liveness) for any parameter.", src: "rsHolistic", quote: "we formally verify, for any parameter, not only the safety properties of the Redbelly Blockchain consensus but also its liveness",
        on: ["Proven safe if under 1 in 3 nodes are faulty."] }
    ]
  },

  /* ------------------------------------------------------------------ 04 */
  {
    n: 4,
    slug: "receptor",
    title: "Receptor",
    lead: "Redbelly’s native identity protocol. It makes sure everyone on the network is who they say they are.",
    visual: {
      type: "jobs",
      items: [
        { icon: "gate",      title: "Lets verified users in", text: "Access needs a credential from an accredited issuer." },
        { icon: "checklist", title: "Sets the rules",         text: "Apps state who qualifies, such as accredited investors." },
        { icon: "proof",     title: "Proves you qualify",     text: "Without uploading documents." }
      ],
      note: "Built on the W3C verifiable credential data model."
    },
    labels: [],
    foot: ["Redbelly docs: Receptor, Eligibility Kit"],
    facts: [
      { claim: "Receptor is Redbelly's native identity and verifiable credential protocol.", src: "receptor", quote: "Receptor is Redbelly's native digital identity and verifiable credential protocol.",
        on: ["Redbelly’s native identity protocol."] },
      { claim: "It makes sure everyone on the network is who they say they are.", src: "receptor", quote: "ensuring that all network participants are who they say they are",
        on: ["It makes sure everyone on the network is who they say they are."] },
      { claim: "Network access needs a credential from an accredited issuer.", src: "issuer", quote: "Only accredited issuers can issue credentials that give users network access.",
        on: ["Lets verified users in", "Access needs a credential from an accredited issuer."] },
      { claim: "Apps state who qualifies (the eligibility criteria for their use case).", src: "receptor", quote: "helps use case developers to surface the eligibility criteria for their real world asset tokenisation use case",
        on: ["Sets the rules", "Apps state who qualifies, such as accredited investors."] },
      { claim: "Example criterion: accredited investor status.", src: "eligKit", quote: "proving their age, address, or accredited investor status",
        on: ["Apps state who qualifies, such as accredited investors."] },
      { claim: "Users prove they qualify without uploading documents.", src: "eligKit", quote: "Users can prove their eligibility without having to upload documents or share sensitive personal information with your platform.",
        on: ["Proves you qualify", "Without uploading documents."] },
      { claim: "Built on the W3C verifiable credential data model.", src: "receptor", quote: "Receptor is built on the W3C verifiable credential data model",
        on: ["Built on the W3C verifiable credential data model."] }
    ]
  },

  /* ------------------------------------------------------------------ 05 */
  {
    n: 5,
    slug: "verifiable-credentials",
    title: "Verifiable credentials",
    lead: "A digital proof about you, signed by whoever checked it. You keep it and share proof when asked.",
    visual: {
      type: "triangle",
      roles: {
        issuer:   { icon: "stamp",  name: "Issuer",   text: "Checks you. Signs a credential." },
        holder:   { icon: "wallet", name: "Holder",   text: "You. It stays in your wallet." },
        verifier: { icon: "verify", name: "Verifier", text: "Checks the issuer’s signature." }
      },
      edges: { issue: "Issues", share: "Shares proof", trust: "Trusts issuer" },
      note: "Reusable. Your data is not copied to every app."
    },
    labels: ["Issuer", "Holder", "Verifier"],
    foot: ["Redbelly docs", "Redbelly whitepaper"],
    facts: [
      { claim: "A verifiable credential is a credential issued to the user, with a cryptographic signature that confirms it is authentic.", src: "sdzk", quote: "along with a cryptographic signature, allowing them to confirm its authenticity",
        on: ["A digital proof about you, signed by whoever checked it."] },
      { claim: "Three roles: Issuer, Holder, Verifier.", src: "receptor", quote: "The framework is composed of three essential modules; the Issuer, the Holder, and the Verifier.",
        on: ["Issues", "Shares proof"] },
      { claim: "The issuer defines and issues the credential.", src: "receptor", quote: "Issuer: Use to define and issue verifiable credentials to users.",
        on: ["Checks you. Signs a credential.", "Issues"] },
      { claim: "Only accredited issuers, who check users, issue credentials for network access.", src: "issuer", quote: "Only accredited issuers can issue credentials that give users network access.",
        on: ["Checks you. Signs a credential."] },
      { claim: "The holder (you) stores the credential in a wallet and shares proof when asked.", src: "holder", quote: "acquire and store verifiable credentials",
        on: ["You. It stays in your wallet.", "You keep it and share proof when asked.", "Shares proof"] },
      { claim: "The verifier checks the proof against the trusted issuer's public key (its signature).", src: "eligKit", quote: "checks its mathematical validity against the trusted issuer's public key",
        on: ["Checks the issuer’s signature.", "Trusts issuer"] },
      { claim: "Credentials are reusable.", src: "assetTok", quote: "Reusable client identity and KYC credentials streamline onboarding and reduce duplication",
        on: ["Reusable. Your data is not copied to every app."] },
      { claim: "Your data is not copied to every service provider (no duplicate stores of it).", src: "wpPdf", quote: "user data is kept at the edge and is not duplicated across each service provider which would create many honeypots of sensitive data",
        on: ["Reusable. Your data is not copied to every app."] }
    ]
  },

  /* ------------------------------------------------------------------ 06 */
  {
    n: 6,
    slug: "zk-proofs",
    title: "Zero knowledge (ZK) proofs",
    lead: "Prove something is true without revealing the data behind it.",
    visual: {
      type: "zk",
      ask: "Over 18?",
      result: "true",
      steps: [
        { icon: "question", title: "Ask",   text: "An app asks a yes or no question." },
        { icon: "wallet",   title: "Prove", text: "Your wallet proves it. No data shown." },
        { icon: "contract", title: "Check", text: "A smart contract verifies it." }
      ],
      card: { title: "Passport", rows: ["Name", "Birth date"] },
      compare: [
        { title: "Selective disclosure", text: "Shows only the fields asked for." },
        { title: "Zero knowledge", text: "Shows no data. Only the proof." }
      ]
    },
    labels: ["Ask", "Prove", "Check", "Passport", "Name", "Birth date", "Selective disclosure", "Zero knowledge"],
    foot: ["Redbelly docs: selective disclosure vs ZK"],
    facts: [
      { claim: "A ZK proof shows something is true without revealing the data behind it.", src: "sdzk", quote: "uses zero-knowledge proofs, allow users to prove a statement is true without revealing any of the underlying data that makes it true",
        on: ["Prove something is true without revealing the data behind it.", "Shows no data. Only the proof."] },
      { claim: "Ask: an app (the verifier) asks one yes or no question, for example: over 18?", src: "sdzk", quote: "The verifier asks a yes/no question using a query, like “Is the user over 18?”",
        on: ["An app asks a yes or no question.", "Over 18?"] },
      { claim: "Prove: your wallet makes the proof without revealing your address or any other personal information.", src: "sdzk", quote: "The user's wallet generates a cryptographic proof that they satisfy the query, without revealing their address or any other personal information.",
        on: ["Your wallet proves it. No data shown."] },
      { claim: "Artwork: the passport credential's birth date is queried, not revealed (shown masked).", src: "pbq", quote: "can be queried against a relative date, rather than being revealed",
        on: ["Your wallet proves it. No data shown."] },
      { claim: "Check: a smart contract verifies the proof.", src: "sdzk", quote: "where a smart contract verifies its validity",
        on: ["A smart contract verifies it."] },
      { claim: "Artwork: the answer is true or false, with no personal data exposed on chain.", src: "sdzk", quote: "with no personal data ever being exposed on-chain",
        on: ["true", "Your wallet proves it. No data shown."] },
      { claim: "Selective disclosure shows only the fields asked for.", src: "sdzk", quote: "Selective Disclosure (SD) is a method where a user reveal only specific fields from their credential to a verifier.",
        on: ["Shows only the fields asked for."] },
      { claim: "Zero knowledge (proof by query) shows no data, only the proof.", src: "sdzk", quote: "In SD, data is revealed. In PBQ, only the proof is shared",
        on: ["Shows no data. Only the proof."] }
    ]
  },

  /* ------------------------------------------------------------------ 07 */
  {
    n: 7,
    slug: "tokeniser",
    title: "Tokeniser",
    lead: "A Redbelly Network project. Funds and companies use it to issue and manage tokenised assets.",
    visual: {
      type: "stack",
      layers: [
        { tag: "ISSUE",  name: "Tokeniser",        icon: "ledger", text: "Registry, investor portal and API.", hot: true },
        { tag: "REACH",  name: "Averer",           icon: "wallet", text: "Identity and wallet. Credentials gate every holder." },
        { tag: "SETTLE", name: "Redbelly Network", icon: "nodes",  text: "Final the moment it completes." }
      ],
      note: "Every holder verified. Every transfer checked against the rules."
    },
    labels: ["Tokeniser", "Averer", "Redbelly Network"],
    foot: ["tokeniser.com"],
    facts: [
      { claim: "Tokeniser is a Redbelly Network project.", src: "tkHome", quote: "Tokeniser is a Redbelly Network project",
        on: ["A Redbelly Network project."] },
      { claim: "Funds and companies use it to issue and manage tokenised assets (registry operations from issuance to settlement).", src: "tkHome", quote: "Tokeniser gives you the benefits of tokenisation without the technology project. Your team keeps familiar registry operations, one platform handles everything from issuance to settlement",
        on: ["Funds and companies use it to issue and manage tokenised assets."] },
      { claim: "It is built for funds and companies.", src: "tkHome", quote: "Built for funds and companies ready to go global",
        on: ["Funds and companies use it to issue and manage tokenised assets."] },
      { claim: "Issue: Tokeniser handles compliant issuance and the asset's lifecycle.", src: "tkTech", quote: "Compliant issuance and lifecycle of tokenised assets.",
        on: ["ISSUE"] },
      { claim: "Registry tools, an investor portal and an API.", src: "tkProduct", quote: "Program the rules of your asset, with admin tools, an investor portal, and an API for automations and build-your-own portals.",
        on: ["Registry, investor portal and API."] },
      { claim: "Reach: Averer is the identity and wallet layer; credentials gate every holder.", src: "tkTech", quote: "Identity and the AI-native wallet. Verifiable credentials gate every holder",
        on: ["REACH", "Identity and wallet. Credentials gate every holder."] },
      { claim: "Settle: Redbelly Network is the settlement layer; settlement is final the moment it completes.", src: "tkTech", quote: "final the moment it completes",
        on: ["SETTLE", "Final the moment it completes."] },
      { claim: "Tokeniser runs on Redbelly Network.", src: "tkHome", quote: "Tokeniser operates on Redbelly Network",
        on: ["SETTLE"] },
      { claim: "Every holder verified and every transfer checked against the asset's rules, automatically.", src: "tkHome", quote: "Every holder is verified and every transfer checked against the asset's rules, automatically.",
        on: ["Every holder verified. Every transfer checked against the rules."] }
    ]
  },

  /* ------------------------------------------------------------------ 08 */
  {
    n: 8,
    slug: "compliance-aware-assets",
    title: "Compliance aware assets",
    lead: "On Redbelly, an asset can carry its own rules. Every transfer is checked against them first.",
    visual: {
      type: "gate",
      token: { name: "Asset token", caption: "Rules it carries", rules: ["Holder is verified", "Holder is eligible", "Within limits"] },
      pass: { title: "Passes", text: "Transfer completes" },
      fail: { title: "Fails", text: "Transfer stops" },
      chips: [
        { icon: "stamp", title: "Set by the issuer", text: "Under its licence." },
        { icon: "log",   title: "Logged",            text: "Every check is recorded." },
        { icon: "link",  title: "Carried over",      text: "Rules follow it into other apps." }
      ]
    },
    labels: ["Asset token", "Rules it carries", "Passes", "Fails"],
    foot: ["Redbelly whitepaper", "tokeniser.com"],
    facts: [
      { claim: "An asset can carry its own rules (compliance becomes a property of the asset).", src: "wpPdf", quote: "This transforms the complexity of compliance assurance into an inherent property of the assets themselves.",
        on: ["On Redbelly, an asset can carry its own rules."] },
      { claim: "Every transfer is checked against the asset's rules.", src: "tkHome", quote: "Every holder is verified and every transfer checked against the asset's rules, automatically.",
        on: ["Every transfer is checked against them first."] },
      { claim: "Checks happen before the trade: identity, eligibility and limits. Failing trades do not proceed. Every check is logged.", src: "tkComp", quote: "Before any trade proceeds, the investor's identity, eligibility (including wholesale or sophisticated status where required) and your limits are verified automatically. Trades that fail a check do not proceed, and every check is logged.",
        on: ["Every transfer is checked against them first.", "Holder is verified", "Holder is eligible", "Within limits", "Transfer completes", "Transfer stops", "Logged", "Every check is recorded."] },
      { claim: "Only eligible parties can hold the token.", src: "wpPdf", quote: "only parties that can prove their eligibility will be able to hold the token",
        on: ["Holder is eligible"] },
      { claim: "Eligibility is enforced at the point of trade.", src: "assetTok", quote: "defined investor eligibility, enforced at the point of trade",
        on: ["Every transfer is checked against them first."] },
      { claim: "The rules are set by the issuer, in line with its licence and mandate.", src: "wpPdf", quote: "embed turnkey jurisdictional compliance, according to their license and mandate, into their tokenised assets directly",
        on: ["Set by the issuer", "Under its licence."] },
      { claim: "Rules carry over when the asset meets other apps (protocols) on the network.", src: "wpPdf", quote: "when different tokenised assets and protocols interact on our network, they automatically inherit the compliance properties of the underlying assets",
        on: ["Carried over", "Rules follow it into other apps."] }
    ]
  },

  /* ------------------------------------------------------------------ 09 */
  {
    n: 9,
    slug: "identity-and-accountability",
    title: "Identity and accountability",
    lead: "Every participant is known. Nodes that try to cause disagreement leave proof.",
    visual: {
      type: "lanes",
      lanes: [
        { label: "People", steps: [
          { icon: "idbadge", title: "Known",     text: "Verified by accredited issuers." },
          { icon: "link",    title: "Traceable", text: "Transactions can be tied to a responsible party." }
        ] },
        { label: "Nodes", steps: [
          { icon: "warning",  title: "Disagreement",   text: "Only if 1 in 3 or more nodes are faulty." },
          { icon: "evidence", title: "Proof of fraud", text: "Their signed messages can name them." },
          { icon: "exit",     title: "Removed",        text: "Excluded from consensus with enough proof." }
        ] }
      ]
    },
    labels: ["People", "Nodes"],
    foot: ["Redbelly whitepaper", "research hub"],
    facts: [
      { claim: "Every participant is known.", src: "wpPage", quote: "an innovative identity layer that ensures all network participants are known",
        on: ["Every participant is known."] },
      { claim: "Participants are identity verified by accredited credential issuers.", src: "wpPdf", quote: "We enforce mandatory identity verification for all network participants through our marketplace of accredited verifiable credential issuers.",
        on: ["Known", "Verified by accredited issuers."] },
      { claim: "Each transaction can be tied back to a responsible party.", src: "wpPdf", quote: "all transactions can be tied back to a responsible entity",
        on: ["Traceable", "Transactions can be tied to a responsible party."] },
      { claim: "Proof comes from faulty nodes trying to cause disagreement among honest nodes: they leave signed traces that honest nodes combine into undeniable proofs of fraud.", src: "wpPdf", quote: "When faulty nodes try to cause disagreement, they leave cryptographically signed traces that honest nodes can combine to build undeniable proofs of fraud",
        on: ["Nodes that try to cause disagreement leave proof.", "Proof of fraud", "Their signed messages can name them."], when: "disagreement" },
      { claim: "The trigger is honest nodes disagreeing on the next block. The system can then, eventually, name the faulty nodes responsible (at least a third of the nodes, n/3).", src: "wpPdf", quote: "if honest nodes disagree on the next block, the system can eventually output at least n/3 faulty nodes who are responsible for the disagreement",
        on: ["Disagreement", "Their signed messages can name them."], when: "disagreement" },
      { claim: "Disagreement is only possible with 1 in 3 or more faulty nodes: below that, DBFT is proven safe.", src: "rsHolistic", quote: "for any number n of processes and any number f < n/3 of Byzantine processes",
        on: ["Only if 1 in 3 or more nodes are faulty."], when: "1 in 3" },
      { claim: "Consensus like DBFT tolerates fewer than a third of faulty nodes; past that, disagreement becomes possible.", src: "wpPdf", quote: "Typically, BFT systems can only tolerate less than a third of faulty nodes",
        on: ["Only if 1 in 3 or more nodes are faulty."] },
      { claim: "With more than 1 in 3 of the computing power, an attacker can force disagreement; Polygraph, the accountable consensus behind these proofs, exists for this case.", src: "rsPolygraph", quote: "If the adversary controls more than 1/3 of the computing power, it can always force disagreement. In this paper, we propose Polygraph, the first accountable Byzantine agreement solution.",
        on: ["Only if 1 in 3 or more nodes are faulty.", "Disagreement", "Proof of fraud"] },
      { claim: "Once honest nodes have enough proofs of fraud, a membership change removes the faulty nodes from the consensus committee.", src: "wpPdf", quote: "Once honest nodes gather enough proofs of fraud against faulty nodes, they initiate a membership change. This process involves an exclusion protocol to remove the identified faulty nodes from the consensus committee",
        on: ["Removed", "Excluded from consensus with enough proof."], when: "enough proof" }
    ]
  },

  /* ------------------------------------------------------------------ 10 */
  {
    n: 10,
    slug: "governance",
    title: "Governance",
    lead: "The Redbelly Community DAO votes on its own platform. Only identity verified wallets can vote.",
    visual: {
      type: "governance",
      steps: [
        { icon: "ballot",  title: "Propose", text: "Locked once open." },
        { icon: "pen",     title: "Vote",    text: "Sign a message. No gas." },
        { icon: "tally",   title: "Count",   text: "RBNT held, or one per address." },
        { icon: "receipt", title: "Check",   text: "Anyone can re-check a ballot." }
      ],
      status: [
        { dot: "ok",   label: "High Council",   text: "3 seats" },
        { dot: "ok",   label: "Working groups", text: "5 pods" },
        { dot: "warn", label: "Treasury",       text: "New funding paused" }
      ],
      note: "Voting moved off Snapshot. Past votes are imported."
    },
    labels: ["Propose", "Vote", "Count", "Check", "High Council", "Working groups", "Treasury"],
    foot: ["DAO voting platform", "TASK-23"],
    facts: [
      { claim: "The DAO votes on its own platform.", src: "voteList", quote: "Signature voting on Redbelly. No gas, no subscription.",
        on: ["The Redbelly Community DAO votes on its own platform."] },
      { claim: "Only identity verified wallets can vote.", src: "vote", quote: "Every address here clears Redbelly’s passport-backed identity check.",
        on: ["Only identity verified wallets can vote."] },
      { claim: "Only wallets holding a Receptor credential can vote.", src: "voteCreate", quote: "Only wallets holding a Receptor credential can vote, as Redbelly requires one for network access.",
        on: ["Only identity verified wallets can vote."] },
      { claim: "Propose: a proposal cannot be edited once it is open.", src: "voteCreate", quote: "a proposal cannot be edited once it is open",
        on: ["Locked once open."] },
      { claim: "Vote: you sign a message, never send a transaction, so voting costs no gas.", src: "voteSafety", quote: "Voting here costs no gas because nothing is ever sent to the chain.",
        on: ["Sign a message. No gas."] },
      { claim: "Voting is signing a message.", src: "voteSafety", quote: "you sign a message, you never send a transaction",
        on: ["Sign a message. No gas."] },
      { claim: "Count: voting power can be the RBNT held.", src: "voteCreate", quote: "Voting power equals the native RBNT held at the snapshot block.",
        on: ["RBNT held, or one per address."] },
      { claim: "Or one vote per verified address.", src: "voteOpov", quote: "One verified address, one vote",
        on: ["RBNT held, or one per address."] },
      { claim: "Check: signed ballots that anyone can re-verify.", src: "voteSafety", quote: "Your signature is stored with your ballot, so anyone can re-verify that your vote was really yours without trusting this server.",
        on: ["Anyone can re-check a ballot."] },
      { claim: "High Council: 3 seats, elected July 2026.", src: "task23", quote: "The High Council seats elected in July 2026 are Buffy, NekoyaManeki and Light.",
        on: ["3 seats"], numbers: { "3": "the quote names three seat holders: Buffy, NekoyaManeki and Light" } },
      { claim: "Five pods (working groups).", src: "task23", quote: "Five pods: Marketing, Builder/Develop, Researcher, Community and Partnerships.",
        on: ["5 pods"] },
      { claim: "Treasury: new treasury-funded initiatives are paused until a future vote resumes them.", src: "task23", quote: "New treasury-funded initiatives are suspended until a future governance vote resumes them. Existing approved obligations continue.",
        on: ["New funding paused"] },
      { claim: "Voting moved off Snapshot; past Snapshot votes are imported on the platform.", src: "voteImported", quote: "IMPORTED FROM SNAPSHOT",
        on: ["Voting moved off Snapshot. Past votes are imported."] }
    ]
  },

  /* ------------------------------------------------------------------ 11 */
  {
    n: 11,
    slug: "project-acacia",
    title: "Project Acacia",
    lead: "A real money pilot of tokenised assets by the Reserve Bank of Australia (RBA) and the DFCRC.",
    visual: {
      type: "acacia",
      stats: [
        { big: "1 of 3",  text: "platforms the RBA issued pilot digital money onto. The only public one." },
        { big: "5 of 20", text: "completed use cases ran on Redbelly’s mainnet." },
        { pre: "Under", big: "4 min", text: "to issue and resell a tokenised bond. Normally up to 4 days." }
      ],
      timeline: [
        { when: "Jul 2025", what: "Participants named" },
        { when: "Feb 2026", what: "Testing ends" },
        { when: "May 2026", what: "Final report" }
      ]
    },
    labels: [],
    foot: ["TASK-07 deep dive", "Acacia page"],
    facts: [
      { claim: "Project Acacia: an RBA and DFCRC real money pilot on tokenised money and assets.", src: "task07", quote: "In July 2025 the Reserve Bank of Australia (RBA) and the Digital Finance Cooperative Research Centre (DFCRC) selected Redbelly Network as one of fourteen lead participants in Phase 2 of Project Acacia, a real-money pilot examining how tokenised money and assets",
        on: ["A real money pilot of tokenised assets by the Reserve Bank of Australia (RBA) and the DFCRC.", "Jul 2025", "Participants named"] },
      { claim: "The RBA issued its pilot wholesale CBDC (digital money) onto 3 platforms; Redbelly was the only public one.", src: "task07", quote: "Of the three platforms onto which the RBA actually issued its pilot wholesale central bank digital currency (wCBDC), Redbelly was the only one built on public, generally accessible infrastructure",
        on: ["1 of 3", "platforms the RBA issued pilot digital money onto. The only public one."] },
      { claim: "The RBA minted pilot wholesale CBDC directly onto the Redbelly mainnet.", src: "acacia", quote: "The RBA will mint a limited amount of wholesale CBDC directly onto the Redbelly mainnet",
        on: ["platforms the RBA issued pilot digital money onto. The only public one."] },
      { claim: "5 of the 20 completed use cases ran on Redbelly's mainnet.", src: "task07", quote: "used Redbelly’s mainnet across five of the twenty completed use cases",
        on: ["5 of 20", "completed use cases ran on Redbelly’s mainnet."] },
      { claim: "A tokenised corporate bond (Australia's first) was issued and resold on Redbelly in under 4 minutes.", src: "task07", quote: "issuance, coupon registration, and the secondary transfer completed end-to-end in under four minutes on Redbelly",
        on: ["Under", "4 min", "to issue and resell a tokenised bond. Normally up to 4 days."] },
      { claim: "It was Australia's first tokenised corporate bond.", src: "task07", quote: "Imperium Markets issued CLIFFO Series 1, Australia’s first tokenised corporate bond",
        on: ["to issue and resell a tokenised bond. Normally up to 4 days."] },
      { claim: "Conventionally this would have taken up to 4 days.", src: "task07", quote: "would conventionally have taken up to four days",
        on: ["to issue and resell a tokenised bond. Normally up to 4 days."] },
      { claim: "Testing ran to February 2026.", src: "task07", quote: "ran from July 2025 (when participants were announced) through February 2026",
        on: ["Feb 2026", "Testing ends"] },
      { claim: "The RBA's final report: May 2026.", src: "task07", quote: "the RBA’s May 2026 Final Report",
        on: ["May 2026", "Final report"] }
    ]
  }
];
