"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Lexique from "@/components/Lexique"
import LexiqueTooltip from "@/components/LexiqueTooltip"

interface Message {
  id: number
  text: string
  sender: "conseiller" | "client"
  timestamp: Date
}

interface ResponseCategory {
  id: string
  title: string
  description: string
  objectionResponse: string
}

interface ScriptStep {
  id: number
  title: string
  conseillerMessage: string
  categories: ResponseCategory[]
}

// Fonction pour diviser le texte en segments avec les termes du lexique
const splitTextWithLexiqueTerms = (text: string): React.ReactNode[] => {
  const lexiqueTerms = [
    "Assurance", "Cabinet de courtage", "Sécurité sociale", "Mutuelle santé", 
    "Prévoyance", "Indemnités journalières hospitalières", "Capital décès", 
    "Protection juridique", "Assurance obsèques", "Tutelle", "Curatelle", 
    "Délai de carence", "Reste à charge", "Date d'effet", "Date d'échéance", 
    "Tacite reconduction", "Résiliation", "Signature électronique", "RIB", 
    "CNIL", "RGPD", "Bloctel", "Réflexion", "IBAN", "NIR"
  ]

  if (!text) return [text]

  console.log("🔍 Texte à analyser:", text)
  console.log("📝 Termes du lexique:", lexiqueTerms)

  let segments: React.ReactNode[] = []
  let remainingText = text

  // Trier les termes par longueur décroissante pour éviter les conflits
  const sortedTerms = [...lexiqueTerms].sort((a, b) => b.length - a.length)

  while (remainingText.length > 0) {
    let foundTerm = false
    let earliestIndex = -1
    let foundTermText = ""
    let foundDefinition = ""

    // Chercher le terme qui apparaît en premier
    for (const term of sortedTerms) {
      // Approche simple : recherche directe insensible à la casse
      const termLower = term.toLowerCase()
      const remainingTextLower = remainingText.toLowerCase()
      const index = remainingTextLower.indexOf(termLower)
      
      if (index !== -1) {
        console.log(`✅ Terme trouvé: "${term}" à l'index ${index}`)
        if (earliestIndex === -1 || index < earliestIndex) {
          earliestIndex = index
          foundTermText = remainingText.substring(index, index + term.length)
          foundDefinition = getDefinitionForTerm(term)
        }
      }
    }

    if (earliestIndex >= 0) {
      // Ajouter le texte avant le terme trouvé
      if (earliestIndex > 0) {
        segments.push(remainingText.substring(0, earliestIndex))
      }
      
      // Ajouter le terme avec tooltip
      segments.push(
        <span key={`${remainingText}-${earliestIndex}`} className="bg-yellow-200 px-1 rounded text-sm font-medium cursor-help" title={foundDefinition}>
          {foundTermText}
        </span>
      )
      
      // Mettre à jour le texte restant
      remainingText = remainingText.substring(earliestIndex + foundTermText.length)
      foundTerm = true
      console.log("📍 Segments actuels:", segments.length, "Texte restant:", remainingText)
    } else {
      // Plus aucun terme trouvé, ajouter le reste du texte
      segments.push(remainingText)
      console.log("🏁 Fin du traitement, segments totaux:", segments.length)
      break
    }
  }

  return segments
}

// Fonction pour obtenir la définition d'un terme
const getDefinitionForTerm = (term: string): string => {
  const definitions: Record<string, string> = {
    "Assurance": "Service financier offert par une compagnie d'assurance à ses clients qui consiste à couvrir partiellement ou totalement les frais en cas de sinistre.",
    "Cabinet de courtage": "Une entreprise spécialisée dans le courtage, c'est-à-dire l'intermédiation entre deux parties pour la conclusion d'un contrat.",
    "Sécurité sociale": "Un ensemble d'institutions publiques qui offrent une protection sociale aux citoyens contre divers risques sociaux.",
    "Mutuelle santé": "Une assurance privée qui complète les remboursements de la Sécurité sociale pour les frais de santé.",
    "Prévoyance": "Ensemble de garanties qui visent à protéger les personnes contre les conséquences financières de certains événements de la vie.",
    "Indemnités journalières hospitalières": "Prestations financières versées pour compenser les frais liés à une hospitalisation.",
    "Capital décès": "Une somme d'argent versée en cas de décès d'une personne pour aider les bénéficiaires.",
    "Protection juridique": "Assurance qui prend en charge les frais liés à un litige entre l'assuré et un tiers.",
    "Assurance obsèques": "Couvre entièrement ou partiellement les frais des funérailles.",
    "Tutelle": "Mesure judiciaire de protection d'un majeur qui n'est plus en mesure de veiller seul sur ses propres intérêts.",
    "Curatelle": "Mesure de protection juridique pour les personnes dont les facultés sont altérées.",
    "Délai de carence": "Période qui s'écoule avant que des prestations deviennent effectives.",
    "Reste à charge": "Part dont l'assuré doit s'acquitter après remboursement de l'Assurance Maladie.",
    "Date d'effet": "Date à laquelle les obligations du contrat deviennent applicables.",
    "Date d'échéance": "Date à laquelle le contrat prend fin.",
    "Tacite reconduction": "Renouvellement automatique d'un contrat à son échéance.",
    "Résiliation": "Cessation des effets d'un contrat à une date donnée.",
    "Signature électronique": "Version numérique d'une signature manuscrite garantissant l'authenticité.",
    "RIB": "Document contenant les informations essentielles pour identifier un compte bancaire.",
    "CNIL": "Commission chargée de veiller à la protection des données personnelles.",
    "RGPD": "Règlement européen encadrant le traitement des données personnelles.",
    "Bloctel": "Service permettant aux consommateurs de s'opposer au démarchage téléphonique.",
    "Réflexion": "Période de 14 jours après souscription pendant laquelle le client peut annuler son contrat.",
    "IBAN": "International Bank Account Number - Numéro de compte bancaire international standardisé qui permet d'identifier un compte bancaire de manière unique.",
    "NIR": "Numéro d'Inscription au Répertoire - Numéro de sécurité sociale français unique composé de 15 caractères."
  }
  
  // Recherche insensible à la casse
  const normalizedTerm = term.charAt(0).toUpperCase() + term.slice(1).toLowerCase()
  return definitions[normalizedTerm] || definitions[term] || "Définition non disponible"
}

export default function Home() {
  const [selectedCabinet, setSelectedCabinet] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [messages, setMessages] = useState<Message[]>([])
  const [stepHistory, setStepHistory] = useState<{[key: number]: Message[]}>({})
  const [showLexique, setShowLexique] = useState<boolean>(false)
  const [showIBANValidator, setShowIBANValidator] = useState<boolean>(false)
  const [showNIRValidator, setShowNIRValidator] = useState<boolean>(false)
  const [ibanInput, setIbanInput] = useState<string>("")
  const [nirInput, setNirInput] = useState<string>("")
  const [ibanResult, setIbanResult] = useState<string | null>(null)
  const [nirResult, setNirResult] = useState<string | null>(null)

  const cabinets = [
    {
      id: "php",
      name: "PHP Courtage",
      description: "Courtage en assurances et prévoyance",
      colors: {
        primary: "bg-slate-700",
        secondary: "bg-amber-600",
        accent: "bg-slate-50",
        text: "text-slate-700",
        border: "border-slate-200",
        badge: "bg-slate-100 text-slate-700 border-slate-200"
      }
    },
    {
      id: "gif",
      name: "GIF (Groupe International Français des Assurances)",
      description: "Courtage international en assurances",
      colors: {
        primary: "bg-gray-700",
        secondary: "bg-stone-600",
        accent: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-200",
        badge: "bg-gray-100 text-gray-700 border-gray-200"
      }
    }
  ]

  const startConversation = (cabinetId: string) => {
    setSelectedCabinet(cabinetId)
    const cabinet = cabinets.find(c => c.id === cabinetId)
    
    const initialMessages: Message[] = [
      {
        id: 1,
        text: `Bonjour, je suis [Votre Prénom et Nom], du cabinet ${cabinet?.name}. Je vous contacte au sujet des indemnités journalières hospitalières.`,
        sender: "conseiller",
        timestamp: new Date(Date.now() - 10000)
      }
    ]
    
    setMessages(initialMessages)
    setStepHistory({1: initialMessages})
    setCurrentStep(1)
  }

  const resetConversation = () => {
    setSelectedCabinet(null)
    setCurrentStep(1)
    setMessages([])
    setStepHistory({})
    setShowLexique(false)
    setShowIBANValidator(false)
    setShowNIRValidator(false)
    setIbanInput("")
    setNirInput("")
    setIbanResult(null)
    setNirResult(null)
  }

  // Fonction pour sauvegarder les messages de l'étape actuelle
  const saveStepMessages = (step: number, messagesToSave: Message[]) => {
    setStepHistory(prev => ({
      ...prev,
      [step]: messagesToSave
    }))
  }

  // Fonction pour naviguer vers une étape spécifique
  const goToStep = (step: number) => {
    if (step < 1 || step > 11) return
    
    // Sauvegarder les messages de l'étape actuelle avant de changer
    saveStepMessages(currentStep, messages)
    
    // Charger les messages de la nouvelle étape
    const targetMessages = stepHistory[step] || []
    setMessages(targetMessages)
    setCurrentStep(step)
  }

  // Fonction pour aller à l'étape précédente
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1)
    }
  }

  // Fonction pour aller à l'étape suivante
  const goToNextStep = () => {
    if (currentStep < 11) {
      goToStep(currentStep + 1)
    }
  }

  // Fonction de validation IBAN améliorée
  const parseIbanFR = (iban: string) => {
    const result = { 
      valid: false, 
      error: "",
      country: "",
      bankCode: "",
      branchCode: "",
      accountNumber: "",
      key: "",
      ribKey: "",
      bic: ""
    };
    // Normalise l'IBAN : enlève espaces et passe en majuscules
    const clean = iban.replace(/\s+/g, '').toUpperCase();
    // Vérifie format basique : FR + 2 chiffres + 5 chiffres banque + 5 guichet + 11 alphanum compte + 2 chiffres clé
    if (!/^FR\d{2}\d{5}\d{5}[A-Z0-9]{11}\d{2}$/.test(clean)) {
      result.error = "Format IBAN invalide ou non français";
      return result;
    }
    // Vérifie longueur (27 pour la France)
    if (clean.length !== 27) {
      result.error = "Longueur IBAN incorrecte pour la France";
      return result;
    }
    // Calcul modulo 97 : déplace les 4 premiers chars à la fin
    const rearr = clean.slice(4) + clean.slice(0, 4);
    // Convertit lettres en chiffres (A=10,...Z=35)
    const converted = rearr.replace(/[A-Z]/g, c => (c.charCodeAt(0) - 55).toString());
    // Calcul mod 97 par morceaux (évite grands entiers)
    let checksum = parseInt(converted.slice(0, 2), 10);
    for (let i = 2; i < converted.length; i += 7) {
      const fragment = checksum.toString() + converted.substring(i, i + 7);
      checksum = parseInt(fragment, 10) % 97;
    }
    if (checksum !== 1) {
      result.error = "IBAN invalide (clé de contrôle incorrecte)";
      return result;
    }
    // Extraction des éléments
    result.valid = true;
    result.country = clean.slice(0, 2);        // FR
    result.bankCode = clean.slice(4, 9);       // 5 chiffres code banque
    result.branchCode = clean.slice(9, 14);    // 5 chiffres code guichet
    result.accountNumber = clean.slice(14, 25); // 11 caractères compte
    result.ribKey = clean.slice(25, 27);       // 2 chiffres clé RIB
    // Correspondance code banque -> BIC 
    const bicMap = {
      "30004": "BNPAFRPP",    // BNP PARIBAS (siège)
      "30003": "SOGEFRPP",    // SOCIETE GENERALE (siège)
      "10207": "BCEEFRPP",    // BPCE (Banques Populaire / Caisse d'Epargne) - générique
      "10203": "CEPAFRPP",    // CAISSE D'EPARGNE (exemple générique)
      "30002": "CRLYFRPP",    // LCL / CREDIT LYONNAIS
      "20041": "PSSTFRPP",    // LA BANQUE POSTALE
      "30056": "HSBCFRPP",    // HSBC FRANCE (générique)
      "10107": "BREDFRPP",    // BRED Banque Populaire
      "10106": "AGRIFRPP",    // CREDIT AGRICOLE (souvent AGRIFRPP + suffixe régional)
      "10216": "CMCIDEDD",    // CIC / Crédit Mutuel (ex. CIC / CM)
      "10206": "CCBPFRPP",    // Banque Populaire (ex. CCBPFRPP...)
      "10101": "PSSTFRPP",    // autre variante Banque Postale
      "30066": "CMCI FRPP".replace(/\s+/g,""), // Crédit Mutuel / CIC (exemple)
      "30008": "BNPAFRPP",    // autre code possible lié à BNP
      "10250": "BOUSFRPP",    // Boursorama (siège : BOUSFRPPXXX)
      "30059": "BNPAFRPP",    // variantes BNP
      "10102": "SOGEFRPP",    // variantes Soc Gen
      "10140": "NATXFRPP",    // NATIXIS
      "10506": "CAGLFRPP",    // Exemple CA Loire
      "11346": "ARBPFRPP",    // Exemple - à confirmer par source
      "10201": "AXABFRPP",    // Exemple AXA Bank France (AXABFRPP)
      "30092": "BDFEFRPP",    // BANQUE DE FRANCE
      "10104": "LCLFRPP",     // LCL variants
    };
    result.bic = bicMap[result.bankCode] || null;
    return result;
  }

  // Fonction de validation NIR améliorée
  const parseNIR = (nir: string) => {
    const clean = nir.replace(/\s+/g, ''); 
    if (!/^[12][0-9]{2}[0-1][0-9][0-9A-Z]{2}[0-9]{3}[0-9]{3}[0-9]{2}$/.test(clean)) {
      return { valid: false, error: "Format NIR incorrect" };
    }
    const sex = clean.charAt(0);            // 1 ou 2
    const year = clean.slice(1, 3);         // ex. "55"
    const month = clean.slice(3, 5);        // "01"..."12"
    let dept = clean.slice(5, 7);           // "01"..."95", ou "2A"/"2B", ou "99"
    const commune = clean.slice(7, 10);     // code commune ou pays (3 chif)
    const ordre = clean.slice(10, 13);      // "001"..."999"
    const key = clean.slice(13, 15);        // clé de contrôle (2 chif)
    // Pour le calcul de la clé, remplacer "2A"/"2B" par chiffres
    let deptNum = dept;
    if (dept === "2A") deptNum = "19";
    if (dept === "2B") deptNum = "18";
    // Construit la partie numérique (13 chiffres) et calcule modulo
    const num13 = sex + year + month + deptNum + commune + ordre;
    const mod = parseInt(num13, 10) % 97;
    const computedKey = 97 - mod;
    // Compare avec la clé fournie
    const valid = (computedKey === parseInt(key, 10));
    return {
      valid,
      sexe: sex,
      annee: year,
      mois: month,
      departement: dept,
      commune: commune,
      ordre: ordre,
      cle: key
    };
  }

  const handleIBANValidation = () => {
    if (!ibanInput.trim()) {
      setIbanResult("Veuillez entrer un IBAN")
      return
    }
    const result = parseIbanFR(ibanInput)
    if (result.valid) {
      setIbanResult(`✅ IBAN valide\n\nDétails :\n` +
        `• Pays : ${result.country}\n` +
        `• Code banque : ${result.bankCode}\n` +
        `• Code guichet : ${result.branchCode}\n` +
        `• Numéro de compte : ${result.accountNumber}\n` +
        `• Clé RIB : ${result.ribKey}` +
        (result.bic ? `\n• BIC : ${result.bic}` : ''))
    } else {
      setIbanResult(`❌ ${result.error}`)
    }
  }

  const handleNIRValidation = () => {
    if (!nirInput.trim()) {
      setNirResult("Veuillez entrer un NIR")
      return
    }
    const result = parseNIR(nirInput)
    if (result.valid) {
      const sexeText = result.sexe === '1' ? 'Homme' : 'Femme'
      setNirResult(`✅ NIR valide\n\nDétails :\n` +
        `• Sexe : ${sexeText} (${result.sexe})\n` +
        `• Année de naissance : ${result.annee}\n` +
        `• Mois de naissance : ${result.mois}\n` +
        `• Département : ${result.departement}\n` +
        `• Commune : ${result.commune}\n` +
        `• Numéro d'ordre : ${result.ordre}\n` +
        `• Clé de contrôle : ${result.cle}`)
    } else {
      setNirResult(`❌ ${result.error}`)
    }
  }

  // Composant IBAN Validator
  const IBANValidator = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          🏦 Validateur IBAN
        </CardTitle>
        <p className="text-sm text-gray-600">
          Entrez un IBAN pour vérifier sa validité selon les normes internationales
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">IBAN à valider</label>
          <input
            type="text"
            placeholder="FR14 2004 1010 0505 0001 3M02 606"
            value={ibanInput}
            onChange={(e) => setIbanInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
          <p className="text-xs text-gray-500">
            Exemple : FR14 2004 1010 0505 0001 3M02 606
          </p>
        </div>
        
        <Button 
          onClick={handleIBANValidation}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Valider l'IBAN
        </Button>
        
        {ibanResult && (
          <Card className={`p-3 ${
            ibanResult.includes("✅") ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}>
            <p className={`text-sm font-medium whitespace-pre-line ${
              ibanResult.includes("✅") ? "text-green-800" : "text-red-800"
            }`}>
              {ibanResult}
            </p>
          </Card>
        )}
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3">
            <h4 className="text-sm font-semibold text-blue-800 mb-1">ℹ️ Informations IBAN</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Format français : FR + 2 chiffres (clé) + 5 chiffres (banque) + 5 chiffres (guichet) + 11 caractères (compte) + 2 chiffres (clé RIB)</li>
              <li>• Longueur totale : 27 caractères pour la France</li>
              <li>• Accepte les espaces et majuscules/minuscules</li>
              <li>• Valide la structure mathématique avec modulo 97</li>
              <li>• Détecte automatiquement la banque et le code BIC correspondant</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )

  // Composant NIR Validator
  const NIRValidator = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          🆔 Validateur NIR
        </CardTitle>
        <p className="text-sm text-gray-600">
          Entrez un numéro de sécurité sociale français pour vérifier sa validité
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">NIR à valider</label>
          <input
            type="text"
            placeholder="285072A01312345"
            value={nirInput}
            onChange={(e) => setNirInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <p className="text-xs text-gray-500">
            Exemple : 255081416802538
          </p>
        </div>
        
        <Button 
          onClick={handleNIRValidation}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          Valider le NIR
        </Button>
        
        {nirResult && (
          <Card className={`p-3 ${
            nirResult.includes("✅") ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}>
            <p className={`text-sm font-medium whitespace-pre-line ${
              nirResult.includes("✅") ? "text-green-800" : "text-red-800"
            }`}>
              {nirResult}
            </p>
          </Card>
        )}
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-3">
            <h4 className="text-sm font-semibold text-purple-800 mb-1">ℹ️ Informations NIR</h4>
            <ul className="text-xs text-purple-700 space-y-1">
              <li>• Format : 15 caractères (sexe + année + mois + département + commune + ordre + clé)</li>
              <li>• Sexe : 1 (homme) ou 2 (femme)</li>
              <li>• Année : 2 derniers chiffres de l'année de naissance</li>
              <li>• Mois : 01 à 12 (mois de naissance)</li>
              <li>• Département : 01 à 95, 2A/2B (Corse), ou 99 (étranger)</li>
              <li>• Gère les départements Corses (2A→19, 2B→18) pour le calcul de la clé</li>
              <li>• Valide la clé de contrôle avec modulo 97</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )

  const getCabinetData = () => {
    return cabinets.find(c => c.id === selectedCabinet)
  }

  const getCabinetName = () => {
    return getCabinetData()?.name || ""
  }

  const getCabinetColors = () => {
    return getCabinetData()?.colors || cabinets[0].colors
  }

  const scriptSteps: Record<number, ScriptStep> = {
    1: {
      id: 1,
      title: "1. SALUTATION & PRÉSENTATION",
      conseillerMessage: `Bonjour, je suis [Votre Prénom et Nom], du cabinet ${getCabinetName()}. Je vous contacte au sujet des indemnités journalières hospitalières.`,
      categories: [
        { id: "interesse", title: "Intéressé", description: "Le client est intéressé par la proposition", objectionResponse: "C'est une excellente nouvelle ! Cette garantie est vraiment avantageuse car elle vous protège financièrement dès le premier jour d'hospitalisation. Permettez-moi de vous expliquer plus en détail comment cela fonctionne concrètement." },
        { id: "mecontent", title: "Mécontent", description: "Le client est mécontent ou agacé", objectionResponse: "Je comprends parfaitement votre réaction. Sachez que je vous contacte simplement pour vous informer d'une protection importante, sans aucun engagement de votre part. Je ne prendrai que quelques minutes de votre temps, et si cela ne vous intéresse pas, nous en resterons là." },
        { id: "curieux", title: "Curieux", description: "Le client veut savoir de quoi il s'agit", objectionResponse: "C'est une excellente question ! Il s'agit d'une garantie d'indemnités journalières qui vous verse une somme directement sur votre compte en cas d'hospitalisation. C'est très simple et très utile. Je vais vous expliquer les détails dans un instant." },
        { id: "occupe", title: "Occupé", description: "Le client n'a pas le temps", objectionResponse: "Je comprends que vous êtes occupé. Je serai très bref, moins de 2 minutes pour vous expliquer l'essentiel. Si cela ne vous intéresse pas, nous en resterons là, sans aucun engagement. Vous verrez, c'est vraiment intéressant pour votre protection." },
        { id: "sceptique", title: "Sceptique", description: "Le client doute de l'appel", objectionResponse: `Je comprends votre prudence. Sachez que je suis un conseiller certifié du cabinet ${getCabinetName()} et que nous travaillons avec des assureurs reconnus. Je peux vous envoyer un email de confirmation après notre conversation pour plus de transparence.` },
        { id: "deja_couvert", title: "Déjà couvert", description: "Le client pense être déjà protégé", objectionResponse: "C'est une excellente nouvelle d'avoir déjà une protection ! Cependant, beaucoup de nos clients découvrent que leur couverture actuelle a des limites ou des franchises importantes. Je peux vous expliquer rapidement en quoi notre formule complète vos garanties existantes." },
        { id: "urgence", title: "Urgence", description: "Le client est pressé", objectionResponse: "Je comprends que vous êtes pressé. Je vais faire très court : cette garantie vous verse jusqu'à 180€ par jour en cas d'hospitalisation, sans franchise. Je vous envoie un email avec tous les détails et vous pouvez y réfléchir plus tard. D'accord ?" }
      ]
    },
    2: {
      id: 2,
      title: "2. VÉRIFICATION DE LA RÉCEPTION DU COURRIER",
      conseillerMessage: "Vous avez sans doute reçu un courrier à ce sujet — l'avez-vous déjà reçu ?",
      categories: [
        { id: "oui", title: "Oui, reçu", description: "Le client confirme avoir reçu le courrier", objectionResponse: "Parfait ! Cela facilite notre conversation. Comme indiqué dans ce courrier, cette garantie vous offre une protection financière essentielle en cas d'hospitalisation. Avez-vous pu prendre le temps de lire les détails ou souhaitez-vous que je vous les résume ?" },
        { id: "non", title: "Non, pas reçu", description: "Le client n'a pas reçu le courrier", objectionResponse: "Aucun problème, je vais vous l'expliquer brièvement. Il s'agit d'une garantie d'indemnités journalières qui vous verse une somme directement sur votre compte en cas d'hospitalisation. C'est une protection très importante que je vais vous détailler maintenant." },
        { id: "sceptique", title: "Sceptique", description: "Le client doute ou demande des précisions", objectionResponse: "Je comprends votre prudence. Ce courrier est officiel et concerne une garantie réelle d'indemnités journalières proposée par notre partenaire assureur Klasseur. Je peux vous confirmer que c'est une offre légitime et avantageuse pour votre protection financière." },
        { id: "raccroche", title: "Raccroche", description: "Le client veut raccrocher", objectionResponse: "Je comprends votre réaction, mais avant de partir, sachez que cette garantie pourrait vous éviter des difficultés financières importantes en cas d'hospitalisation. Deux minutes seulement pour votre sécurité financière, et si cela ne vous intéresse pas, je vous laisse tranquille." },
        { id: "oublie", title: "Oublié", description: "Le client a oublié le courrier", objectionResponse: "C'est tout à fait normal, on reçoit tellement de courriers ! Je vais vous le résumer rapidement : il s'agit d'une protection qui vous verse jusqu'à 180€ par jour en cas d'hospitalisation. C'est une garantie très utile que je vais vous détailler maintenant." },
        { id: "jete", title: "Jeté", description: "Le client a jeté le courrier", objectionResponse: "Je comprends, on jette beaucoup de publicités. Cependant, ce courrier contenait une information importante sur une protection financière qui pourrait vous être très utile. Je vais vous expliquer en 2 minutes pourquoi cette garantie mérite votre attention." },
        { id: "pas_interesse", title: "Pas intéressé", description: "Le client n'est pas intéressé par le courrier", objectionResponse: "Je comprends votre réaction. Cependant, avant de prendre une décision définitive, laissez-moi vous expliquer en 30 secondes pourquoi cette garantie pourrait changer la donne pour vous en cas de problème de santé. Vous verrez, c'est vraiment différent des assurances classiques." }
      ]
    },
    3: {
      id: 3,
      title: "3. EXPLICATION DE LA GARANTIE",
      conseillerMessage: "Petite explication rapide : Ce courrier concerne une garantie d'allocations journalières, versée dès le mois prochain en cas d'hospitalisation pour maladie, accident ou agression. Il s'agit d'un versement en espèces, net d'impôt, libre d'utilisation. Ce n'est pas un remboursement, mais un virement direct sur votre compte.",
      categories: [
        { id: "compris", title: "A compris", description: "Le client a bien compris l'explication", objectionResponse: "Excellent ! Vous voyez donc l'intérêt de cette garantie. C'est précisément pour cela que je vous contacte aujourd'hui - pour vous offrir cette protection financière essentielle. Passons maintenant aux détails concrets de la formule qui vous est proposée." },
        { id: "questions", title: "Des questions", description: "Le client a des questions supplémentaires", objectionResponse: "C'est une très bonne chose d'avoir des questions ! Cela montre votre intérêt pour votre protection. Quelles sont vos questions précises ? Je suis là pour y répondre clairement et vous donner toutes les informations nécessaires pour faire un choix éclairé." },
        { id: "doute", title: "Douteux", description: "Le client est sceptique sur le produit", objectionResponse: "Je comprends votre scepticisme. C'est sain de se poser des questions. Sachez que cette garantie est proposée par Klasseur, un assureur reconnu, et qu'elle a déjà aidé de nombreuses personnes à traverser des périodes d'hospitalisation plus sereinement. Je peux vous donner des exemples concrets." },
        { id: "refus", title: "Refus", description: "Le client refuse le principe", objectionResponse: "Je comprends votre position. Cependant, avant de prendre une décision définitive, permettez-moi de vous donner un exemple concret : une hospitalisation de 5 jours vous coûterait facilement plus en frais non couverts que le coût annuel de cette garantie. C'est un investissement dans votre tranquillité." },
        { id: "combien", title: "Combien ?", description: "Le client demande le montant", objectionResponse: "C'est la question la plus importante ! Les montants varient selon le type d'hospitalisation : 60€/jour pour maladie, 120€/jour pour accident, et jusqu'à 180€/jour pour agression. Je vais vous détailler les tarifs dans un instant, mais sachez que c'est très abordable par rapport à la protection offerte." },
        { id: "comment_ca_marche", title: "Comment ça marche ?", description: "Le client veut comprendre le fonctionnement", objectionResponse: "Excellente question ! C'est très simple : en cas d'hospitalisation, vous déclarez l'incident et nous versons directement les indemnités sur votre compte. Pas de papier à remplir, pas de justificatifs complexes. Juste une protection efficace quand vous en avez besoin." },
        { id: "pourquoi_moi", title: "Pourquoi moi ?", description: "Le client se demande pourquoi il est contacté", objectionResponse: "C'est une excellente question ! Vous avez été sélectionné car vous correspondez au profil de personnes qui pourraient bénéficier de cette protection. Beaucoup de gens sous-estiment les coûts indirects d'une hospitalisation, et nous voulons vous éviter cette difficulté financière." }
      ]
    },
    4: {
      id: 4,
      title: "4. TRAITEMENT DES OBJECTIONS",
      conseillerMessage: "Avez-vous des questions ou des préoccupations concernant cette garantie d'indemnités journalières hospitalières ?",
      categories: [
        { id: "pas_besoin", title: "Je n'en ai pas besoin", description: "Le client pense ne pas avoir besoin de cette garantie", objectionResponse: "Tout le monde a besoin d'être pris en charge en cas de maladie, d'accident ou d'agression, d'autant plus que c'est de l'argent qui sera directement versé sur votre compte…" },
        { id: "veux_reflechir", title: "Je veux réfléchir", description: "Le client demande du temps pour réfléchir", objectionResponse: "C'est tout à votre honneur, c'est normal de réfléchir et c'est pour cette raison que la loi vous donne 14 jours de Réflexion. Ce que nous faisons là c'est de vous aider à recevoir votre contrat chez vous avec tous les détails et en cas de besoin n'hésitez surtout pas à rentrer en contact avec nous…" },
        { id: "deja_couvert_obj", title: "Je suis déjà couvert", description: "Le client pense déjà avoir une couverture", objectionResponse: "Par quoi êtes-vous couvert ? Parce que vous n'avez pas encore activé vos indemnités journalières hospitalières qui prendront effet à partir du 1er du mois prochain et c'est la raison de notre appel…" },
        { id: "trop_jeune", title: "Je suis trop jeune", description: "Le client pense être trop jeune pour s'en préoccuper", objectionResponse: "Peu importe votre âge ou ce que vous faites-vous pourriez être hospitalisé suite à une maladie, un accident ou une agression donc bien sûr vous êtes concerné… et si vous avez vos indemnités déjà mises en place ça sera de l'argent libre d'utilisation qui sera directement versé sur votre compte pour chaque journée passée à l'hôpital…" },
        { id: "pas_temps_obj", title: "Je n'ai pas le temps", description: "Le client n'a pas de temps maintenant", objectionResponse: "C'est vrai que je vous prends au dépourvu mais il est vraiment très important qu'on termine la procédure aujourd'hui donc accordez moi juste 2 ou 3 minutes vite fait et je vous libère…" },
        { id: "bonne_sante", title: "Je suis en bonne santé", description: "Le client est en bonne santé", objectionResponse: "C'est une bonne nouvelle que vous soyez en bonne santé c'est parfait mais il y a des cas de maladie, d'accident ou d'agression qui vous surprennent et si vous avez vos indemnités déjà mises en place ça sera de l'argent libre d'utilisation qui sera directement versé sur votre compte pour chaque journée passée à l'hôpital…" },
        { id: "verrai_plus_tard", title: "Je verrai plus tard", description: "Le client veut reporter", objectionResponse: "Je comprends mais cela fait un bon moment que nous tentons de rentrer en contact avec vous mais en vain, c'est une opportunité aujourd'hui qu'on a de mettre en place votre garantie et de vous envoyer le tout rapidement par courrier donc je vais vous prendre 2 ou 3 minutes vite fait pour m'assurer de vos informations…" }
      ]
    },
    5: {
      id: 5,
      title: "5. RÉPONSES AUX OBJECTIONS SPÉCIFIQUES",
      conseillerMessage: "Permettez-moi de répondre à vos éventuelles préoccupations concernant cette Protection essentielle.",
      categories: [
        { id: "mutuelle_couvre", title: "Ma mutuelle me couvre déjà", description: "Le client pense que sa mutuelle suffit", objectionResponse: "C'est très important que vous ayez votre mutuelle d'ailleurs moi également j'ai ma mutuelle mais j'ai en plus mes indemnités journalières hospitalières dans ce sens où les indemnités viennent compléter ce que la mutuelle ne prend pas en charge comme les dépassements d'honoraire et les restes à charge…" },
        { id: "fonctionnaire", title: "Je suis fonctionnaire", description: "Le client est fonctionnaire et pense ne pas avoir besoin", objectionResponse: "Peu importe votre statut vous pourriez être hospitalisé suite à une maladie, un accident ou une agression donc bien sûr vous êtes concerné… et si vous avez vos indemnités déjà mises en place ça sera de l'argent libre d'utilisation qui sera directement versé sur votre compte pour chaque journée passée à l'hôpital…" },
        { id: "pas_info_tel", title: "Je ne donne pas d'info par téléphone", description: "Le client refuse de donner des informations par téléphone", objectionResponse: "Je comprends, c'est normal, mais les informations sensibles comme les numéros de la carte bancaire donc rassurez-vous, en plus vous allez tout recevoir par mail et par courrier…" },
        { id: "connait_pas_cabinet", title: "Je ne connais pas votre cabinet", description: "Le client ne connaît pas le cabinet", objectionResponse: `Nous sommes le cabinet ${getCabinetName()} partenaire à plusieurs compagnies d'assurances et nous avons un code ORIAS qui est le ${selectedCabinet === 'php' ? '23000570' : '24002437'}, que vous soyez rassuré je vous invite à le vérifier sur le site officiel de l'ORIAS.` },
        { id: "pas_signe_sans_rencontrer", title: "Je ne signe rien sans rencontrer quelqu'un", description: "Le client veut rencontrer quelqu'un physiquement", objectionResponse: "Je comprends votre méfiance et c'est normal, mais aujourd'hui nous sommes à l'ère des nouvelles technologies donc plus besoin de se déplacer, en plus la signature électronique a la même valeur juridique que la signature manuscrite et vous est recevoir les documents contractuels le plus rapidement possible…" },
        { id: "trop_cher", title: "C'est trop cher", description: "Le client trouve le tarif trop élevé", objectionResponse: "C'est vrai qu'on ne connaît pas vos finances et pour ce fait on doit vous faire un geste commercial en réduisant la cotisation pour vous…" },
        { id: "envoyez_courrier", title: "Envoyez-moi un courrier", description: "Le client veut recevoir un courrier", objectionResponse: "Bien sûr c'est ce que nous sommes en train de faire mais ce que vous recevrez le plus rapidement possible par mail et par courrier, je vous laisse juste le numéro de mon pôle et si besoin nous devons absolument terminer la procédure maintenant…" }
      ]
    },
    6: {
      id: 6,
      title: "6. DÉTAIL DE LA FORMULE PRÉVOYANCE",
      conseillerMessage: "La garantie proposée, assurée par Klasseur : 60€/jour pour hospitalisation maladie, 120€/jour pour accident, 180€/jour pour agression. Tarif : [xx€]/mois + 10€ de frais de dossier (prélèvement unique).",
      categories: [
        { id: "accepte_tarif", title: "Accepte le tarif", description: "Le client trouve le tarif acceptable", objectionResponse: "C'est une excellente nouvelle ! Pour ce tarif, vous bénéficiez d'une protection complète avec des montants significatifs. C'est un investissement très raisonnable pour votre tranquillité d'esprit. Passons maintenant aux informations nécessaires pour la mise en place rapide de votre dossier." },
        { id: "garanties", title: "Garanties", description: "Le client s'intéresse aux garanties", objectionResponse: "Vous avez raison de vous intéresser aux garanties ! C'est le plus important. Cette formule vous couvre pour tous les types d'hospitalisation : maladie, accident, agression. Les montants sont parmi les plus élevés du marché pour ce type de garantie, sans franchise." },
        { id: "delai_carence", title: "Délai de carence", description: "Le client demande s'il y a un délai d'attente", objectionResponse: "Excellente question ! Contrairement à beaucoup d'assurances, il n'y a pas de délai de carence. Vous êtes protégé dès la souscription effective. C'est un avantage majeur de notre formule : une protection immédiate sans période d'attente." },
        { id: "franchise", title: "Franchise", description: "Le client demande s'il y a une franchise", objectionResponse: "C'est une question très importante ! Il n'y a aucune franchise à payer. En cas d'hospitalisation, vous recevez la totalité des montants garantis : 60€, 120€ ou 180€ par jour selon le cas, sans aucun montant à déduire. C'est une protection complète et sans surprise." },
        { id: "exclusions", title: "Exclusions", description: "Le client demande les exclusions", objectionResponse: "Très bonne question ! Les exclusions sont limitées aux cas préexistants connus et non déclarés, et aux hospitalisations volontaires. Pour toutes les situations imprévues (maladie, accident, agression), vous êtes couvert sans restriction. Je peux vous envoyer la liste complète par email." },
        { id: "versement", title: "Versement", description: "Le client demande comment se fait le versement", objectionResponse: "Excellente question ! Le versement se fait directement sur votre compte bancaire en moins de 48h après votre déclaration d'hospitalisation. Pas de papier à remplir, pas de justificatifs complexes. Juste une protection efficace et rapide quand vous en avez besoin." },
        { id: "couverture_mondiale", title: "Couverture mondiale", description: "Le client demande si c'est valable à l'étranger", objectionResponse: "Oui, absolument ! Cette garantie offre une couverture mondiale, ce qui signifie que vous êtes protégé où que vous soyez dans le monde. Que vous soyez en France, en voyage ou en expatriation, vous bénéficiez de la même protection et des mêmes versements rapides." }
      ]
    },
    7: {
      id: 7,
      title: "7. VALIDATION BUDGÉTAIRE ET ADAPTATION DE L'OFFRE",
      conseillerMessage: "Pour adapter au mieux notre offre à votre situation, quel est votre budget mensuel pour ce type de protection ? Cela me permettra d'ajuster la formule si nécessaire.",
      categories: [
        { id: "budget_suffisant", title: "Budget suffisant", description: "Le client a un budget suffisant pour l'offre actuelle", objectionResponse: "Excellent ! Votre budget permet de maintenir la formule complète avec toutes ses garanties. C'est la meilleure option pour une protection optimale. Nous pouvons donc conserver les montants de 60€/jour pour maladie, 120€/jour pour accident et 180€/jour pour agression." },
        { id: "budget_limite", title: "Budget limité", description: "Le client a un budget limité", objectionResponse: "Je comprends parfaitement. Pour respecter votre budget, je peux vous proposer une formule adaptée avec des montants légèrement inférieurs : 40€/jour pour maladie, 80€/jour pour accident et 120€/jour pour agression. Cela reste une protection très solide avec un tarif ajusté à votre budget." },
        { id: "budget_elevé", title: "Budget élevé", description: "Le client a un budget plus élevé", objectionResponse: "C'est une excellente nouvelle ! Avec votre budget, nous pouvons même envisager une formule premium avec des montants augmentés : 80€/jour pour maladie, 150€/jour pour accident et 220€/jour pour agression. Vous auriez une protection renforcée pour une tranquillité d'esprit maximale." },
        { id: "pas_de_budget", title: "Pas de budget défini", description: "Le client n'a pas de budget précis", objectionResponse: "Aucun problème ! Je vais vous proposer la formule standard qui offre le meilleur rapport qualité-prix : 60€/jour pour maladie, 120€/jour pour accident et 180€/jour pour agression. Si après réflexion vous souhaitez ajuster, nous pourrons toujours modifier l'offre par la suite." },
        { id: "veut_prix_fixe", title: "Veut un prix fixe", description: "Le client demande un prix mensuel fixe", objectionResponse: "Parfait ! Je peux vous proposer un tarif mensuel fixe de [xx]€ qui inclut toutes les garanties sans surprise. Ce montant restera constant pendant toute la durée du contrat, ce qui vous permet de budgétiser facilement votre protection sur le long terme." },
        { id: "compare_concurrence", title: "Compare avec concurrence", description: "Le client compare avec d'autres offres", objectionResponse: "C'est très judicieux de comparer ! Ce qui distingue notre offre, c'est la flexibilité des montants et l'absence de franchise. Nous pouvons adapter les garanties à votre budget tout en maintenant une couverture complète. Avez-vous des offres spécifiques que vous aimeriez que nous analysons ensemble ?" },
        { id: "veut_remise", title: "Veut une remise", description: "Le client demande une réduction", objectionResponse: "Je comprends votre demande. Plutôt qu'une remise temporaire, je préfère vous proposer une formule durable adaptée à votre budget avec des garanties ajustées. Ainsi, vous bénéficiez d'une protection cohérente et pérenne sans augmentation surprise par la suite. Quelle fourchette de budget vous conviendrait ?" }
      ]
    },
    8: {
      id: 8,
      title: "8. COLLECTE DES INFORMATIONS",
      conseillerMessage: "Pour finaliser votre dossier, j'ai besoin de confirmer ces éléments : Nom, prénom, date de naissance, adresse, e-mail, téléphone, numéro de sécurité sociale. Si vous êtes déjà assuré, seul le n° de sécurité sociale est nécessaire pour vérification.",
      categories: [
        { id: "cooperative", title: "Coopératif", description: "Le client donne ses informations", objectionResponse: "Merci beaucoup pour votre confiance ! Ces informations sont essentielles pour la mise en place rapide de votre garantie. Je vous confirme que toutes vos données sont protégées et utilisées uniquement pour votre dossier. Nous allons pouvoir procéder très rapidement maintenant." },
        { id: "reticent", title: "Réticent", description: "Le client hésite à donner ses infos", objectionResponse: "Je comprends parfaitement votre réticence. Sachez que ces informations sont strictement nécessaires pour l'établissement de votre contrat et sont protégées par le secret professionnel. Vous pouvez me donner uniquement les informations indispensables pour commencer, et nous compléterons le reste plus tard." },
        { id: "securite", title: "Sécurité", description: "Le client s'inquiète de la sécurité des données", objectionResponse: "Votre préoccupation est tout à fait légitime. Je vous confirme que toutes vos données sont protégées par le RGPD et le secret professionnel. Elles ne sont utilisées que pour votre dossier et ne seront jamais partagées avec des tiers sans votre consentement." },
        { id: "pas_maintenant", title: "Pas maintenant", description: "Le client veut reporter", objectionResponse: "Je comprends parfaitement. Sachez que je peux vous envoyer un résumé par email avec toutes les informations nécessaires. Vous pourrez me contacter quand vous serez prêt. Aucune pression, votre tranquillité d'esprit est notre priorité." },
        { id: "verification", title: "Vérification", description: "Le client demande pourquoi vérifier", objectionResponse: "C'est une excellente question ! Cette vérification nous permet de vous proposer la meilleure formule adaptée à votre situation et d'éviter les doublons si vous êtes déjà couvert. C'est une étape importante pour votre protection et pour vous offrir un service personnalisé." },
        { id: "obligatoire", title: "Obligatoire ?", description: "Le client demande si c'est obligatoire", objectionResponse: "Certaines informations sont effectivement obligatoires pour la souscription, comme votre identité et votre numéro de sécurité sociale. Cependant, nous pouvons commencer avec les informations essentielles et compléter le dossier progressivement, à votre rythme." },
        { id: "confiance", title: "Confiance", description: "Le client veut établir la confiance", objectionResponse: "Je comprends votre besoin de confiance. Permettez-moi de vous préciser que nous sommes un cabinet réglementé et que toutes nos démarches sont transparentes. Je peux vous envoyer notre numéro d'enregistrement et toutes les informations légales par email pour plus de transparence." }
      ]
    },
    9: {
      id: 9,
      title: "9. CONFIRMATION DES INFORMATIONS",
      conseillerMessage: "Je répète les informations pour confirmation : [Nom, prénom, date de naissance, adresse]. Tout est correct ?",
      categories: [
        { id: "correct", title: "Correct", description: "Le client confirme les informations", objectionResponse: "Parfait ! Merci pour votre confirmation. Je vais maintenant procéder à la finalisation de votre dossier. Vous recevrez un email de confirmation dans les prochaines heures avec tous les détails de votre contrat et vos garanties." },
        { id: "modification", title: "Modification", description: "Le client veut modifier une information", objectionResponse: "Aucun problème, c'est le moment idéal pour corriger. Quelle information souhaitez-vous modifier ? Je prends note et je mets à jour votre dossier immédiatement. Il est important que tout soit exact pour votre protection." },
        { id: "complement", title: "Complément", description: "Le client veut ajouter des informations", objectionResponse: "Excellente initiative ! Avez-vous des informations complémentaires à ajouter qui pourraient être utiles pour votre dossier ? Plus nous avons d'informations précises, meilleure sera votre couverture et plus rapide sera le traitement de votre dossier." },
        { id: "verification_supplementaire", title: "Vérification supplémentaire", description: "Le client demande plus de détails", objectionResponse: "C'est très judicieux de vouloir vérifier ! Voici ce que j'ai enregistré : [répéter les infos]. N'hésitez pas à me demander si vous avez la moindre question sur une quelconque information. Votre tranquillité d'esprit est notre priorité." },
        { id: "delai", title: "Délai", description: "Le client demande le délai de traitement", objectionResponse: "Excellente question ! Une fois votre confirmation reçue, le traitement du dossier prend généralement 24 à 48 heures. Vous recevrez un email de confirmation avec votre numéro de contrat et tous les détails de vos garanties. Nous faisons tout pour que ce soit rapide et efficace." },
        { id: "prochaine_etape", title: "Prochaine étape", description: "Le client demande ce qui se passe ensuite", objectionResponse: "Bonne question ! Après votre confirmation, je vais finaliser votre dossier et vous l'envoyer pour signature électronique. Une fois signé, votre contrat sera actif et vous serez immédiatement protégé. Je vous guiderai à chaque étape pour que tout soit simple et clair." },
        { id: "inquietude", title: "Inquiétude", description: "Le client est inquiet", objectionResponse: "Je comprends votre inquiétude, c'est normal quand on souscrit à une nouvelle protection. Sachez que je reste à votre disposition pour toutes vos questions et que vous avez un délai de Réflexion légal. Votre protection est notre priorité, mais votre tranquillité d'esprit aussi." }
      ]
    },
    10: {
      id: 10,
      title: "10. PRÉSENTATION DES AVANTAGES",
      conseillerMessage: "Les avantages de cette formule : Pas de délai de carence, pas de franchise, versement direct en 48h, couverture mondiale, annulation possible à tout temps.",
      categories: [
        { id: "interesse_avantages", title: "Intéressé avantages", description: "Le client est intéressé par les avantages", objectionResponse: "C'est parfait ! Ces avantages font vraiment la différence par rapport aux autres formules du marché. Vous bénéficiez d'une protection immédiate, sans complications, avec un versement rapide des indemnités. C'est la tranquillité d'esprit assurée dès le premier jour." },
        { id: "comparaison", title: "Comparaison", description: "Le client veut comparer avec d'autres", objectionResponse: "C'est très pertinent de comparer ! Ce qui distingue notre formule, c'est l'absence de franchise et de délai de carence, ce qui est rare sur le marché. De plus, notre versement en 48h est l'un des plus rapides. Vous avez une protection complète sans les inconvénients habituels." },
        { id: "details", title: "Détails", description: "Le client demande plus de détails", objectionResponse: "Avec plaisir ! Voici plus en détail : la couverture mondiale signifie que vous êtes protégé partout dans le monde. L'annulation à tout temps vous donne une flexibilité totale. Le versement direct en 48h vous évite les longues attentes. C'est vraiment une formule pensée pour votre confort." },
        { id: "limites", title: "Limites", description: "Le client demande les limites", objectionResponse: "Excellente question de précision ! Les limites sont claires : les cas préexistants non déclarés et les hospitalisations volontaires ne sont pas couverts. Pour tout le reste (maladie, accident, agression), vous avez une protection complète sans restriction. Je peux vous envoyer la liste détaillée par email." },
        { id: "cout_benefice", title: "Coût/bénéfice", description: "Le client évalue le rapport coût/bénéfice", objectionResponse: "C'est une excellente façon d'analyser ! Pour le coût de quelques cafés par jour, vous vous protégez contre des dépenses qui peuvent se chiffrer en milliers d'euros. Une seule journée d'hospitalisation couvre plusieurs mois de cotisation. C'est un investissement très rentable pour votre sécurité financière." },
        { id: "exclusivite", title: "Exclusivité", description: "Le client demande si c'est exclusif", objectionResponse: "Cette formule est exclusive à notre partenariat avec Klasseur, ce qui nous permet de vous offrir des conditions avantageuses que vous ne trouverez pas ailleurs. C'est le fruit de notre expertise et de notre relation de confiance avec un assureur de premier plan. Vous bénéficiez d'une offre sur mesure." },
        { id: "flexibilite", title: "Flexibilité", description: "Le client s'intéresse à la flexibilité", objectionResponse: "La flexibilité est en effet un atout majeur ! Vous pouvez adapter votre couverture, l'annuler sans pénalité, et même la réactiver facilement. Cette formule s'adapte à votre vie et à vos besoins changeants. C'est une protection qui évolue avec vous, sans contrainte." }
      ]
    },
    11: {
      id: 11,
      title: "11. FINALISATION ET SUIVI",
      conseillerMessage: "Pour résumer : Vous souscrivez à la formule Prévoyance avec [montant]€/mois. Couverture complète dès demain. Êtes-vous d'accord pour procéder ?",
      categories: [
        { id: "accord", title: "Accord", description: "Le client est d'accord", objectionResponse: "Excellent ! Je vais immédiatement préparer votre dossier pour signature électronique. Vous recevrez un email dans les prochaines heures avec tous les détails et le lien pour signer. Félicitations pour cette excellente décision qui vous protège efficacement dès demain !" },
        { id: "reflexion_final", title: "Réflexion", description: "Le client veut encore réfléchir", objectionResponse: "Je comprends parfaitement votre besoin de réflexion. C'est une décision importante. Je vais vous envoyer un résumé complet par email avec tous les détails. Prenez le temps qu'il vous faut, je reste à votre disposition pour toutes vos questions. Il n'y a aucune pression." },
        { id: "consultation", title: "Consultation", description: "Le client veut consulter quelqu'un", objectionResponse: "C'est très judicieux de vouloir consulter ! Je vous encourage à en parler avec vos proches ou votre conseiller habituel. Je vais vous envoyer un document récapitulatif clair que vous pourrez partager. Nous sommes là pour vous aider, pas pour vous presser." },
        { id: "conditions", title: "Conditions", description: "Le client veut voir les conditions", objectionResponse: "Absolument ! Transparence totale est notre principe. Je vais vous envoyer immédiatement l'ensemble des conditions générales et particulières par email. Prenez le temps de les lire attentivement et n'hésitez pas à me poser toutes vos questions. Votre confiance est essentielle." },
        { id: "garanties_supplementaires", title: "Garanties supplémentaires", description: "Le client demande plus de garanties", objectionResponse: "C'est une excellente demande ! Nous pouvons effectivement enrichir votre formule avec des garanties complémentaires comme l'assistance voyage ou la couverture des soins dentaires. Je vais vous préparer une proposition personnalisée avec ces options supplémentaires pour que vous puissiez choisir." },
        { id: "delai_signature", title: "Délai signature", description: "Le client demande le délai pour signer", objectionResponse: "Bonne question ! Vous avez généralement 14 jours de Réflexion pour signer et retourner votre dossier. Cependant, pour une activation rapide de votre protection, je vous conseille de signer dans les 48h. Mais n'hésitez pas à prendre le temps nécessaire pour votre décision." },
        { id: "modifications", title: "Modifications", description: "Le client veut modifier quelque chose", objectionResponse: "Aucun problème ! C'est le moment idéal pour ajuster. Que souhaitez-vous modifier ? Le montant de la couverture, les garanties, ou autre chose ? Je suis là pour vous proposer la formule qui correspond parfaitement à vos besoins et à votre budget." }
      ]
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    // Ajouter un message client fictif
    const currentStepData = scriptSteps[currentStep]
    const selectedCategory = currentStepData.categories.find(c => c.id === categoryId)
    
    const clientMessage: Message = {
      id: messages.length + 1,
      text: `[${selectedCategory?.title}]`,
      sender: "client",
      timestamp: new Date()
    }
    
    const updatedMessages = [...messages, clientMessage]
    setMessages(updatedMessages)
    
    // Ajouter la réponse d'objection du conseiller après un court délai
    setTimeout(() => {
      const objectionMessage: Message = {
        id: messages.length + 2,
        text: selectedCategory?.objectionResponse || "",
        sender: "conseiller",
        timestamp: new Date()
      }
      
      const messagesWithObjection = [...updatedMessages, objectionMessage]
      setMessages(messagesWithObjection)
      
      // Sauvegarder les messages de l'étape actuelle
      saveStepMessages(currentStep, messagesWithObjection)
      
      // Passer à l'étape suivante après un autre délai pour une transition fluide
      setTimeout(() => {
        if (currentStep < 11) {
          const nextStep = currentStep + 1
          setCurrentStep(nextStep)
          
          // Ajouter le message du conseiller pour la nouvelle étape
          const conseillerMessage: Message = {
            id: messages.length + 3,
            text: scriptSteps[nextStep].conseillerMessage,
            sender: "conseiller",
            timestamp: new Date()
          }
          
          const nextStepMessages = [conseillerMessage]
          setMessages(nextStepMessages)
          saveStepMessages(nextStep, nextStepMessages)
        }
      }, 2000) // Délai plus long pour laisser le temps de lire l'objection
    }, 1000) // Délai avant la réponse d'objection
  }

  const getCurrentStepData = () => {
    return scriptSteps[currentStep]
  }

  const progress = (currentStep / 11) * 100

  // Fonction pour obtenir l'emoji approprié pour chaque type de réaction
  const getEmojiForReaction = (reactionId: string): string => {
    const emojiMap: Record<string, string> = {
      // Étape 1 - Salutation
      "interesse": "😊",
      "mecontent": "😠",
      "curieux": "🤔",
      "occupe": "⏰",
      "sceptique_s1": "🤨",
      "deja_couvert": "✅",
      "urgence_s1": "🚨",
      
      // Étape 2 - Courrier
      "oui": "👍",
      "non": "👎",
      "sceptique_s2": "❓",
      "raccroche": "📞",
      "oublie": "🤷",
      "jete": "🗑️",
      "pas_interesse": "🙅",
      
      // Étape 3 - Explication
      "compris": "💡",
      "questions": "❓",
      "doute": "😕",
      "refus": "🚫",
      "confiance_s3": "🤝",
      "hesitation": "⚖️",
      "information": "ℹ️",
      
      // Étapes 4-11 - Arguments et conclusion
      "prix": "💰",
      "reflexion": "🤔",
      "concurrent": "⚔️",
      "confiance": "🤝",
      "urgence": "🚨",
      "famille": "👨‍👩‍👧‍👦",
      "sante": "🏥",
      "budget": "💳",
      "contrat": "📋",
      "garantie": "🛡️",
      "avantage": "⭐",
      "final": "🎯",
      "signature": "✍️"
    }
    
    return emojiMap[reactionId] || "💬"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 flex items-center justify-center">
      {!selectedCabinet ? (
        // Écran de sélection du cabinet
        <div className="w-full max-w-5xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                  Soutien Conseiller
                </h1>
                <p className="text-xl text-gray-600">
                  Prévoyance
                </p>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-slate-600 to-gray-600 mx-auto rounded-full"></div>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Choisissez votre cabinet
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {cabinets.map((cabinet) => (
                  <Card 
                    key={cabinet.id}
                    className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      cabinet.id === 'php' 
                        ? 'border-slate-200 hover:border-slate-400' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => startConversation(cabinet.id)}
                  >
                    <CardContent className="p-10 text-center">
                      <div className="flex justify-center mb-8">
                        <div className={`w-24 h-24 rounded-full ${cabinet.id === 'php' ? 'bg-slate-700' : 'bg-gray-700'} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                          {cabinet.id.toUpperCase()}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {cabinet.name}
                      </h3>
                      <p className="text-gray-600 text-lg mb-8">{cabinet.description}</p>
                      <div className={`inline-flex items-center px-8 py-4 rounded-full text-lg font-medium ${
                        cabinet.id === 'php' 
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } transition-colors cursor-pointer`}>
                        Commencer
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
            </CardContent>
          </Card>
        </div>
      ) : (
        // Interface principale de simulation
        <div className="w-full max-w-7xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            {/* En-tête */}
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className={`w-16 h-16 rounded-full ${selectedCabinet === 'php' ? 'bg-slate-700' : 'bg-gray-700'} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {selectedCabinet?.toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      Soutien Conseiller - Prévoyance
                    </h1>
                    <p className="text-base text-gray-600">{getCabinetName()}</p>
                  </div>
                </div>
                  <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowLexique(!showLexique)
                    setShowIBANValidator(false)
                    setShowNIRValidator(false)
                  }}
                  className={`px-4 py-2 h-10 text-sm font-medium hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 ${
                    showLexique ? 'bg-blue-100 border-blue-300' : ''
                  }`}
                >
                  Lexique
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowIBANValidator(!showIBANValidator)
                    setShowLexique(false)
                    setShowNIRValidator(false)
                  }}
                  className={`px-4 py-2 h-10 text-sm font-medium hover:bg-green-50 hover:border-green-300 transition-all duration-200 ${
                    showIBANValidator ? 'bg-green-100 border-green-300' : ''
                  }`}
                >
                  IBAN
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowNIRValidator(!showNIRValidator)
                    setShowLexique(false)
                    setShowIBANValidator(false)
                  }}
                  className={`px-4 py-2 h-10 text-sm font-medium hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 ${
                    showNIRValidator ? 'bg-purple-100 border-purple-300' : ''
                  }`}
                >
                  NIR
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetConversation}
                  className="px-4 py-2 h-10 text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  Reset
                </Button>
              </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {showLexique ? (
                <Lexique />
              ) : showIBANValidator ? (
                <IBANValidator />
              ) : showNIRValidator ? (
                <NIRValidator />
              ) : (
                <>
                  {/* Barre de progression avec navigation */}
                  <Card className={`${getCabinetColors().accent} border ${getCabinetColors().border} shadow-sm`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={goToPreviousStep}
                            disabled={currentStep <= 1}
                            className="px-3 py-2 h-8 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ← Précédent
                          </Button>
                          <Badge variant="outline" className={`${getCabinetColors().badge} px-3 py-1 text-sm`}>
                            {getCabinetName()}
                          </Badge>
                          <span className="text-sm text-gray-600 font-medium">{currentStep}/11</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={goToNextStep}
                            disabled={currentStep >= 11}
                            className="px-3 py-2 h-8 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Suivant →
                          </Button>
                        </div>
                        <Badge variant="outline" className="text-sm px-3 py-1 font-medium">
                          {progress}%
                        </Badge>
                      </div>
                      <Progress value={progress} className="h-2 mb-4" />
                      <div className="text-center">
                        <Badge variant="outline" className="text-sm font-medium px-3 py-1">
                          {getCurrentStepData().title}
                        </Badge>
                      </div>
                      
                      {/* Navigation rapide par étapes */}
                      <div className="mt-6">
                        <div className="flex flex-wrap gap-2 justify-center mb-3">
                          {Array.from({ length: 11 }, (_, i) => i + 1).map((step) => (
                            <Button
                              key={step}
                              variant={step === currentStep ? "default" : "outline"}
                              size="sm"
                              onClick={() => goToStep(step)}
                              className={`w-10 h-10 p-0 text-xs font-medium ${
                                step === currentStep
                                  ? `${getCabinetColors().primary} text-white`
                                  : stepHistory[step] && stepHistory[step]?.length > 0
                                  ? `${getCabinetColors().secondary} text-white`
                                  : ""
                              }`}
                              title={`${step}. ${scriptSteps[step].title}`}
                            >
                              {step}
                            </Button>
                          ))}
                        </div>
                        
                        {/* Légende */}
                        <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${getCabinetColors().primary}`}></div>
                            <span>Étape actuelle</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${getCabinetColors().secondary}`}></div>
                            <span>Étape complétée</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border border-gray-300"></div>
                            <span>Étape non commencée</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Zone de conversation */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Messages */}
                    <div className="lg:col-span-2">
                      <Card className="h-96 shadow-sm">
                        <CardHeader className="pb-3 px-6 pt-6">
                          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                            <span>Conversation</span>
                            <div className="text-xs text-gray-500 font-normal">
                              💡 Vous pouvez naviguer entre les étapes et modifier vos réponses
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {messages.map((message) => (
                              <div
                                key={message.id}
                                className={`flex gap-3 ${
                                  message.sender === "conseiller" ? "justify-start" : "justify-end"
                                }`}
                              >
                                {message.sender === "conseiller" && (
                                  <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarFallback className={`${getCabinetColors().primary} text-white text-sm`}>
                                      C
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                
                                <div
                                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                                    message.sender === "conseiller"
                                      ? `bg-white border-l-4 ${getCabinetColors().primary.replace('bg-', 'border-l-')} shadow-sm`
                                      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                                  }`}
                                >
                                  <div className="text-sm font-medium mb-1 opacity-80">
                                    {message.sender === "conseiller" ? "Conseiller" : "Client"}
                                  </div>
                                  <div className="text-sm whitespace-pre-line leading-relaxed">
                                    {splitTextWithLexiqueTerms(message.text)}
                                  </div>
                                  <div className={`text-xs mt-1 opacity-70`}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </div>
                                
                                {message.sender === "client" && (
                                  <Avatar className="w-6 h-6 flex-shrink-0">
                                    <AvatarFallback className="bg-green-600 text-white text-xs">
                                      Cl
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Réactions possibles */}
                    <div>
                      <Card className="h-96 shadow-sm">
                        <CardHeader className="pb-3 px-6 pt-6">
                          <CardTitle className="text-lg font-semibold text-gray-800">
                            Réactions
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {stepHistory[currentStep] && stepHistory[currentStep]?.length > 1 
                              ? "Cliquez pour modifier votre réponse" 
                              : "Cliquez pour répondre"
                            }
                          </p>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {getCurrentStepData().categories.map((category) => {
                              const emoji = getEmojiForReaction(category.id);
                              return (
                                <Button
                                  key={category.id}
                                  variant="outline"
                                  className="w-full h-auto p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors border border-gray-200 rounded-lg text-sm font-medium"
                                  onClick={() => handleCategorySelect(category.id)}
                                >
                                  <span className="text-lg flex-shrink-0">{emoji}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm leading-tight text-gray-800 truncate">
                                      {category.title}
                                    </div>
                                    <div className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                      {category.description}
                                    </div>
                                  </div>
                                </Button>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}