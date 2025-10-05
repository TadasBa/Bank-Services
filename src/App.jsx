import React, { useEffect, useMemo, useState } from "react";

// ===== i18n (UI strings) =====
const UI = {
  lt: {
    servicesTitle: "Paslaugos",
    searchLabel: "Paieška",
    searchPh: "Pvz.: SEPA Instant, kortelė",
    categoryLabel: "Kategorija",
    all: "Visos",
    cat: {
      payments: "Mokėjimai",
      accounts: "Sąskaitos",
      cards: "Kortelės",
      cash: "Grynieji",
      wallets: "Skaitmeninės piniginės",
    },
    help: "Pagalba",
    helpAndComplaints: "Pagalba ir skundai",
    helpText:
      "Susisiekite: support@example · +370 600 00000 (I–V 8:00–18:00 EET). Skundų nagrinėjimas: pateikite per interneto banką → Pagalba → Skundai. Atsakysime per 15 d. d.; jei netenkina, galite kreiptis į priežiūros instituciją.",
    noResults:
      "Rezultatų nėra. Patikslinkite paiešką arba kreipkitės pagalbos.",
    effectiveFrom: "Įsigalioja nuo",
    lastUpdated: "Pask. atnaujinta",
    version: "Versija",
    priceTitle: "Kaina ir mokesčiai",
    conditionsTitle: "Sąlygos",
    requirementsTitle: "Reikalavimai",
    howToTitle: "Instrukcijos",
    documentsTitle: "Dokumentai",
    faqTitle: "DUK",
    serviceCol: "Paslauga",
    feeCol: "Mokestis",
    close: "Uždaryti",
    footer:
      "Šiame puslapyje pateikti duomenys yra demonstraciniai. Visos kainos ir limitai – pavyzdžiai.",
  },
  en: {
    servicesTitle: "Services",
    searchLabel: "Search",
    searchPh: "e.g., SEPA Instant, card",
    categoryLabel: "Category",
    all: "All",
    cat: {
      payments: "Payments",
      accounts: "Accounts",
      cards: "Cards",
      cash: "Cash",
      wallets: "Digital wallets",
    },
    help: "Support",
    helpAndComplaints: "Support & complaints",
    helpText:
      "Contact: support@example · +370 600 00000 (Mon–Fri 8:00–18:00 EET). Complaints: via online banking → Support → Complaints. We reply within 15 business days; you may escalate to the supervisor if unsatisfied.",
    noResults: "No results. Refine your search or contact support.",
    effectiveFrom: "Effective from",
    lastUpdated: "Last updated",
    version: "Version",
    priceTitle: "Pricing",
    conditionsTitle: "Conditions",
    requirementsTitle: "Requirements",
    howToTitle: "How to",
    documentsTitle: "Documents",
    faqTitle: "FAQ",
    serviceCol: "Service",
    feeCol: "Fee",
    close: "Close",
    footer:
      "Data on this page is for demonstration only. All prices and limits are examples.",
  },
};

const documentsRegistry = [
  {
    id: "DOC-FEES-IBAN-LT",
    title: "Asmeninės sąskaitos kainynas",
    product: "IBAN",
    language: "lt",
    version: "1.4",
    effective_from: "2025-09-01",
    supersedes: "1.3",
    file: "docs/fees-iban-lt-v1.4.pdf",
    sha256: "demo-hash-aaa",
  },
  {
    id: "DOC-FEES-IBAN-EN",
    title: "Personal account fees",
    product: "IBAN",
    language: "en",
    version: "1.4",
    effective_from: "2025-09-01",
    supersedes: "1.3",
    file: "docs/fees-iban-en-v1.4.pdf",
    sha256: "demo-hash-bbb",
  },
  {
    id: "DOC-TERMS-SEPA-LT",
    title: "SEPA pervedimų taisyklės",
    product: "SEPA",
    language: "lt",
    version: "2.0",
    effective_from: "2025-08-15",
    supersedes: "1.9",
    file: "docs/terms-sepa-lt-v2.0.pdf",
    sha256: "demo-hash-ccc",
  },
];

const services = [
  // Payments
  {
    id: "sepa-instant",
    categoryKey: "payments",
    locales: {
      lt: {
        name: "SEPA momentinis pervedimas (SEPA Instant)",
        summary:
          "Eurų pervedimai EEE erdvėje, vykdomi per kelias sekundes visą parą (24/7/365).",
        pricing: {
          note: "Skaičiai pavyzdiniai – tik demonstracijai.",
          table: [
            { item: "Išeinantis momentinis pervedimas", fee: "€0.35 / operacija" },
            { item: "Įeinantis momentinis pervedimas", fee: "€0.00" },
            { item: "Fallback į įprastą SEPA", fee: "€0.20" },
          ],
        },
        conditions: [
          "Dienos limitas: €15 000 (pavyzdys)",
          "Gavėjo bankas turi palaikyti SEPA Instant",
          "Jei limitas viršijamas arba gavėjas nepalaiko – vykdomas įprastas SEPA",
        ],
        requirements: ["Asmeninė mokėjimų sąskaita (IBAN)", "2FA patvirtinimas"],
        howto: [
          "Internetinis bankas: Pervedimai → SEPA → Momentinis",
          "Įveskite gavėjo IBAN, sumą ir paskirtį",
          "Patvirtinkite 2FA; jei nepavyksta – bandymas vykdomas kaip įprastas SEPA",
        ],
        faq: [
          { q: "Kiek laiko trunka?", a: "Įprastai 5–10 s, jei gavėjo bankas palaiko SEPA Instant." },
          { q: "Kodėl operacija išsiųsta kaip įprastas SEPA?", a: "Viršytas limitas arba gavėjo bankas nepalaiko SEPA Instant." },
        ],
        docs: ["DOC-TERMS-SEPA-LT"],
        last_updated: "2025-10-05",
        effective_from: "2025-10-01",
        version: "1.0",
      },
      en: {
        name: "SEPA Instant transfer",
        summary: "Euro transfers within the EEA executed in seconds, 24/7/365.",
        pricing: {
          note: "Figures are illustrative for demo only.",
          table: [
            { item: "Outgoing instant transfer", fee: "€0.35 / transfer" },
            { item: "Incoming instant transfer", fee: "€0.00" },
            { item: "Fallback to regular SEPA", fee: "€0.20" },
          ],
        },
        conditions: [
          "Daily limit: €15,000 (example)",
          "Receiver’s bank must support SEPA Instant",
          "If limit exceeded or unsupported – processed as regular SEPA",
        ],
        requirements: ["Payment account (IBAN)", "2FA approval"],
        howto: [
          "Online banking: Transfers → SEPA → Instant",
          "Enter beneficiary IBAN, amount and payment reference",
          "Approve with 2FA; fallback to regular SEPA if needed",
        ],
        faq: [
          { q: "How long does it take?", a: "Usually 5–10s if the beneficiary bank supports SEPA Instant." },
          { q: "Why did it go as regular SEPA?", a: "Limit exceeded or beneficiary bank doesn’t support instant." },
        ],
        docs: ["DOC-TERMS-SEPA-LT"],
        last_updated: "2025-10-05",
        effective_from: "2025-10-01",
        version: "1.0",
      },
    },
  },
  {
    id: "sepa-outgoing",
    categoryKey: "payments",
    locales: {
      lt: {
        name: "SEPA pervedimas (įprastas)",
        summary: "Eurų pervedimas EEE erdvėje darbo laiku.",
        pricing: { table: [
          { item: "Išeinantis SEPA pervedimas", fee: "€0.20 / operacija" },
          { item: "Įeinantis SEPA pervedimas", fee: "€0.00" },
        ]},
        conditions: ["Cut-off 16:00 EET (pavyzdys)", "Vykdymas T+0/T+1"],
        requirements: ["IBAN sąskaita"],
        howto: ["Pervedimai → SEPA → Standartinis", "Užpildykite formą", "Patvirtinkite 2FA"],
        faq: [{ q: "Kada pasieks gavėją?", a: "Tą pačią arba kitą d. d., priklausomai nuo cut-off." }],
        docs: [],
        last_updated: "2025-10-05",
        version: "1.0",
      },
      en: {
        name: "SEPA transfer (regular)",
        summary: "Euro transfer within the EEA during business hours.",
        pricing: { table: [
          { item: "Outgoing SEPA transfer", fee: "€0.20 / transfer" },
          { item: "Incoming SEPA transfer", fee: "€0.00" },
        ]},
        conditions: ["Cut-off 16:00 EET (example)", "Settlement T+0/T+1"],
        requirements: ["IBAN account"],
        howto: ["Transfers → SEPA → Regular", "Fill the form", "Approve with 2FA"],
        faq: [{ q: "When will it arrive?", a: "Same or next business day depending on cut-off." }],
        docs: [],
        last_updated: "2025-10-05",
        version: "1.0",
      },
    },
  },
  // Accounts
  {
    id: "personal-account",
    categoryKey: "accounts",
    locales: {
      lt: {
        name: "Asmeninė mokėjimų sąskaita (IBAN)",
        summary:
          "Dedikuota IBAN sąskaita kasdieniams atsiskaitymams ir pervedimams.",
        pricing: { table: [
          { item: "Sąskaitos atidarymas", fee: "€0.00" },
          { item: "Įeinantis SEPA pervedimas", fee: "€0.00" },
        ] },
        conditions: ["EEA residents", "KYC completed", "Risk-based limits may apply"],
        requirements: ["Galiojantis asmens dokumentas", "Gyvenamosios vietos duomenys"],
        howto: [
          "Registruokitės interneto banke arba programėlėje",
          "Užbaikite KYC tapatybės patvirtinimą",
          "Papildykite sąskaitą SEPA pervedimu",
        ],
        faq: [
          { q: "Ar IBAN vardinis?", a: "Taip" },
          { q: "Kaip papildyti?", a: "Per SEPA/SWIFT" },
        ],
        docs: ["DOC-FEES-IBAN-LT"],
        last_updated: "2025-10-05",
        version: "1.0",
      },
      en: {
        name: "Personal payment account (IBAN)",
        summary: "Dedicated IBAN account for everyday payments.",
        pricing: { table: [
          { item: "Account opening", fee: "€0.00" },
          { item: "Incoming SEPA transfer", fee: "€0.00" },
        ] },
        conditions: ["EEA residents", "KYC completed", "Risk-based limits may apply"],
        requirements: ["Valid identity document", "Residential address"],
        howto: [
          "Register in online banking or the app",
          "Complete KYC identity verification",
          "Top up via SEPA transfer",
        ],
        faq: [
          { q: "Is the IBAN named?", a: "Yes" },
          { q: "How to top up?", a: "SEPA/SWIFT" },
        ],
        docs: ["DOC-FEES-IBAN-EN"],
        last_updated: "2025-10-05",
        version: "1.0",
      },
    },
  },
  // Cards
  {
    id: "card-payments",
    categoryKey: "cards",
    locales: {
      lt: {
        name: "Atsiskaitymai kortele (POS/e-komercija)",
        summary: "Mokėjimai prekybos vietose ir internetu, įskaitant bekontakčius atsiskaitymus.",
        pricing: { table: [
          { item: "Atsiskaitymas kortele EUR zonoje", fee: "€0.00" },
          { item: "Valiutos konversija (pavyzdys)", fee: "+2.0% nuo kurso" },
        ]},
        conditions: ["Dienos limitas: €2 000 (pavyzdys)", "Offline bekontaktis limitas: €150 (pavyzdys)"],
        requirements: ["Aktyvi kortelė", "PIN ar 3DS autentifikacija"] ,
        howto: ["Įgalinkite kortelę programėlėje", "Atsiskaitykite POS arba internetu", "Patvirtinkite 3DS, jei prašoma"],
        faq: [{ q: "Ar yra savaitgalio FX?", a: "+2% pavyzdyje (tik demo)." }],
        docs: [],
        last_updated: "2025-10-05",
        version: "1.0",
      },
      en: {
        name: "Card payments (POS/e-commerce)",
        summary: "Payments at merchants and online, including contactless.",
        pricing: { table: [
          { item: "Card payment in EUR area", fee: "€0.00" },
          { item: "Currency conversion (example)", fee: "+2.0% above rate" },
        ]},
        conditions: ["Daily limit: €2,000 (example)", "Offline contactless limit: €150 (example)"],
        requirements: ["Active card", "PIN or 3DS authentication"],
        howto: ["Enable the card in the app", "Pay at POS or online", "Complete 3DS if prompted"],
        faq: [{ q: "Weekend FX?", a: "+2% in this demo example." }],
        docs: [],
        last_updated: "2025-10-05",
        version: "1.0",
      },
    },
  },
  // Cash
  {
    id: "atm-withdrawal",
    categoryKey: "cash",
    locales: {
      lt: {
        name: "Grynųjų išėmimas iš bankomato",
        summary: "Išsiimkite grynuosius bet kuriame bankomate, kuriame priimamos jūsų kortelės.",
        pricing: { table: [
          { item: "Išgryninimas banko tinkle (pvz.)", fee: "€1.00 / operacija" },
          { item: "Išgryninimas kitame tinkle (pvz.)", fee: "€2.00 + 1%" },
          { item: "Trečiųjų šalių bankomato mokestis", fee: "Gali būti taikomas papildomai" },
        ]},
        conditions: ["Dienos limitas: €1 000 (pavyzdys)", "Regioniniai ar bankomato savininko mokesčiai gali būti taikomi"],
        requirements: ["Aktyvi kortelė", "PIN"],
        howto: ["Įdėkite kortelę", "Įveskite PIN", "Pasirinkite sumą"],
        faq: [{ q: "Kodėl nuskaitytas papildomas mokestis?", a: "Bankomato savininkas gali taikyti savo mokestį." }],
        docs: [],
        last_updated: "2025-10-05",
        version: "1.0",
      },
      en: {
        name: "ATM cash withdrawal",
        summary: "Withdraw cash at any ATM that accepts your card.",
        pricing: { table: [
          { item: "Withdrawal in bank network (ex.)", fee: "€1.00 / withdrawal" },
          { item: "Withdrawal in other network (ex.)", fee: "€2.00 + 1%" },
          { item: "ATM owner surcharge", fee: "May apply additionally" },
        ]},
        conditions: ["Daily limit: €1,000 (example)", "Regional/owner fees may apply"],
        requirements: ["Active card", "PIN"],
        howto: ["Insert card", "Enter PIN", "Choose amount"],
        faq: [{ q: "Why extra fee?", a: "The ATM owner may charge a surcharge." }],
        docs: [],
        last_updated: "2025-10-05",
        version: "1.0",
      },
    },
  },
  // Digital wallets
  {
    id: "apple-pay",
    categoryKey: "wallets",
    locales: {
      lt: {
        name: "Apple Pay",
        summary: "Apmokėkite telefonu ar laikrodžiu – saugu ir greita.",
        pricing: { table: [
          { item: "Naudojimas", fee: "€0.00" },
        ]},
        conditions: ["Reikalingas suderinamas įrenginys", "Kortelė turi būti pridėta į Wallet"],
        requirements: ["iPhone/Apple Watch", "Bankinė kortelė"],
        howto: ["Atidarykite Wallet", "Pridėkite kortelę", "Atsiskaitykite bekontakčiu būdu"],
        faq: [{ q: "Kur veikia?", a: "Ten, kur palaikomi bekontakčiai mokėjimai." }],
        docs: [],
        last_updated: "2025-10-05",
        version: "1.0",
      },
      en: {
        name: "Apple Pay",
        summary: "Pay with your phone or watch — secure and fast.",
        pricing: { table: [
          { item: "Usage", fee: "€0.00" },
        ]},
        conditions: ["Compatible device required", "Card must be added to Wallet"],
        requirements: ["iPhone/Apple Watch", "Bank card"],
        howto: ["Open Wallet", "Add your card", "Pay contactlessly"],
        faq: [{ q: "Where does it work?", a: "Where contactless payments are accepted." }],
        docs: [],
        last_updated: "2025-10-05",
        version: "1.0",
      },
    },
  },
];

// Category options in UI per locale
const CATEGORY_OPTIONS = (locale) => [
  { key: "all", label: UI[locale].all },
  { key: "payments", label: UI[locale].cat.payments },
  { key: "accounts", label: UI[locale].cat.accounts },
  { key: "cards", label: UI[locale].cat.cards },
  { key: "cash", label: UI[locale].cat.cash },
  { key: "wallets", label: UI[locale].cat.wallets },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 border">
      {children}
    </span>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h3 className="text-lg font-semibold mt-6 mb-2">{title}</h3>
      <div className="prose max-w-none text-sm">{children}</div>
    </section>
  );
}

function useLatestDocs(docs) {
  return useMemo(() => {
    return docs
      .map((id) => documentsRegistry.find((d) => d.id === id))
      .filter(Boolean)
      .sort((a, b) => (a.effective_from < b.effective_from ? 1 : -1));
  }, [docs]);
}

function ServiceCard({ svc, locale, onOpen }) {
  const l = svc.locales[locale];
  const t = UI[locale];
  return (
    <button
      className="w-full text-left border rounded-2xl p-4 hover:shadow focus:shadow outline-offset-2"
      onClick={() => onOpen(svc.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{l.name}</h3>
          <p className="text-sm mt-1 text-gray-700">{l.summary}</p>
          <div className="mt-2 flex gap-2 flex-wrap">
            <Badge>{UI[locale].cat[svc.categoryKey]}</Badge>
            {l.effective_from && (
              <Badge>
                {t.effectiveFrom}: {l.effective_from}
              </Badge>
            )}
            <Badge>
              {t.lastUpdated}: {l.last_updated}
            </Badge>
            {l.version && (
              <Badge>
                {t.version}: {l.version}
              </Badge>
            )}
          </div>
        </div>
        <span aria-hidden className="text-xl">→</span>
      </div>
    </button>
  );
}

function ServiceDetails({ svc, locale, onClose }) {
  const l = svc.locales[locale];
  const t = UI[locale];
  const latestDocs = useLatestDocs(l.docs || []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // JSON-LD (schema.org) example for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: l.name,
    description: l.summary,
    offers: (l.pricing?.table || []).map((row) => ({
      "@type": "Offer",
      name: row.item,
      price: row.fee,
      priceCurrency: "EUR",
      availabilityStarts: l.effective_from || l.last_updated,
    })),
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl shadow outline outline-1 outline-gray-200"
        style={{ maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header with close button always visible */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b px-6 py-3 flex items-start justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold pr-6">{l.name}</h2>
          <button
            className="rounded-lg border px-3 py-1 text-sm"
            onClick={onClose}
            aria-label={t.close}
          >
            {t.close}
          </button>
        </div>

        {/* Scrollable content */}
        <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: "calc(85vh - 56px)" }}>
          <p className="mt-1 text-gray-700">{l.summary}</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            <Badge>{UI[locale].cat[svc.categoryKey]}</Badge>
            {l.effective_from && <Badge>{UI[locale].effectiveFrom}: {l.effective_from}</Badge>}
            <Badge>{UI[locale].lastUpdated}: {l.last_updated}</Badge>
            {l.version && <Badge>{UI[locale].version}: {l.version}</Badge>}
          </div>

          <nav className="mt-4">
            <ul className="flex flex-wrap gap-2 text-sm">
              {[
                ["price", UI[locale].priceTitle],
                ["cond", UI[locale].conditionsTitle],
                ["req", UI[locale].requirementsTitle],
                ["how", UI[locale].howToTitle],
                ["docs", UI[locale].documentsTitle],
                ["faq", UI[locale].faqTitle],
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="underline focus:outline-offset-4">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Section id="price" title={UI[locale].priceTitle}>
            {l.pricing?.note && (
              <p className="text-xs text-gray-500">{l.pricing.note}</p>
            )}
            <table className="w-full text-sm border mt-2">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2">{UI[locale].serviceCol}</th>
                  <th className="text-left p-2">{UI[locale].feeCol}</th>
                </tr>
              </thead>
              <tbody>
                {(l.pricing?.table || []).map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{row.item}</td>
                    <td className="p-2">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section id="cond" title={UI[locale].conditionsTitle}>
            <ul className="list-disc pl-5">
              {(l.conditions || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>

          <Section id="req" title={UI[locale].requirementsTitle}>
            <ul className="list-disc pl-5">
              {(l.requirements || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>

          <Section id="how" title={UI[locale].howToTitle}>
            <ol className="list-decimal pl-5">
              {(l.howto || []).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ol>
          </Section>

          <Section id="docs" title={UI[locale].documentsTitle}>
            {latestDocs.length === 0 ? (
              <p>—</p>
            ) : (
              <ul className="list-disc pl-5">
                {latestDocs.map((d) => (
                  <li key={d.id}>
                    <span className="font-medium">{d.title}</span> — v{d.version}, {UI[locale].effectiveFrom.toLowerCase()} {d.effective_from} · {" "}
                    <a href={d.file} className="underline">Download</a>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section id="faq" title={UI[locale].faqTitle}>
            <dl>
              {(l.faq || []).map((f, i) => (
                <div key={i} className="mb-2">
                  <dt className="font-medium">{f.q}</dt>
                  <dd className="ml-0">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Section>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </div>
  );
}

export default function Demo() {
  const [locale, setLocale] = useState("lt");
  const [query, setQuery] = useState("");
  const [catKey, setCatKey] = useState("all");
  const [openId, setOpenId] = useState(null);

  const t = UI[locale];

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const l = s.locales[locale];
      const matchesCat = catKey === "all" || s.categoryKey === catKey;
      const q = query.toLowerCase();
      const matchesQuery =
        !q || l.name.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, catKey, locale]);

  const openSvc = services.find((s) => s.id === openId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold">{t.servicesTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="lang">Language</label>
            <select
              id="lang"
              className="border rounded-lg px-2 py-1 text-sm"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
            >
              <option value="lt">LT</option>
              <option value="en">EN</option>
            </select>
            <a href="#support" className="underline text-sm">{t.help}</a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium">{t.searchLabel}</label>
            <input
              id="search"
              className="mt-1 w-full border rounded-xl px-3 py-2"
              placeholder={t.searchPh}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cat" className="block text-sm font-medium">{t.categoryLabel}</label>
            <select
              id="cat"
              className="mt-1 w-full border rounded-xl px-3 py-2"
              value={catKey}
              onChange={(e) => setCatKey(e.target.value)}
            >
              {CATEGORY_OPTIONS(locale).map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-4">
          {filtered.length === 0 && (
            <div className="col-span-full border rounded-2xl p-6">
              <p className="text-sm">{t.noResults}</p>
            </div>
          )}

          {filtered.map((s) => (
            <ServiceCard key={s.id} svc={s} locale={locale} onOpen={setOpenId} />
          ))}
        </div>

        <section id="support" className="mt-10 border rounded-2xl p-5 bg-white">
          <h2 className="text-lg font-semibold">{t.helpAndComplaints}</h2>
          <p className="text-sm mt-1 text-gray-700">{t.helpText}</p>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-8 text-sm text-gray-600">
        <p>{t.footer}</p>
      </footer>

      {openSvc && (
        <ServiceDetails svc={openSvc} locale={locale} onClose={() => setOpenId(null)} />
      )}
    </div>
  );
}
