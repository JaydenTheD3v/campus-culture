
export default function PagePlaceholder({ title, description }) {
  return (
    <main className="container placeholder-page">
      <p className="eyebrow">CAMPUS CULTURE</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}
