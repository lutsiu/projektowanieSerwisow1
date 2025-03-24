import Account from "../Account";

const dummyAccounts = [
  { id: 1, name: "John Doe", username: "@johndoe" },
  { id: 2, name: "Jane Smith", username: "@janesmith" },
  { id: 3, name: "Alex Johnson", username: "@alexj" },
];

export default function AccountsWrapper({ query }: { query: string }) {
  const filteredAccounts = dummyAccounts.filter((acc) =>
    acc.name.toLowerCase().includes(query.toLowerCase()) ||
    acc.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-3 mt-3">
      {filteredAccounts.map((account) => (
        <Account key={account.id} {...account} />
      ))}
    </div>
  );
}
