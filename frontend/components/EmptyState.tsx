import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors } from '@/constants/theme'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Button from './Button';

//
// Types disponibles pour définir l'état vide
// (permet d'assurer que seules ces valeurs sont utilisées)
//
type EmptyStateType = "cart" | "search" | "favorites" | "orders" | "profile";

//
// Props du composant EmptyState
// - type : détermine l’icône et le message par défaut
// - message : message optionnel personnalisé
// - actionLabel : texte du bouton (si présent)
// - onAction : callback exécutée lors du clic sur le bouton
//
interface EmptyStateProps {
    type: EmptyStateType;
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
}

//
// Composant fonctionnel EmptyState
// Gère l'affichage d'un écran d'état vide (panier vide, favoris vides, etc.)
//
const EmptyState:React.FC<EmptyStateProps> = ({
    type, message,
    actionLabel, onAction,
}) => {

    // Taille et couleur standard des icônes pour uniformiser le design
    const size = 64;
    const color = AppColors.gray[400];

    //
    // Fonction utilitaire : retourne l'icône correspondant au type d'état vide
    // Permet d’éviter un code conditionnel dispersé dans le JSX
    //
    const getIcon = () => {
        switch (type) {
            case "cart":
                return <AntDesign name='shopping-cart' size={size} color={color}/>
            case "search":
                return <Ionicons name='search' size={size} color={color}/>
            case "favorites":
                return <AntDesign name='heart' size={size} color={color}/>        
            default:
                // Pour "orders", "profile" ou toute future valeur par défaut
                return <AntDesign name='user' size={size} color={color}/>
        }
    };

    //
    // Fonction utilitaire : message par défaut si aucun message personnalisé
    //
    const getDefaultMessage = () => {
        switch (type) {
            case "cart":
                return "Votre panier est vide";
            case "search":
                return "Aucun produit trouvé";
            case "favorites":
                return "Votre liste est vide";
            default:
                return "Rien à voir ici"
        }
    };

  return (
    <View style={styles.container}>
      {/* Icône d'état vide */}
      <Text style={styles.iconContainer}>{getIcon()}</Text>

      {/* Message : personnalisé ou par défaut */}
      <Text style={styles.message}>{message || getDefaultMessage()}</Text>

      {/* Bouton optionnel si actionLabel + onAction sont fournis */}
      {actionLabel && onAction && (
        <Button
            title={actionLabel}
            onPress={onAction}
            variant='primary'
            style={styles.button}
        />
      )}
    </View>
  )
}

export default EmptyState

//
// Styles du composant : centrage vertical/horizontal, padding
//
const styles = StyleSheet.create({
     container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    iconContainer:{
        marginBottom: 16,
    },
    message:{
        fontSize: 18,
        color: AppColors.text.secondary,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        marginTop: 16,
    },
})
