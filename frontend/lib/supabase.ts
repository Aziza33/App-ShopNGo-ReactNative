// // Importation des variables d'environnement contenant les identifiants Supabase
// import { EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY, } from "@/config";

// // Importation du client Supabase et des modules nécessaires
// import { createClient } from "@supabase/supabase-js";
// import * as SecureStore from "expo-secure-store";
// import { Platform } from "react-native";

// // Implémentation d'un adaptateur de stockage personnalisé pour SecureStore
// // Cet adaptateur permettra à Supabase de stocker les tokens d'authentification
// // de manière sécurisée, selon la plateforme.
// const ExpoSecureStoreAdapter = {
//     // Récupère un élément depuis le stockage sécurisé
//     getItem: (key: string) => {
//         // si on est sur le web utiliser localstorage
//         if (Platform.OS === "web") {
//             return localStorage.getItem(key);
//         }
//         // sinon (mobile), utiliser securestore de maniere asynchrone
//         return SecureStore.getItemAsync(key);
//     },
//     // enregistre un element dans le stockage securisé
//     setItem: (key: string, value: string) => {
//         // utilisation du localstorage sur le web
//         if (Platform.OS === "web") {
//             localStorage.setItem(key, value);
//             return;
//         }
//         // utlisation de securestore sur mobile
//         return SecureStore.setItemAsync(key, value);
//     },
//     // supprime un element du stockage sécurisé
//     removeItem: (key: string) => {
//         // suppression avec localstorage sur le web
//         if (Platform.OS === "web") {
//             localStorage.removeItem(key);
//             return;
//         }
//         // suppression sécurisée avec securestore sur mobile
//         return SecureStore.deleteItemAsync(key);
//     },
// };

// // Initialisation des variables de connexion à Supabase
// // Ces valeurs proviennent de tes variables d'environnement définies dans config.ts
// const supabaseUrl = EXPO_PUBLIC_SUPABASE_URL || "";
// const supabaseAnonKey = EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

// // Création du client Supabase avec configuration de l'authentification
// export const supabase = createClient(supabaseUrl,supabaseAnonKey, {
//     auth: {
//         // on indique a supabase d'utiliser notre adaptateur personnalisé
//         storage: ExpoSecureStoreAdapter,
//         // active le raffraichissement automatique du token losqu'il expire (lui en donne un nouveau tout en le gardant connecté)
//         autoRefreshToken: true,
//         // rend la session persistante (l'utilisateur reste connecté entre les redemarrages)
//         persistSession: true,
//         // desactive la detection de session a partir de l'url, inutile sur mobile
//         detectSessionInUrl: false, //mettre false pour React Native
//     },

//     // Configuration du module Realtime de Supabase
//     // En mettant transport à undefined, on désactive la spécification explicite
//     // du type de transport utilisé (WebSocket ou autre).
//     // Cela permet au SDK Supabase de choisir automatiquement le transport adapté
//     // à la plateforme, ce qui évite des erreurs sur React Native ou Expo
//     // liées à un transport non supporté ou mal configuré.
//     realtime: {
//         transport: undefined,
//     }
// });

////////////////////////  Essai nouveau fichier   ///////////////////////////////


// Importation des variables d'environnement contenant les identifiants Supabase
import {
  EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_ANON_KEY,
} from "@/config";

// Importation du client Supabase et des modules nécessaires
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

//  Adaptateur de stockage pour Supabase (SecureStore + localStorage sécurisé)
const ExpoSecureStoreAdapter = {
  // Récupère un élément depuis le stockage sécurisé
  getItem: (key: string) => {
    //  Si on est sur le web
    if (Platform.OS === "web") {
      // On vérifie qu'on est bien dans le navigateur, pas dans Node
      if (typeof window === "undefined" || !("localStorage" in window)) {
        // En rendu serveur (Node), on ne fait rien
        return null;
      }
      return window.localStorage.getItem(key);
    }

    // Sinon (mobile), utiliser SecureStore de manière asynchrone
    return SecureStore.getItemAsync(key);
  },

  // Enregistre un élément dans le stockage sécurisé
  setItem: (key: string, value: string) => {
    if (Platform.OS === "web") {
      if (typeof window === "undefined" || !("localStorage" in window)) {
        // En Node, on ne fait rien
        return;
      }
      window.localStorage.setItem(key, value);
      return;
    }

    // Mobile : SecureStore
    return SecureStore.setItemAsync(key, value);
  },

  // Supprime un élément du stockage sécurisé
  removeItem: (key: string) => {
    if (Platform.OS === "web") {
      if (typeof window === "undefined" || !("localStorage" in window)) {
        return;
      }
      window.localStorage.removeItem(key);
      return;
    }

    // Mobile : SecureStore
    return SecureStore.deleteItemAsync(key);
  },
};

// Initialisation des variables de connexion à Supabase
const supabaseUrl = EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] URL ou ANON KEY manquants. Vérifie ton fichier config.ts / .env."
  );
}

// Création du client Supabase avec configuration de l'authentification
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // important pour React Native / Expo
  },
  realtime: {
    transport: undefined,
  },
});
