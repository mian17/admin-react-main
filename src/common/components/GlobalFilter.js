export default function GlobalFilter({ filter, setFilter }) {
  return (
    <span>
      <strong className="mr-2">Tìm kiếm</strong>
      <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  );
}
