import PdfCard from "./PdfCard";
//import "../styles/latestMaterials.css";

import materials from "../data/materials";

function LatestMaterials() {
  return (
    <section className="latest-materials">

      <h2>Latest Study Materials</h2>

      <p>
        Browse the latest notes and study materials uploaded by faculty.
      </p>

      <div className="material-grid">

        {materials.map((material) => (
          <PdfCard key={material.id} material={material} />
        ))}

      </div>

    </section>
  );
}

export default LatestMaterials;