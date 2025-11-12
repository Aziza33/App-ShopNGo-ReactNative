import { 
    StyleSheet, Text, 
    View, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '@/constants/theme';

// sert de conteneur sûr/sécurisé pour l'affichage de contenu
const wrapper = ({ children } : {children: React.ReactNode}) => { 

// le typage react.reactNode sert à typer la props du children, 
// représente tous ce que react peut return, 
// ça garantit que ça va accepter tout ce qui va être mis
// rend le typage large / laxiste

  return (
    <SafeAreaView style={styles.safeView}> {/* SafeAreaView prend en compte les zones à éviter sur les différents mobiles */}

        <View style={styles.container}> {/* View est la vue principale contenant le contenu enfant */}
            {children} {/* children affiche dynamiquement ce que le wrapper enveloppera */}
        </View> 
    </SafeAreaView>
  )
}

export default wrapper

const styles = StyleSheet.create({
    safeView : {
        flex: 1,
        backgroundColor: AppColors.background.primary, // les couleurs qu'on a mis dans theme.ts
        marginTop: Platform.OS === 'android' ? 30 : 0, // précise la plateforme, si c'est android on met margintop 30 sinon 0 car ios le fait automatiquement
    },
    container : {
        flex: 1,
        backgroundColor: AppColors.background.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
})