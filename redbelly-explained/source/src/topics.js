/*
  Redbelly Explained: content for all 11 infographics.

  Edit the words here, then run `npm run render` to rebuild every PNG.
  House rules (Task Board voice): plain language, no em or en dashes, no emoji,
  say the number, lead with the answer.

  Each topic carries:
    title, lead     the headline and the one sentence answer
    visual          the diagram type and its labels (see build.js)
    foot            the short source line printed on the artwork
    facts           every claim on the artwork, the page it comes from and a
                    verbatim supporting quote (used to generate SOURCES.md and
                    checked by tools/verify-sources.mjs)
*/
window.RX = window.RX || {};

RX.verified = "24 Oct 2026";

RX.src = {
  home:       { name: "Redbelly Network website", url: "https://redbelly.network" },
  wpPage:     { name: "Redbelly whitepaper page", url: "https://redbelly.network/whitepaper" },
  wpPdf:      { name: "Redbelly whitepaper (PDF, 28 Aug 2025)", url: "https://redbelly.network/redbelly-network-whitepaper.pdf" },
  research:   { name: "Redbelly research hub", url: "https://redbelly.network/research" },
  rsSecure:   { name: "Research: Redbelly, A Secure, Fair and Scalable Open Blockchain", url: "https://redbelly.network/research/redbelly-a-secure-fair-and-scalable-open-blockchain" },
  rsDbft:     { name: "Research: DBFT, Efficient Leaderless Byzantine Consensus", url: "https://redbelly.network/research/dbft-ef-cient-leaderless-byzantine-consensus" },
  rsHolistic: { name: "Research: Holistic Verification of Blockchain Consensus", url: "https://redbelly.network/research/holistic-verification-of-blockchain-consensus" },
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
    lead: "Redbelly Network is a public layer 1 blockchain, built for tokenising real world assets.",
    visual: {
      type: "hub",
      core: { kicker: "LAYER 1", name: "Redbelly Network", sub: "Public blockchain" },
      items: [
        { icon: "bond",    title: "Real world assets",    text: "Bonds, credit and real estate." },
        { icon: "idbadge", title: "Verified participants", text: "Everyone is identity verified." },
        { icon: "lockblock", title: "Final in seconds",   text: "DBFT consensus. No forks." },
        { icon: "code",    title: "Ethereum compatible",  text: "Runs Solidity smart contracts." }
      ],
      note: "Born at the University of Sydney, developed with CSIRO."
    },
    foot: ["redbelly.network/whitepaper", "docs.redbelly.network"],
    facts: [
      { claim: "Redbelly is a layer 1 blockchain built for real world asset tokenisation.", src: "docs", quote: "The Redbelly Network is a layer 1 blockchain, built and optimised for real world asset tokenisation." },
      { claim: "Redbelly is a public network.", src: "tkTech", quote: "No. Redbelly is a public network" },
      { claim: "Asset types include bonds, (private) credit and real estate.", src: "home", quote: "TREASURIES & BONDS PRIVATE CREDIT CARBON CREDITS DERIVATIVES & COMMODITIES INSURANCE REAL ESTATE" },
      { claim: "Assets are issued and traded as tokens.", src: "home", quote: "Enabling asset issuers to tokenise and trade compliant onchain structured products" },
      { claim: "Every participant on the network is identity verified.", src: "wpPdf", quote: "all network participants are known. We enforce mandatory identity verification for all network participants" },
      { claim: "Final in seconds: DBFT consensus makes transactions final within seconds.", src: "wpPdf", quote: "transactions are confirmed as irreversible within seconds" },
      { claim: "No forks: the chain cannot fork.", src: "wpPdf", quote: "It cannot fork" },
      { claim: "Ethereum compatible: runs Solidity smart contracts and Ethereum tools.", src: "wpPdf", quote: "allows Redbelly Network to support a diverse ecosystem of smart contracts, dApps, tools, and service providers" },
      { claim: "Solidity developers can build on it.", src: "wpPdf", quote: "the largest pool of developers already proficient in the Solidity programming language" },
      { claim: "Born at the University of Sydney, developed with CSIRO.", src: "rsSecure", quote: "Redbelly was born at the University of Sydney" },
      { claim: "Developed in partnership with CSIRO (and its Data61).", src: "wpPage", quote: "developed with The University of Sydney and CSIRO’s Data61" }
    ]
  },

  /* ------------------------------------------------------------------ 02 */
  {
    n: 2,
    slug: "why-tokenise-real-world-assets",
    title: "Why tokenise real world assets?",
    lead: "Tokenising records who owns an asset as a digital token, and lets the asset’s rules be programmed in.",
    visual: {
      type: "compare",
      left: "Today",
      right: "Tokenised",
      rows: [
        { icon: "ledger",    label: "Records",    before: "Separate systems to reconcile", after: "One shared record" },
        { icon: "clock",     label: "Settlement", before: "Bond trades can take 2 to 4 business days", after: "Asset and payment swap in one step" },
        { icon: "checklist", label: "Rules",      before: "Manual checks, breaches often found late", after: "Checked before every trade" },
        { icon: "pie",       label: "Access",     before: "Higher minimums to invest", after: "Fractions, traded 24/7" }
      ]
    },
    foot: ["tokeniser.com", "Redbelly whitepaper", "TASK-07"],
    facts: [
      { claim: "Tokenisation records ownership as digital tokens and lets the asset's rules be programmed.", src: "tkHome", quote: "Tokenisation records ownership of financial products and services as digital tokens, and lets you program the rules of the asset." },
      { claim: "Today: separate systems to reconcile; a (corporate) bond trade can take 2 to 4 business days to settle.", src: "task07", quote: "take two to four business days to settle, because the asset record, the payment instruction, and the legal documentation typically live on different systems operated by different institutions" },
      { claim: "Tokenised: one shared record.", src: "home", quote: "Establish digital registries as a shared source of truth across issuers, managers, and investors." },
      { claim: "Tokenised: one record shared by every party in the value chain.", src: "wpPdf", quote: "using a verifiable, single source of truth across the entirety of the value chain" },
      { claim: "Tokenised: asset and payment swap in one step.", src: "task07", quote: "a single atomic transaction can exchange both simultaneously" },
      { claim: "Today: manual checks, breaches often found late (after the trade).", src: "tkComp", quote: "Investor eligibility, holder limits and transfer restrictions are typically managed through spreadsheets, emails and manual sign-offs. Breaches are often identified after the trade" },
      { claim: "Tokenised: checked before every trade.", src: "tkComp", quote: "each trade is checked against your fund's rules before execution" },
      { claim: "Tokenised: lower investment thresholds.", src: "wpPdf", quote: "lowering investment thresholds" },
      { claim: "Tokenised: fractions (fractional ownership), traded 24/7.", src: "tkHome", quote: "Holders gain fractional ownership, direct custody, atomic settlement, and 24/7 secondary trading through protocol finance." }
    ]
  },

  /* ------------------------------------------------------------------ 03 */
  {
    n: 3,
    slug: "dbft-consensus",
    title: "DBFT consensus",
    kicker: "Democratic Byzantine Fault Tolerance",
    lead: "How Redbelly’s nodes agree on blocks, with no leader.",
    visual: {
      type: "dbft",
      old: { label: "Classical blockchains", title: "Nodes compete", text: "One block wins. The rest is wasted work." },
      dbft: { label: "DBFT", title: "Nodes cooperate", text: "Their transactions combine into one superblock." },
      chips: [
        { icon: "ring",  title: "No leader",      text: "Every node plays a similar role." },
        { icon: "lockblock", title: "No forks",   text: "Once decided, a block is final." },
        { icon: "proof", title: "Fault tolerant", text: "Proven safe while under 1 in 3 nodes are faulty." }
      ]
    },
    foot: ["redbelly.network/whitepaper", "redbelly.network/research"],
    facts: [
      { claim: "DBFT stands for Democratic Byzantine Fault Tolerant consensus.", src: "wpPdf", quote: "Democratic Byzantine Fault Tolerant (DBFT) consensus" },
      { claim: "DBFT is leaderless.", src: "wpPdf", quote: "As a leaderless consensus algorithm, it eliminates single points of failure" },
      { claim: "Classical blockchains: nodes compete, one block wins, the rest is wasted.", src: "wpPdf", quote: "This is a waste of resources as only one participant succeeds and the rest fail." },
      { claim: "DBFT: nodes cooperate and combine transactions into a superblock.", src: "wpPdf", quote: "combining distinct sets of transactions into a ‘superblock’ in a leaderless manner" },
      { claim: "Redbelly consensus is collaborative instead of competitive.", src: "wpPdf", quote: "Redbelly consensus is collaborative instead of competitive" },
      { claim: "No leader: every node plays a similar role.", src: "rsDbft", quote: "each node plays a similar role in the execution of the consensus" },
      { claim: "No forks: once decided, a block is final.", src: "wpPdf", quote: "It cannot fork and has been mathematically proven to be correct through a process of formal verification through parameterised model checking" },
      { claim: "Fault tolerant: proven (by model checking) safe while fewer than 1 in 3 nodes are faulty.", src: "rsHolistic", quote: "for any number n of processes and any number f < n/3 of Byzantine processes" },
      { claim: "Proven: the verification covers safety (and liveness) for any parameter.", src: "rsHolistic", quote: "we formally verify, for any parameter, not only the safety properties of the Redbelly Blockchain consensus but also its liveness" }
    ]
  },

  /* ------------------------------------------------------------------ 04 */
  {
    n: 4,
    slug: "receptor",
    title: "Receptor",
    lead: "Redbelly’s native identity and verifiable credential protocol. It makes sure everyone on the network is who they say they are.",
    visual: {
      type: "jobs",
      items: [
        { icon: "gate",      title: "Lets verified users in", text: "Network access needs a credential from an accredited issuer." },
        { icon: "checklist", title: "Sets the rules",         text: "Apps state who qualifies, such as accredited investors." },
        { icon: "proof",     title: "Proves you qualify",     text: "No uploading documents to every app." }
      ],
      note: "Built on the W3C verifiable credential data model."
    },
    foot: ["docs.redbelly.network (Receptor, Eligibility Kit)"],
    facts: [
      { claim: "Receptor is Redbelly's native identity and verifiable credential protocol.", src: "receptor", quote: "Receptor is Redbelly's native digital identity and verifiable credential protocol." },
      { claim: "It makes sure everyone on the network is who they say they are.", src: "receptor", quote: "ensuring that all network participants are who they say they are" },
      { claim: "Network access needs a credential from an accredited issuer.", src: "issuer", quote: "Only accredited issuers can issue credentials that give users network access." },
      { claim: "Apps state who qualifies.", src: "receptor", quote: "helps use case developers to surface the eligibility criteria for their real world asset tokenisation use case" },
      { claim: "Example criterion: accredited investor status.", src: "eligKit", quote: "proving their age, address, or accredited investor status" },
      { claim: "Users prove they qualify without uploading documents.", src: "eligKit", quote: "Users can prove their eligibility without having to upload documents or share sensitive personal information with your platform." },
      { claim: "Built on the W3C verifiable credential data model.", src: "receptor", quote: "Receptor is built on the W3C verifiable credential data model" }
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
        issuer:   { icon: "stamp",  name: "Issuer",   text: "Checks your details and signs a credential." },
        holder:   { icon: "wallet", name: "Holder",   text: "You. It stays in your wallet." },
        verifier: { icon: "verify", name: "Verifier", text: "Checks the proof and the issuer’s signature." }
      },
      edges: { issue: "Issues", share: "Shares proof", trust: "Checks signature" },
      note: "Reusable. Your data is not copied to every app."
    },
    foot: ["docs.redbelly.network", "Redbelly whitepaper"],
    facts: [
      { claim: "Three roles: Issuer, Holder, Verifier.", src: "receptor", quote: "The framework is composed of three essential modules; the Issuer, the Holder, and the Verifier." },
      { claim: "The issuer issues the credential.", src: "receptor", quote: "Issuer: Use to define and issue verifiable credentials to users." },
      { claim: "The holder keeps it in a wallet.", src: "holder", quote: "acquire and store verifiable credentials" },
      { claim: "The verifier checks the proof and the issuer's signature.", src: "eligKit", quote: "checks its mathematical validity against the trusted issuer's public key" },
      { claim: "A cryptographic signature confirms authenticity.", src: "sdzk", quote: "along with a cryptographic signature, allowing them to confirm its authenticity" },
      { claim: "Credentials are reusable.", src: "assetTok", quote: "Reusable client identity and KYC credentials streamline onboarding and reduce duplication" },
      { claim: "Your data is not copied to every app (no duplicate stores of it).", src: "wpPdf", quote: "user data is kept at the edge and is not duplicated across each service provider which would create many honeypots of sensitive data" }
    ]
  },

  /* ------------------------------------------------------------------ 06 */
  {
    n: 6,
    slug: "zk-proofs",
    title: "Zero knowledge proofs",
    lead: "A zero knowledge (ZK) proof shows that something is true without revealing the data behind it.",
    visual: {
      type: "zk",
      steps: [
        { icon: "question", title: "Ask",   text: "An app asks one yes or no question." },
        { icon: "wallet",   title: "Prove", text: "Your wallet proves it. Nothing is revealed." },
        { icon: "contract", title: "Check", text: "A smart contract on Redbelly verifies it." }
      ],
      card: { title: "Passport credential", rows: ["Name", "Birth date"] },
      compare: [
        { title: "Selective disclosure", text: "Reveals only the fields asked for." },
        { title: "Zero knowledge", text: "Reveals no data. Only the proof." }
      ]
    },
    foot: ["docs.redbelly.network: selective disclosure vs ZK"],
    facts: [
      { claim: "A ZK proof shows something is true without revealing the data behind it.", src: "sdzk", quote: "uses zero-knowledge proofs, allow users to prove a statement is true without revealing any of the underlying data that makes it true" },
      { claim: "Ask: an app asks one yes or no question (example on the artwork: over 18?).", src: "sdzk", quote: "The verifier asks a yes/no question using a query, like “Is the user over 18?”" },
      { claim: "Prove: your wallet proves it (generates the proof); nothing is revealed.", src: "sdzk", quote: "The user's wallet generates a cryptographic proof that they satisfy the query, without revealing their address or any other personal information." },
      { claim: "Artwork: the passport credential's fields stay hidden; the birth date is queried, not revealed.", src: "pbq", quote: "can be queried against a relative date, rather than being revealed" },
      { claim: "Check: a smart contract on Redbelly verifies it.", src: "sdzk", quote: "where a smart contract verifies its validity" },
      { claim: "Artwork: the result is true or false, with no personal data on chain.", src: "sdzk", quote: "with no personal data ever being exposed on-chain" },
      { claim: "Selective disclosure reveals only the fields asked for.", src: "sdzk", quote: "Selective Disclosure (SD) is a method where a user reveal only specific fields from their credential to a verifier." },
      { claim: "Zero knowledge reveals no data, only the proof.", src: "sdzk", quote: "In SD, data is revealed. In PBQ, only the proof is shared" }
    ]
  },

  /* ------------------------------------------------------------------ 07 */
  {
    n: 7,
    slug: "tokeniser",
    title: "Tokeniser",
    lead: "Tokeniser is a Redbelly Network project. Funds and companies use it to issue and manage tokenised assets.",
    visual: {
      type: "stack",
      layers: [
        { tag: "ISSUE",  name: "Tokeniser",        icon: "ledger", text: "Registry, investor portal and API for funds, shares, loans and notes.", hot: true },
        { tag: "REACH",  name: "Averer",           icon: "wallet", text: "Identity and wallet. Credentials gate every holder." },
        { tag: "SETTLE", name: "Redbelly Network", icon: "nodes", text: "Settlement that is final the moment it completes." }
      ],
      note: "Every holder is verified. Every transfer is checked against the asset’s rules."
    },
    foot: ["tokeniser.com (home, product, technology)"],
    facts: [
      { claim: "Tokeniser is a Redbelly Network project.", src: "tkHome", quote: "Tokeniser is a Redbelly Network project" },
      { claim: "It runs on Redbelly Network.", src: "tkHome", quote: "Tokeniser operates on Redbelly Network" },
      { claim: "Registry, investor portal and API.", src: "tkProduct", quote: "Program the rules of your asset, with admin tools, an investor portal, and an API for automations and build-your-own portals." },
      { claim: "For funds, shares (equities), loans and notes.", src: "tkProduct", quote: "End-to-end management of funds, equities, loans and notes." },
      { claim: "Stack: Tokeniser issues, Averer reaches, Redbelly Network settles.", src: "tkTech", quote: "Compliant issuance and lifecycle of tokenised assets." },
      { claim: "Averer: identity and wallet; credentials gate every holder.", src: "tkTech", quote: "Identity and the AI-native wallet. Verifiable credentials gate every holder" },
      { claim: "Redbelly Network settles; final the moment it completes.", src: "tkTech", quote: "final the moment it completes" },
      { claim: "Every holder verified and every transfer checked, automatically.", src: "tkHome", quote: "Every holder is verified and every transfer checked against the asset's rules, automatically." }
    ]
  },

  /* ------------------------------------------------------------------ 08 */
  {
    n: 8,
    slug: "compliance-aware-assets",
    title: "Compliance aware assets",
    lead: "On Redbelly, an asset can carry its own rules. Every transfer is checked against them before it goes through.",
    visual: {
      type: "gate",
      token: { name: "Asset token", rules: ["Holder is verified", "Holder is eligible", "Within limits"] },
      pass: { title: "Passes", text: "Transfer completes" },
      fail: { title: "Not eligible", text: "Transfer does not proceed" },
      chips: [
        { icon: "stamp", title: "Set by the issuer", text: "In line with its licence and mandate." },
        { icon: "log",   title: "Logged",            text: "Every check is recorded." },
        { icon: "link",  title: "Carried over",      text: "Rules stay with the asset in other apps." }
      ]
    },
    foot: ["Redbelly whitepaper", "tokeniser.com"],
    facts: [
      { claim: "An asset can carry its own rules (compliance becomes a property of the asset).", src: "wpPdf", quote: "This transforms the complexity of compliance assurance into an inherent property of the assets themselves." },
      { claim: "Only eligible parties can hold the token.", src: "wpPdf", quote: "only parties that can prove their eligibility will be able to hold the token" },
      { claim: "Checks: identity, eligibility and limits, before the trade. Failing trades do not proceed. Every check is logged.", src: "tkComp", quote: "Before any trade proceeds, the investor's identity, eligibility (including wholesale or sophisticated status where required) and your limits are verified automatically. Trades that fail a check do not proceed, and every check is logged." },
      { claim: "Eligibility is enforced at the point of trade.", src: "assetTok", quote: "defined investor eligibility, enforced at the point of trade" },
      { claim: "Set by the issuer in line with its licence and mandate.", src: "wpPdf", quote: "embed turnkey jurisdictional compliance, according to their license and mandate, into their tokenised assets directly" },
      { claim: "Rules carry over when assets meet other apps on the network.", src: "wpPdf", quote: "when different tokenised assets and protocols interact on our network, they automatically inherit the compliance properties of the underlying assets" }
    ]
  },

  /* ------------------------------------------------------------------ 09 */
  {
    n: 9,
    slug: "identity-and-accountability",
    title: "Identity and accountability",
    lead: "On Redbelly, every participant is known, and a node that cheats leaves proof it cannot deny.",
    visual: {
      type: "lanes",
      lanes: [
        { label: "People", steps: [
          { icon: "idbadge", title: "Known",     text: "Verified by accredited credential issuers." },
          { icon: "link",    title: "Traceable", text: "Each transaction ties back to a responsible party." }
        ] },
        { label: "Nodes", steps: [
          { icon: "warning",     title: "A node cheats",  text: "" },
          { icon: "fingerprint", title: "Signed traces",  text: "" },
          { icon: "evidence",    title: "Proof of fraud", text: "" },
          { icon: "exit",        title: "Removed",        text: "" }
        ] }
      ],
      note: "Identities are verified, while zero knowledge proofs keep personal data private."
    },
    foot: ["Redbelly whitepaper", "research hub", "Acacia page"],
    facts: [
      { claim: "Every participant is known.", src: "wpPage", quote: "an innovative identity layer that ensures all network participants are known" },
      { claim: "A node that cheats leaves proof it cannot deny.", src: "wpPdf", quote: "Think of these as digital fingerprints that cannot be denied." },
      { claim: "Participants are verified by accredited credential issuers.", src: "wpPdf", quote: "We enforce mandatory identity verification for all network participants through our marketplace of accredited verifiable credential issuers." },
      { claim: "Each transaction ties back to a responsible party.", src: "wpPdf", quote: "all transactions can be tied back to a responsible entity" },
      { claim: "Accountability at protocol level through proofs of fraud (Polygraph) and an identity layer.", src: "wpPage", quote: "Accountability is enforced at a protocol level through a novel mechanism that constructs undeniable proofs of fraud" },
      { claim: "A cheating node leaves signed traces that become proof of fraud.", src: "wpPdf", quote: "they leave cryptographically signed traces that honest nodes can combine to build undeniable proofs of fraud" },
      { claim: "Faulty nodes are removed from consensus.", src: "wpPdf", quote: "an exclusion protocol to remove the identified faulty nodes from the consensus committee" },
      { claim: "Polygraph is the first accountable Byzantine consensus algorithm.", src: "research", quote: "Polygraph, the first accountable Byzantine consensus algorithm" },
      { claim: "Identities are verified while ZK proofs keep personal data private.", src: "acacia", quote: "Participants verify their identities, but their privacy remains protected through zero-knowledge proofs." }
    ]
  },

  /* ------------------------------------------------------------------ 10 */
  {
    n: 10,
    slug: "governance",
    title: "Governance",
    lead: "The Redbelly Community DAO decides by vote on its own platform. Only identity verified wallets can vote.",
    visual: {
      type: "governance",
      steps: [
        { icon: "ballot", title: "Propose", text: "Posted on the platform, locked once open." },
        { icon: "pen",    title: "Vote",    text: "Sign a message. No transaction, no gas." },
        { icon: "tally",  title: "Count",   text: "RBNT held, or one vote per verified address." },
        { icon: "receipt", title: "Check",  text: "Signed ballots anyone can re-check." }
      ],
      status: [
        { dot: "ok",   label: "HIGH COUNCIL", text: "3 elected seats" },
        { dot: "ok",   label: "WORKING GROUPS", text: "5 pods" },
        { dot: "warn", label: "TREASURY", text: "New funding paused" }
      ],
      note: "Voting moved off Snapshot. Past votes are imported."
    },
    foot: ["DAO voting platform", "TASK-23 changelog"],
    facts: [
      { claim: "The DAO decides by vote on its own platform.", src: "voteList", quote: "Signature voting on Redbelly. No gas, no subscription." },
      { claim: "Only identity verified wallets can vote.", src: "vote", quote: "Every address here clears Redbelly’s passport-backed identity check." },
      { claim: "Verified wallets hold a Receptor credential.", src: "voteCreate", quote: "Only wallets holding a Receptor credential can vote, as Redbelly requires one for network access." },
      { claim: "Propose: posted on the platform, locked (cannot be edited) once open.", src: "voteCreate", quote: "a proposal cannot be edited once it is open" },
      { claim: "Voting is signing a message: no transaction, no gas.", src: "voteSafety", quote: "you sign a message, you never send a transaction" },
      { claim: "Voting costs no gas.", src: "voteSafety", quote: "Voting here costs no gas because nothing is ever sent to the chain." },
      { claim: "Voting power can be RBNT held.", src: "voteCreate", quote: "Voting power equals the native RBNT held at the snapshot block." },
      { claim: "Or one vote per verified address.", src: "voteOpov", quote: "One verified address, one vote" },
      { claim: "Check: signed ballots anyone can re-check.", src: "voteSafety", quote: "Your signature is stored with your ballot, so anyone can re-verify that your vote was really yours without trusting this server." },
      { claim: "High Council: 3 seats elected July 2026.", src: "task23", quote: "The High Council seats elected in July 2026" },
      { claim: "Five pods (working groups).", src: "task23", quote: "Five pods: Marketing, Builder/Develop, Researcher, Community and Partnerships." },
      { claim: "Treasury: new funding (new treasury-funded initiatives) paused until a future vote resumes it.", src: "task23", quote: "New treasury-funded initiatives are suspended until a future governance vote resumes them. Existing approved obligations continue." },
      { claim: "Past Snapshot votes are imported on the platform.", src: "voteImported", quote: "IMPORTED FROM SNAPSHOT" }
    ]
  },

  /* ------------------------------------------------------------------ 11 */
  {
    n: 11,
    slug: "project-acacia",
    title: "Project Acacia",
    lead: "A real money pilot by the Reserve Bank of Australia (RBA) and the DFCRC, testing tokenised assets and digital money. Redbelly was one of the platforms.",
    visual: {
      type: "acacia",
      stats: [
        { big: "1 of 3",      text: "platforms the RBA issued its pilot central bank digital currency onto, and the only public one." },
        { big: "5 of 20",     text: "completed use cases ran on Redbelly’s mainnet." },
        { pre: "Under", big: "4 min", text: "to issue and resell Australia’s first tokenised corporate bond on Redbelly. Normally up to 4 days." }
      ],
      timeline: [
        { when: "Jul 2025", what: "Participants named" },
        { when: "Feb 2026", what: "Testing ends" },
        { when: "May 2026", what: "Final report" }
      ]
    },
    foot: ["TASK-07 deep dive", "redbelly.network/projectacacia"],
    facts: [
      { claim: "Project Acacia: RBA and DFCRC real money pilot on tokenised money and assets.", src: "task07", quote: "a real-money pilot examining how tokenised money and assets could improve Australia’s wholesale financial markets" },
      { claim: "The RBA issued its pilot wholesale CBDC onto 3 platforms; Redbelly was the only public one.", src: "task07", quote: "Of the three platforms onto which the RBA actually issued its pilot wholesale central bank digital currency (wCBDC), Redbelly was the only one built on public, generally accessible infrastructure" },
      { claim: "5 of the 20 completed use cases ran on Redbelly's mainnet.", src: "task07", quote: "used Redbelly’s mainnet across five of the twenty completed use cases" },
      { claim: "Australia's first tokenised corporate bond.", src: "task07", quote: "Imperium Markets issued CLIFFO Series 1, Australia’s first tokenised corporate bond" },
      { claim: "Issued and resold on Redbelly in under 4 minutes.", src: "task07", quote: "issuance, coupon registration, and the secondary transfer completed end-to-end in under four minutes on Redbelly" },
      { claim: "Normally up to 4 days.", src: "task07", quote: "would conventionally have taken up to four days" },
      { claim: "Timeline: participants announced July 2025; testing to February 2026.", src: "task07", quote: "ran from July 2025 (when participants were announced) through February 2026" },
      { claim: "RBA final report: May 2026.", src: "task07", quote: "the RBA’s May 2026 Final Report" },
      { claim: "The RBA minted pilot wholesale CBDC onto the Redbelly mainnet.", src: "acacia", quote: "The RBA will mint a limited amount of wholesale CBDC directly onto the Redbelly mainnet" }
    ]
  }
];
