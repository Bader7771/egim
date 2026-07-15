const galleryImages = [
  ['Classroom learning', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=82'],
  ['Computer lab', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=82'],
  ['Nursing training', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=82'],
  ['Team projects', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=82'],
  ['Campus hallway', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=700&q=82'],
  ['Student activities', 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=700&q=82'],
]

export function CampusGallery() {
  return (
    <section className="campus-section reveal" id="student-life">
      <div className="programs-header">
        <div>
          <span className="section-label">Student Life</span>
          <h2>Learning spaces for focused student growth</h2>
        </div>
        <p>Classrooms, labs, project work, and campus moments come together to support a serious school experience.</p>
      </div>
      <div className="gallery-grid">
        {galleryImages.map(([label, image], index) => (
          <figure className={index === 0 || index === 3 ? 'wide' : ''} key={label}>
            <img src={image} alt={label} />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
