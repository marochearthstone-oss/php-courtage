"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface LexiqueTerm {
  term: string
  definition: string
  category: string
}

interface LexiqueProps {
  highlightedText?: string
  onTermClick?: (term: string) => void
}

const lexiqueData: LexiqueTerm[] = [
  {
    term: "Assurance",
    definition: "Service financier offert par une compagnie d'assurance à ses clients qui consiste à couvrir partiellement ou totalement les frais en cas de sinistre.",
    category: "Général"
  },
  {
    term: "Cabinet de courtage",
    definition: "Une entreprise spécialisée dans le courtage, c'est-à-dire l'intermédiation entre deux parties pour la conclusion d'un contrat, notamment dans les domaines de l'assurance, des produits financiers, ou des biens immobiliers.",
    category: "Organisation"
  },
  {
    term: "Sécurité sociale",
    definition: "Un ensemble d'institutions publiques qui offrent une protection sociale aux citoyens contre divers risques sociaux, tels que la maladie, la vieillesse, le chômage, et les accidents du travail.",
    category: "Institution"
  },
  {
    term: "Mutuelle santé",
    definition: "Une assurance privée qui complète les remboursements de la Sécurité sociale pour les frais de santé. Elle permet de réduire ou d'éliminer le reste à charge de l'assuré.",
    category: "Assurance"
  },
  {
    term: "Prévoyance",
    definition: "Dans le contexte de l'assurance, est un ensemble de garanties qui visent à protéger les personnes contre les conséquences financières de certains événements de la vie comme la maladie, l'accident, l'invalidité ou le décès.",
    category: "Assurance"
  },
  {
    term: "Indemnités journalières hospitalières",
    definition: "Prestations financières versées par les assurances privées pour compenser les frais liés à une hospitalisation, qu'elle soit due à une maladie ou à un accident.",
    category: "Prestation"
  },
  {
    term: "Capital décès",
    definition: "Une somme d'argent versée en cas de décès d'une personne, soit par la sécurité sociale, soit par une assurance privée souscrite par la personne décédée.",
    category: "Prestation"
  },
  {
    term: "Protection juridique",
    definition: "Une assurance qui prend en charge les frais et services liés à un litige ou différend entre l'assuré et un tiers. Elle permet de bénéficier d'une assistance juridique et financière.",
    category: "Assurance"
  },
  {
    term: "Assurance obsèques",
    definition: "Couvre entièrement ou partiellement les frais des funérailles. Le souscripteur définit lui-même le montant qu'il souhaite assurer en vue de son décès.",
    category: "Assurance"
  },
  {
    term: "Tutelle",
    definition: "Est une mesure judiciaire de protection d'un majeur qui n'est plus en mesure de veiller seul sur ses propres intérêts en raison d'une altération de ses facultés mentales ou corporelles.",
    category: "Juridique"
  },
  {
    term: "Curatelle",
    definition: "Est une mesure de protection juridique pour les personnes majeures dont les facultés mentales ou corporelles sont altérées, les rendant partiellement incapables de gérer seules leurs affaires.",
    category: "Juridique"
  },
  {
    term: "Délai de carence",
    definition: "Une période de temps qui s'écoule entre la survenance d'un événement et le moment où des prestations ou des droits deviennent effectifs.",
    category: "Contractuel"
  },
  {
    term: "Reste à charge",
    definition: "Désigne la part dont un assuré doit s'acquitter après remboursement de l'Assurance Maladie et de sa complémentaire santé.",
    category: "Financier"
  },
  {
    term: "Date d'effet",
    definition: "Est la date à laquelle les obligations et droits définis dans le contrat deviennent juridiquement valables et applicables.",
    category: "Contractuel"
  },
  {
    term: "Date d'échéance",
    definition: "Est la date à laquelle les obligations et droits définis dans le contrat prennent fin. C'est la date de fin du contrat.",
    category: "Contractuel"
  },
  {
    term: "Tacite reconduction",
    definition: "Est le renouvellement automatique d'un contrat à son échéance, sans que les parties aient besoin de manifester explicitement leur accord.",
    category: "Contractuel"
  },
  {
    term: "Résiliation",
    definition: "Désigne la cessation des effets d'un contrat à une date donnée. Elle met fin au contrat pour l'avenir, mais ne remet pas en cause les effets produits antérieurement.",
    category: "Contractuel"
  },
  {
    term: "Signature électronique",
    definition: "Est la version numérique d'une signature manuscrite, permettant d'apposer une identification sur un document électronique et de garantir son intégrité et l'authenticité du signataire.",
    category: "Technologique"
  },
  {
    term: "RIB",
    definition: "C'est un document qui contient les informations essentielles pour identifier un compte bancaire et effectuer des transactions financières, notamment les virements et les prélèvements.",
    category: "Bancaire"
  },
  {
    term: "CNIL",
    definition: "Elle est chargée de veiller à la protection des données personnelles contenues dans les fichiers et traitements informatiques ou papiers, aussi bien publics que privés.",
    category: "Institution"
  },
  {
    term: "RGPD",
    definition: "Est un règlement européen qui encadre le traitement des données personnelles au sein de l'Union Européenne. Il vise à harmoniser les règles et à renforcer les droits des individus concernant leurs données personnelles.",
    category: "Réglementation"
  },
  {
    term: "Bloctel",
    definition: "Est un service gratuit, géré par le gouvernement français, qui permet aux consommateurs de s'opposer au démarchage téléphonique.",
    category: "Service"
  },
  {
    term: "Réflexion",
    definition: "Période de 14 jours après souscription pendant laquelle le client peut annuler son contrat sans pénalité. Remplace le terme 'rétractation' pour les contrats de vente.",
    category: "Contractuel"
  },
  {
    term: "IBAN",
    definition: "International Bank Account Number - Numéro de compte bancaire international standardisé qui permet d'identifier un compte bancaire de manière unique. Format : 2 lettres (pays) + 2 chiffres (clé) + numéro de compte.",
    category: "Bancaire"
  },
  {
    term: "NIR",
    definition: "Numéro d'Inscription au Répertoire - Numéro de sécurité sociale français unique composé de 15 caractères (13 chiffres + clé de contrôle à 2 chiffres). Identifie chaque personne auprès de la Sécurité sociale.",
    category: "Institution"
  }
]

export default function Lexique({ highlightedText, onTermClick }: LexiqueProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const categories = ["Tous", ...Array.from(new Set(lexiqueData.map(item => item.category)))]

  const filteredTerms = lexiqueData.filter(term => {
    const matchesCategory = selectedCategory === "Tous" || term.category === selectedCategory
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const highlightTermsInText = (text: string) => {
    if (!text) return text

    let highlightedText = text
    lexiqueData.forEach(term => {
      const regex = new RegExp(`\\b${term.term}\\b`, 'gi')
      highlightedText = highlightedText.replace(regex, `<span class="lexique-term tooltip" data-definition="${term.definition}">$&</span>`)
    })
    return highlightedText
  }

  return (
    <div className="space-y-4">
      {/* Barre de recherche et filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            Lexique Professionnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un terme ou une définition..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des termes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map((term) => (
          <Card key={term.term} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="font-semibold text-blue-800 cursor-help">
                          {term.term}
                        </h3>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">{term.definition}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Badge variant="outline" className="text-xs">
                    {term.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {term.definition}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500">Aucun terme trouvé pour votre recherche.</p>
          </CardContent>
        </Card>
      )}

      {/* Texte avec termes mis en surbrillance */}
      {highlightedText && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Texte avec termes du lexique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: highlightTermsInText(highlightedText) }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Fonction utilitaire pour mettre en surbrillance les termes dans un texte
export const highlightLexiqueTerms = (text: string): string => {
  if (!text) return text

  let highlightedText = text
  lexiqueData.forEach(term => {
    const regex = new RegExp(`\\b${term.term}\\b`, 'gi')
    highlightedText = highlightedText.replace(regex, `<span class="lexique-term tooltip" data-definition="${term.definition}">$&</span>`)
  })
  return highlightedText
}