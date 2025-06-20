function ListaExcusas({ excusas }) {
  return (
    <div
      className="overflow-auto d-flex flex-column gap-4"
      style={{ maxHeight: '70vh', minHeight: '300px' }}
    >
      {excusas.map((excusa) => (
        <div className="card shadow-sm w-100" key={excusa._id}>
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{excusa.texto}</h5>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="badge bg-secondary px-3 py-2">
                <strong>Credibilidad:</strong> {excusa.credibilidad}
              </span>
              <span className="badge bg-info text-dark px-3 py-2">
                <strong>Contexto:</strong> {excusa.contexto}
              </span>
            </div>
          </div>
        </div>
      ))}
      {excusas.length === 0 && (
        <div className="alert alert-info text-center">No hay excusas para esta categoría.</div>
      )}
    </div>
  );
}
export default ListaExcusas;