import { ArrowLeft, ArrowRight, ArrowUpRight, Folder, Wallet } from "lucide-react";

export const accounts = [
  { id: "bac", name: "BAC USD", balance: 42480, currency: "USD", mark: "BAC", color: "red", type: "Bank account", source: "BAC USD", projects: ["Operations", "Mobile App"], allocations: [{ name: "Operations", amount: 12000 }, { name: "Mobile App", amount: 15000 }] },
  { id: "bn", name: "Banco Nacional CRC", balance: 9850000, currency: "CRC", mark: "BN", color: "blue", type: "Bank account", source: "Banco Nacional", projects: [], allocations: [{ name: "Operations", amount: 2500000 }] },
  { id: "usdc", name: "USDC Treasury", balance: 11800, currency: "USD", mark: "$", color: "cyan", type: "Treasury account", source: "USDC Treasury", projects: ["Marketing"], allocations: [{ name: "Marketing", amount: 6000 }] },
  { id: "operating", name: "Operating Budget", balance: 18200, currency: "USD", mark: "OB", color: "lime", type: "Budget allocation", source: "BAC USD", projects: ["Operations"], allocations: [{ name: "Operations", amount: 18200 }] },
];
const money = (n: number, c = "USD") => `${n < 0 ? "−" : ""}${c === "CRC" ? "₡" : "$"}${Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
type Props = {
  selected: string | null;
  select: (id: string | null) => void;
  transactions: { id: string; payable?: string; description: string; date: string; account: string; amount: number; currency: string; status: string }[];
  payables: { id: string; vendor: string; amount: number; currency: string; project: string; status: string }[];
  openTransaction: (id: string) => void;
  openPayable: (id: string) => void;
  openProject: (name: string) => void;
};

export default function Accounts({ selected, select, transactions, payables, openTransaction, openPayable, openProject }: Props) {
  const account = accounts.find(a => a.id === selected);
  if (!account) return <>
    <div className="info-strip"><Wallet size={24} /><div><strong>Your accounts. One financial workspace.</strong><p>Manage balances, budgets, and payables across accounts, wherever your money lives.</p></div><span>4 ACCOUNTS & BUDGETS</span></div>
    <div className="account-cards">{accounts.map(a => <button key={a.id} className="account-card" onClick={() => select(a.id)} aria-label={`Open ${a.name} account`}>
      <div className="account-card-top"><span className={`bank ${a.color}`}>{a.mark}</span><span>{a.type}</span><ArrowUpRight size={18} /></div>
      <h2>{a.name}</h2><strong className="account-balance">{money(a.balance, a.currency)}</strong><small>{a.id === "operating" ? "Allocated from BAC USD" : `${a.currency} · Mock balance`}</small>
      <div className="account-card-footer">View financial activity<ArrowRight size={15} /></div>
    </button>)}</div>
    <p className="bottom-note">Operating Budget is an allocation within BAC USD, not an additional cash balance.</p>
  </>;

  const linked = payables.filter(p => account.projects.includes(p.project) && p.currency === account.currency);
  const recent = transactions.filter(t => t.account === account.source && (account.id !== "operating" || linked.some(p => p.id === t.payable)));
  return <div className="account-detail">
    <button className="text-button account-back" onClick={() => select(null)}><ArrowLeft size={15} />All accounts</button>
    <div className="account-detail-heading"><span className={`bank ${account.color}`}>{account.mark}</span><div><h2>{account.name}</h2><p>{account.type} · {account.currency}{account.id === "operating" ? " · Allocated from BAC USD" : " · Managed in Senda"}</p></div><span className="badge">Mock account</span></div>
    <div className="account-balance-panel"><div><small>Balance</small><strong>{money(account.balance, account.currency)}</strong><p>{account.id === "operating" ? "Funds allocated to day-to-day operations within BAC USD." : "A view of your funds, alongside the work they support."}</p></div><Wallet size={30} /></div>
    <div className="section-head"><h2>Recent transactions <span>{recent.length}</span></h2><small>{account.id === "operating" ? "Linked Operations activity in BAC USD" : "Activity in this account"}</small></div>
    <div className="panel table-wrap"><table><thead><tr><th>Date</th><th>Description</th><th className="right">Amount</th><th>Status</th></tr></thead><tbody>{recent.map(t => <tr key={t.id}><td className="muted">{t.date}, 2026</td><td><button className="row-link" onClick={() => openTransaction(t.id)}>{t.description}<ArrowUpRight size={13} /></button></td><td className="right amount">{t.amount > 0 ? "+" : ""}{money(t.amount, t.currency)}</td><td><span className="badge">{t.status}</span></td></tr>)}</tbody></table>{!recent.length && <p className="empty">No recent transactions in this mock account.</p>}</div>
    <div className="account-detail-columns"><section><div className="section-head"><h2>Assigned budgets</h2></div><div className="panel">{account.allocations.map(b => <button className="budget-link" key={b.name} onClick={() => openProject(b.name)}><span className="avatar"><Folder size={16} /></span><div><strong>{b.name}</strong><small>Allocation in {account.name}</small></div><b>{money(b.amount, account.currency)}</b><ArrowUpRight size={15} /></button>)}</div></section>
    <section><div className="section-head"><h2>Linked payables <span>{linked.length}</span></h2></div><div className="panel table-wrap"><table><thead><tr><th>Vendor</th><th className="right">Amount</th><th>Status</th></tr></thead><tbody>{linked.map(p => <tr key={p.id}><td><button className="row-link" onClick={() => openPayable(p.id)}>{p.vendor}<ArrowUpRight size={13} /></button></td><td className="right amount">{money(p.amount, p.currency)}</td><td><span className="badge">{p.status}</span></td></tr>)}</tbody></table>{!linked.length && <p className="empty">No payables linked to this account yet.</p>}</div></section></div>
    <p className="bottom-note">Illustrative balances and allocations · Payment actions are simulated</p>
  </div>;
}
