import Link from "next/link"; // Import de Link pour la navigation entre pages
import { HomeIcon, BarChart2 } from "lucide-react"; // Import des icônes

export default function Navigation() {
  return (
    <nav className="bg-white shadow">
      {" "}
      {/* Barre de navigation avec fond blanc et ombre */}
      <div className="container mx-auto px-4">
        {" "}
        {/* Conteneur centré avec padding */}
        <div className="flex justify-between h-16">
          {" "}
          {/* Flexbox pour aligner les éléments */}
          <div className="flex space-x-4">
            {" "}
            {/* Groupe de liens avec espacement */}
            {/* Lien vers la page d'accueil */}
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-gray-700 hover:text-blue-500"
            >
              <HomeIcon className="w-6 h-6 mr-1" /> {/* Icône de maison */}
              Accueil
            </Link>
            {/* Lien vers la page de statistiques */}
            <Link
              href="/stats"
              className="flex items-center px-2 py-2 text-gray-700 hover:text-blue-500"
            >
              <BarChart2 className="w-6 h-6 mr-1" /> {/* Icône de graphique */}
              Statistiques
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
