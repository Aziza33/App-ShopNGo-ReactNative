import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from '@/constants/theme';

const Logo = () => {
    const router = useRouter(); // pour la navigation entre les differents écrans/pages
  return (
    <TouchableOpacity style={styles.logoView} onPress={() => router.push("/")}> 
    
    
    {/* TouchableOpacity = conteneur qui rend son contenu cliquable + effet visuel d'opacité quand on appuie dessus, même réaction sur ios et android par rapport à button / 
    Attention tt le contenu devient cliquable // onPress car on est sur mobile, pas de onclick // au clic prend le router pour aller sur la home page
    */}


        <MaterialIcons
            name="shopping-cart" 
            size={25}
            color={AppColors.primary[700]}
        /> {/*  autre librairie d'icones */}
        <Text style={styles.logoText}>Shop&Go</Text>
    </TouchableOpacity>
  )
}

export default Logo

const styles = StyleSheet.create({
    logoView : {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText : {
        fontSize: 20,
        marginLeft: 2,
        fontFamily: 'Inter-Bold',
        color: AppColors.primary[700],
    }
})