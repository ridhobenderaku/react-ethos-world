export default function Table({ Content, Footer }) {
  return (
    <div className="card card-success card-outline card-outline-tabs p-0">
      <div className="card-body p-0">
        <div className="table-responsive">{Content}</div>
      </div>
      <div className="card-footer p-0">{Footer}</div>
    </div>
  );
}
